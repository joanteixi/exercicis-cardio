export const EXERCISES = [
  // === ESCALFAMENT (3 min) ===
  {
    name: 'Escalfament: Marxa al lloc',
    duration: 60,
    type: 'warmup',
    icon: '🚶',
    desc: 'Camina al lloc movent braços. Ni córrer, ni saltar — escalfar suaument.',
  },
  {
    name: 'Escalfament: Rotacions',
    duration: 60,
    type: 'warmup',
    icon: '🔄',
    desc: 'Roda turmells, genolls i braços en cercles. Desperta les articulacions.',
  },
  {
    name: 'Escalfament: Jumping jacks suaus',
    duration: 60,
    type: 'warmup',
    icon: '⭐',
    desc: 'Obre i tanca braços i cames sense saltar. Com un estel de mar suau.',
  },
  // === CIRCUIT (3 rondes) ===
  ...Array.from({ length: 3 }, (_, ronda) => [
    {
      name: `Ronda ${ronda + 1}: Marxa genolls alts`,
      duration: 30,
      type: 'work',
      icon: '🏃',
      desc: 'Camina al lloc aixecant genolls fins a la cintura. Braços amunt i avall al ritme.',
    },
    {
      name: `Ronda ${ronda + 1}: Squats`,
      duration: 30,
      type: 'work',
      icon: '🪑',
      desc: 'Dret, baixa el cul com si t\'asseguessis a una cadira. Genolls no passin punteres. Torna amunt.',
    },
    {
      name: `Ronda ${ronda + 1}: Mountain climbers`,
      duration: 30,
      type: 'work',
      icon: '⛰️',
      desc: 'En posició de planxa (com flexions), porta genolls al pit alternant. A poc a poc.',
    },
    {
      name: 'Descans',
      duration: 30,
      type: 'rest',
      icon: '💨',
      desc: 'Respira. Camina al lloc suaument. Glop d\'aigua si cal.',
    },
    {
      name: `Ronda ${ronda + 1}: Jumping jacks lleugers`,
      duration: 30,
      type: 'work',
      icon: '🤸',
      desc: 'Obre i tanca braços i cames. Sense saltar fort, amb ritme.',
    },
    {
      name: `Ronda ${ronda + 1}: Step touch`,
      duration: 30,
      type: 'work',
      icon: '👣',
      desc: 'Toca un peu a un costat, l\'altre al costat contrari. Com si trepitjassis taques al terra.',
    },
    ...(ronda < 2
      ? [{ name: 'Descans entre rondes', duration: 60, type: 'rest', icon: '💧', desc: 'Respira fondo. Camina al lloc. Prepara\'t per la següent ronda.' }]
      : []),
  ]).flat(),
  // === ESTIRAMENTS (2 min) ===
  {
    name: 'Estiraments: Quàdriceps',
    duration: 60,
    type: 'cooldown',
    icon: '🦵',
    desc: 'Dret, porta taló al cul agafant-te el peu. Aguanta 30s cada cama.',
  },
  {
    name: 'Estiraments: Cames, esquena, braços',
    duration: 60,
    type: 'cooldown',
    icon: '🧘',
    desc: 'Toca\'t els peus (cames rectes), estira braços amunt, roda espatlles. Sensació de relax.',
  },
  // === FI ===
  { name: '🎉 Rutina completa!', duration: 0, type: 'done', icon: '🎉', desc: '' },
];

export const TOTAL_EXERCISES = EXERCISES.length;
