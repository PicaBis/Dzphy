"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { sound, playSound, type SoundType } from "@/lib/sound";

interface SoundContextType {
  enabled: boolean;
  toggle: () => void;
  play: (type: SoundType) => void;
}

const SoundCtx = createContext<SoundContextType>({
  enabled: true,
  toggle: () => {},
  play: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    sound.init();
    setEnabled(sound.isEnabled());

    // Unlock audio on the first real user gesture (autoplay-policy safe).
    const unlock = () => sound.unlock();
    const opts = { once: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("touchstart", unlock, opts);

    const unsub = sound.subscribe((on) => setEnabled(on));

    // Single delegated listener → a subtle click on every interactive element
    // (buttons, links, cards, filters, tabs) without wiring each component.
    // Regions that manage their own richer sounds (Header, Splash) opt out with
    // [data-sound-managed], so nothing ever double-plays.
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const interactive = el.closest(
        'a, button, [role="button"], [role="tab"], summary, label[for]'
      );
      if (!interactive) return;
      if (interactive.closest("[data-sound-managed]")) return;
      if ((interactive as HTMLButtonElement).disabled) return;
      sound.play("click");
    };
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", onClick, true);
      unsub();
    };
  }, []);

  const toggle = useCallback(() => {
    const next = !sound.isEnabled();
    sound.setEnabled(next);
    if (next) sound.play("toggle");
  }, []);

  return (
    <SoundCtx.Provider value={{ enabled, toggle, play: playSound }}>
      {children}
    </SoundCtx.Provider>
  );
}

export function useSound() {
  return useContext(SoundCtx);
}
