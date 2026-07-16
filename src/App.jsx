import { useState, useEffect, useRef, useCallback } from 'react';
import { EXERCISES } from './exercises';
import './App.css';

const COLORS = {
  idle: '#6b7280',
  warmup: '#f59e0b',
  work: '#ef4444',
  rest: '#22c55e',
  cooldown: '#3b82f6',
  done: '#8b5cf6',
};

const LABELS = {
  warmup: 'ESCALFAMENT',
  work: 'TREBALL',
  rest: 'DESCANS',
  cooldown: 'ESTIRAMENTS',
  done: 'COMPLETAT',
};

function beep(freq = 440, duration = 200, type = 'sine') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  } catch (e) {
    // Silently fail if audio not available
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function App() {
  const [phase, setPhase] = useState('idle');
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef(null);
  const idxRef = useRef(0);
  const wasPausedRef = useRef(false);

  const exercise = EXERCISES[idx] || EXERCISES[EXERCISES.length - 1];
  const isLast = idx >= EXERCISES.length - 1;
  const progress = exercise.duration > 0
    ? ((exercise.duration - timeLeft) / exercise.duration) * 100
    : 100;

  const advanceExercise = useCallback(() => {
    const next = idxRef.current + 1;
    if (next >= EXERCISES.length) {
      setPhase('done');
      beep(660, 600, 'sine');
      clearInterval(intervalRef.current);
      return;
    }
    idxRef.current = next;
    setIdx(next);
    setTimeLeft(EXERCISES[next].duration);
    // Beep: last 3s warning
    if (EXERCISES[next].type === 'rest') {
      beep(330, 200, 'triangle');
    } else if (EXERCISES[next].type === 'work' || EXERCISES[next].type === 'warmup') {
      beep(660, 150, 'sine');
      setTimeout(() => beep(880, 150, 'sine'), 200);
    } else {
      beep(440, 300, 'sine');
    }
  }, []);

  const startTimer = useCallback(() => {
    setPhase('running');
    setTotalTime(0);
    setIdx(0);
    setTimeLeft(EXERCISES[0].duration);
    idxRef.current = 0;
    wasPausedRef.current = false;
    beep(660, 150, 'sine');
    setTimeout(() => beep(880, 150, 'sine'), 200);
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;
    intervalRef.current = setInterval(() => {
      setTotalTime(t => t + 1);
      setTimeLeft(t => {
        if (t <= 1) {
          // Time's up — advance on next tick
          return 0;
        }
        // Beep warning at 3s
        if (t === 4) {
          beep(880, 100, 'sine');
          setTimeout(() => beep(880, 100, 'sine'), 150);
          setTimeout(() => beep(880, 100, 'sine'), 300);
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  // Detect when timeLeft hits 0 and advance
  useEffect(() => {
    if (phase === 'running' && timeLeft === 0 && !wasPausedRef.current) {
      advanceExercise();
    }
  }, [timeLeft, phase, advanceExercise]);

  const togglePause = () => {
    if (phase === 'running') {
      wasPausedRef.current = true;
      clearInterval(intervalRef.current);
      setPhase('paused');
    } else if (phase === 'paused') {
      wasPausedRef.current = false;
      setPhase('running');
    }
  };

  const skipExercise = () => {
    clearInterval(intervalRef.current);
    if (phase === 'paused') wasPausedRef.current = false;
    // Si estem a l'últim exercici, acabar
    if (idxRef.current >= EXERCISES.length - 1) {
      setPhase('done');
      beep(660, 600, 'sine');
      return;
    }
    const next = idxRef.current + 1;
    idxRef.current = next;
    setIdx(next);
    setTimeLeft(EXERCISES[next].duration);
    // Beep
    if (EXERCISES[next].type === 'rest') {
      beep(330, 200, 'triangle');
    } else if (EXERCISES[next].type === 'work' || EXERCISES[next].type === 'warmup') {
      beep(660, 150, 'sine');
      setTimeout(() => beep(880, 150, 'sine'), 200);
    } else {
      beep(440, 300, 'sine');
    }
    if (phase === 'paused') setPhase('running');
  };

  const finishEarly = () => {
    clearInterval(intervalRef.current);
    setPhase('done');
    beep(660, 600, 'sine');
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setPhase('idle');
    setIdx(0);
    setTimeLeft(0);
    setTotalTime(0);
    idxRef.current = 0;
    wasPausedRef.current = false;
  };

  // Estat idle
  if (phase === 'idle') {
    return (
      <div className="app">
        <div className="card">
          <h1 className="title">🏋️ Cardio Casolà</h1>
          <p className="subtitle">Rutina nivell baix • 3 rondes • ~19 min</p>
          <div className="summary">
            <p>🔥 6 exercicis + escalfament + estiraments</p>
            <p>💪 Sense màquines • A casa • Al teu ritme</p>
          </div>
          <button className="btn btn-start" onClick={startTimer}>
            ▶ COMENÇAR
          </button>
        </div>
      </div>
    );
  }

  // Estat done
  if (phase === 'done') {
    // Calcular num exercises fets
    const workDone = EXERCISES.filter(e => e.type === 'work').length;
    return (
      <div className="app">
        <div className="card">
          <div className="emoji-big">🎉</div>
          <h1 className="title">Rutina completa!</h1>
          <p className="subtitle">Temps total: {formatTime(totalTime)}</p>
          <p className="subtitle">{workDone} exercicis fets 💪</p>
          <button className="btn btn-start" onClick={reset}>
            Tornar a començar
          </button>
        </div>
      </div>
    );
  }

  // Estat running / paused
  return (
    <div className="app">
      <div className="card" style={{ borderColor: COLORS[exercise.type] }}>
        {/* Temps total */}
        <div className="total-time">{formatTime(totalTime)}</div>

        {/* Etiqueta tipus */}
        <div className="type-badge" style={{ background: COLORS[exercise.type] }}>
          {LABELS[exercise.type]}
        </div>

        {/* Nom exercici */}
        <h2 className="exercise-name">{exercise.name}</h2>

        {/* Comptador */}
        <div className="timer" style={{ color: COLORS[exercise.type] }}>
          {formatTime(timeLeft)}
        </div>

        {/* Barra de progrés */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%`, background: COLORS[exercise.type] }}
          />
        </div>

        {/* Pausa / Reprendre */}
        <div className="controls">
          {phase === 'running' ? (
            <button className="btn btn-pause" onClick={togglePause}>⏸ Pausa</button>
          ) : (
            <button className="btn btn-resume" onClick={togglePause}>▶ Reprendre</button>
          )}
          <button className="btn btn-skip" onClick={skipExercise}>⏭ Saltar</button>
          <button className="btn btn-stop" onClick={reset}>⏹ Aturar</button>
        </div>

        {/* Progressió d'exercicis */}
        <div className="dots">
          {EXERCISES.filter((e, i) => i < EXERCISES.length - 1 && i % 6 === 0).map((_, i) => (
            <span
              key={i}
              className={`dot ${idx >= i * 6 ? 'dot-done' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
