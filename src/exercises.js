export const EXERCISES = [
  // === ESCALFAMENT (3 min) ===
  { name: 'Escalfament: Marxa al lloc', duration: 60, type: 'warmup' },
  { name: 'Escalfament: Rotacions turmells, genolls, braços', duration: 60, type: 'warmup' },
  { name: 'Escalfament: Jumping jacks suaus', duration: 60, type: 'warmup' },
  // === CIRCUIT (3 rondes) ===
  ...Array.from({ length: 3 }, (_, ronda) => [
    { name: `Ronda ${ronda + 1}: Marxa al lloc genolls alts`, duration: 30, type: 'work' },
    { name: `Ronda ${ronda + 1}: Squats sense salt`, duration: 30, type: 'work' },
    { name: `Ronda ${ronda + 1}: Mountain climbers lents`, duration: 30, type: 'work' },
    { name: 'Descans', duration: 30, type: 'rest' },
    { name: `Ronda ${ronda + 1}: Jumping jacks lleugers`, duration: 30, type: 'work' },
    { name: `Ronda ${ronda + 1}: Step touch`, duration: 30, type: 'work' },
    ...(ronda < 2
      ? [{ name: 'Descans entre rondes', duration: 60, type: 'rest' }]
      : []),
  ]).flat(),
  // === ESTIRAMENTS (2 min) ===
  { name: 'Estiraments: Quàdriceps (taló al culo)', duration: 60, type: 'cooldown' },
  { name: 'Estiraments: Cames, esquena, braços', duration: 60, type: 'cooldown' },
  // === FI ===
  { name: '🎉 Rutina completa!', duration: 0, type: 'done' },
];

export const TOTAL_EXERCISES = EXERCISES.length;
