// ============================================================================
// DzPhy — Central UI Sound system (SoundManager)
// ----------------------------------------------------------------------------
// A single, dependency-free WebAudio engine that synthesises short, subtle UI
// sounds on the fly (no audio files to download). Every sound is quiet, brief
// and distinct per interaction type. Highlights:
//   • Respects browser autoplay policy — the AudioContext is only resumed after
//     the first real user gesture (unlock()), so nothing throws or loops.
//   • Global mute preference persisted in localStorage ("dzphy-sound").
//   • Per-type throttling so nothing can machine-gun (hover is throttled hard).
//   • Fully guarded: any failure is swallowed, the page never breaks.
// ============================================================================

export type SoundType =
  | "click"
  | "open"
  | "close"
  | "nav"
  | "success"
  | "hover"
  | "back"
  | "splash"
  | "toggle";

const STORAGE_KEY = "dzphy-sound";

interface ToneStep {
  freq: number;
  type: OscillatorType;
  /** start offset in seconds */
  at: number;
  /** duration in seconds */
  dur: number;
  /** peak gain (0-1) — kept low; master gain scales further */
  gain: number;
}

// Each UI sound is a tiny sequence of one or two oscillator "blips".
const RECIPES: Record<SoundType, ToneStep[]> = {
  click: [{ freq: 620, type: "sine", at: 0, dur: 0.05, gain: 0.14 }],
  hover: [{ freq: 880, type: "sine", at: 0, dur: 0.03, gain: 0.05 }],
  open: [
    { freq: 480, type: "sine", at: 0, dur: 0.06, gain: 0.12 },
    { freq: 720, type: "sine", at: 0.05, dur: 0.08, gain: 0.12 },
  ],
  close: [
    { freq: 620, type: "sine", at: 0, dur: 0.06, gain: 0.12 },
    { freq: 400, type: "sine", at: 0.05, dur: 0.08, gain: 0.12 },
  ],
  nav: [
    { freq: 520, type: "triangle", at: 0, dur: 0.05, gain: 0.1 },
    { freq: 780, type: "triangle", at: 0.045, dur: 0.07, gain: 0.1 },
  ],
  back: [
    { freq: 700, type: "triangle", at: 0, dur: 0.05, gain: 0.1 },
    { freq: 460, type: "triangle", at: 0.045, dur: 0.07, gain: 0.1 },
  ],
  success: [
    { freq: 660, type: "sine", at: 0, dur: 0.08, gain: 0.12 },
    { freq: 880, type: "sine", at: 0.08, dur: 0.09, gain: 0.12 },
    { freq: 1180, type: "sine", at: 0.17, dur: 0.12, gain: 0.1 },
  ],
  toggle: [{ freq: 540, type: "square", at: 0, dur: 0.04, gain: 0.08 }],
  splash: [
    { freq: 392, type: "sine", at: 0, dur: 0.18, gain: 0.1 },
    { freq: 523, type: "sine", at: 0.12, dur: 0.18, gain: 0.1 },
    { freq: 659, type: "sine", at: 0.26, dur: 0.28, gain: 0.09 },
  ],
};

// Minimum ms between successive plays of the same sound (anti-spam).
const THROTTLE: Partial<Record<SoundType, number>> = {
  hover: 90,
  click: 40,
};
const DEFAULT_THROTTLE = 30;

type Listener = (enabled: boolean) => void;

class SoundManager {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private enabled = true;
  private unlocked = false;
  private lastPlayed: Partial<Record<SoundType, number>> = {};
  private listeners = new Set<Listener>();
  private nowFn: () => number =
    typeof performance !== "undefined" ? () => performance.now() : () => 0;

  /** Read the persisted preference. Call once on the client. */
  init() {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "off") this.enabled = false;
    } catch {
      /* ignore storage errors */
    }
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    } catch {
      /* ignore */
    }
    if (on) this.unlock();
    this.listeners.forEach((l) => l(on));
  }

  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }

  /** Must run inside a user gesture to satisfy autoplay policies. */
  unlock() {
    if (typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        const Ctor: typeof AudioContext =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctor) return;
        this.ctx = new Ctor();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.5; // global headroom — keep everything quiet
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === "suspended") void this.ctx.resume();
      this.unlocked = true;
    } catch {
      /* audio not available — stay silent, never throw */
    }
  }

  play(type: SoundType) {
    if (!this.enabled || typeof window === "undefined") return;
    // Not unlocked yet (no gesture) → skip silently instead of throwing.
    if (!this.unlocked || !this.ctx || !this.master) return;

    const now = this.nowFn();
    const gap = THROTTLE[type] ?? DEFAULT_THROTTLE;
    if (this.lastPlayed[type] && now - (this.lastPlayed[type] as number) < gap) return;
    this.lastPlayed[type] = now;

    try {
      const ctx = this.ctx;
      const t0 = ctx.currentTime;
      for (const step of RECIPES[type]) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = step.type;
        osc.frequency.setValueAtTime(step.freq, t0 + step.at);
        // Fast attack, smooth exponential release → soft, non-clicky blip.
        gain.gain.setValueAtTime(0.0001, t0 + step.at);
        gain.gain.exponentialRampToValueAtTime(step.gain, t0 + step.at + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + step.at + step.dur);
        osc.connect(gain);
        gain.connect(this.master);
        osc.start(t0 + step.at);
        osc.stop(t0 + step.at + step.dur + 0.02);
      }
    } catch {
      /* ignore playback errors */
    }
  }
}

export const sound = new SoundManager();

/** Convenience helper for event handlers. */
export const playSound = (type: SoundType) => sound.play(type);
