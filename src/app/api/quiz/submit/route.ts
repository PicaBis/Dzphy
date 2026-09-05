import { NextRequest, NextResponse } from 'next/server';
import { quizzes } from '@/data/quizzes';
import { getSupabaseServer, getServerUser } from '@/lib/supabase-server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

// POST /api/quiz/submit
// Recomputes the score SERVER-SIDE from the submitted answers using the
// authoritative question bank — the client's own reported score/total is
// never trusted. If the requester is signed in, the attempt is persisted to
// Supabase (RLS-protected, one row per attempt); otherwise the score is
// still returned (authoritative) but not persisted server-side, and the
// client falls back to localStorage exactly as before — no forced login.
//
// NOTE: because `quizzes` (including each question's `correctIndex`) is a
// statically bundled TS module shipped to the browser today (unchanged from
// before this pass), this does not add answer-key secrecy — a determined
// user can still read the correct answers from the client bundle. What it
// DOES fix is that the score/percentage saved to the database and shown as
// "your result" is now computed by the server from the submitted answers,
// not accepted verbatim from the client. True answer-key secrecy would
// require moving quiz content behind a server-only endpoint, which is a
// content-architecture change out of scope here.
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const { allowed } = rateLimit(`quiz-submit:${ip}`, 30, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: 'طلبات كثيرة جدًا. حاول لاحقًا.' }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { quizId, answers, timeTaken } = body as {
      quizId?: unknown;
      answers?: unknown;
      timeTaken?: unknown;
    };

    if (typeof quizId !== 'string') {
      return NextResponse.json({ error: 'quizId is required' }, { status: 400 });
    }
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'answers must be an object' }, { status: 400 });
    }
    const safeTimeTaken =
      typeof timeTaken === 'number' && Number.isFinite(timeTaken) && timeTaken >= 0
        ? Math.min(Math.round(timeTaken), 24 * 60 * 60)
        : 0;

    const answersRecord = answers as Record<string, unknown>;

    // --- Authoritative scoring ----------------------------------------------
    let score = 0;
    for (const q of quiz.questions) {
      const given = answersRecord[q.id];
      if (typeof given === 'number' && given === q.correctIndex) score += 1;
    }
    const total = quiz.questions.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    // --- Persist for signed-in users ---------------------------------------
    const user = await getServerUser();
    let persisted = false;

    if (user) {
      const supabase = await getSupabaseServer();
      if (supabase) {
        const { error } = await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          quiz_id: quizId,
          score,
          total,
          time_taken: safeTimeTaken,
          answers: answersRecord,
        });
        persisted = !error;
        if (error) console.error('quiz_attempts insert failed:', error.message);
      }
    }

    return NextResponse.json({
      quizId,
      score,
      total,
      percentage,
      timeTaken: safeTimeTaken,
      persisted,
      signedIn: Boolean(user),
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
