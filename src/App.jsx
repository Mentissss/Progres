import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Plus, Minus, Check, X, Dumbbell, History, Library, Home, Settings, TrendingUp, Trash2, RotateCcw, Play, Award, Target, Info, Timer, Repeat, FileText, Pause, ExternalLink, Flame, Sparkles } from 'lucide-react';

// ============================================================
// BAZA ĆWICZEŃ: FABRYKA SIŁY (Priorytetowe z linkami)
// ============================================================
const fsRaw = [
  // NOGI / POŚLADKI
  ['Zakroki Zerchera', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zakroki-zerchera'],
  ['Wyprosty kolan na maszynie jednonóż', 'czworogłowe', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wyprosty-kolan-na-maszynie-jednonoz'],
  ['Przysiad ze sztangą ze stojaków', 'czworogłowe', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-ze-sztagna-ze-stojakow'],
  ['Pistolet na podwyższeniu', 'czworogłowe', 'bodyweight', 'compound', 4, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/pistolet-na-podwyzszeniu'],
  ['Zakroki ze sztangą na plecach', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zakroki-ze-sztanga-na-plecach'],
  ['Wykroki chodzone z hantlami', 'czworogłowe', 'dumbbell', 'compound', 10, 16, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wykroki-chodzone-z-hantlami-w-dloniach'],
  ['Przysiad bułgarski z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-z-hantlami-wersja-dla-miesnia-czworoglowego-uda'],
  ['Wypychanie nogami na suwnicy', 'czworogłowe', 'machine', 'compound', 8, 15, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/wypychanie-nogami-na-suwnicy'],
  ['Przysiad ze sztangą na plecach', 'czworogłowe', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-ze-sztanga-trzymana-na-plecach'],
  ['Przysiad ze sztangą z przodu', 'czworogłowe', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-ze-sztanga-trzymana-na-barkach'],
  ['Rumuński martwy ciąg (RDL)', 'dwugłowe uda', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/dwuglowe-uda/martwy-ciag-na-prostych-nogach-barbell'],
  ['Hip thrust ze sztangą', 'pośladki', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/unoszenie-bioder-ze-sztanga-w-oparciu-o-laweczke'],
  ['Zginanie nóg na maszynie', 'dwugłowe uda', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/dwuglowe-uda/zginanie-nog-na-maszynie-siedzac-seated'],
  ['Żuraw (Nordic curl)', 'dwugłowe uda', 'bodyweight', 'isolation', 4, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/zuraw'],
  
  // PLECY
  ['Klasyczny martwy ciąg', 'plecy', 'barbell', 'compound', 3, 6, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/klasyczny-martwy-ciag-barbell-deadlift'],
  ['Podciąganie na drążku nachwytem', 'plecy', 'bodyweight', 'compound', 5, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/podciaganie-na-drazku-trzymanym-nachwytem-pullups'],
  ['Wiosłowanie sztangą podchwytem', 'plecy', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-sztanga-trzymana-podchwytem-w-opadzie'],
  ['Wiosłowanie hantlami w opadzie', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-hantlami-w-opadzie-tulowia-bentover'],
  ['Ściąganie drążka wyciągu do klatki', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/sciaganie-drazka-wyciagu-gornego-do-klatki'],
  ['Przyciąganie linki wyciągu siedząc', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/przyciaganie-linki-wyciagu-dolnego-siedzac-seated'],

  // KLATKA
  ['Wyciskanie sztangi na ławce płaskiej', 'klatka', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangi-na-lawce-plaskiej-barbell'],
  ['Wyciskanie sztangi na skosie dodatnim', 'klatka', 'barbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangi-na-lawce-dodatniej-incline'],
  ['Wyciskanie sztangielek na ławce płaskiej', 'klatka', 'dumbbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangielek-na-lawce-plaskiej-dumbbell'],
  ['Wyciskanie sztangielek na skosie dodatnim', 'klatka', 'dumbbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangielek-na-lawce-dodatniej-incline'],
  ['Rozpiętki z hantlami na ławce płaskiej', 'klatka', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-z-hantlami-na-lawce-plaskiej'],
  ['Pompki na poręczach (Dips)', 'klatka', 'bodyweight', 'compound', 6, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/pompki-na-poreczach-dips-chest'],
  ['Pompki (wersja klasyczna)', 'klatka', 'bodyweight', 'compound', 10, 25, 'https://www.fabrykasily.pl/cwiczenia/klatka-piersiowa/pompki-wersja-klasyczna'],

  // BARKI
  ['Wyciskanie sztangi nad głowę (OHP)', 'barki', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-sztangi-nad-glowe-standing-front'],
  ['Wyciskanie hantli nad głowę siedząc', 'barki', 'dumbbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-hantli-nad-glowe-siedzac-seated'],
  ['Odwodzenie ramion w bok ze sztangielkami', 'barki', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/odwodzenie-ramion-w-bok-ze-sztangielkami'],
  ['Przyciąganie liny wyciągu (Face pull)', 'barki', 'cable', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/przyciaganie-liny-z-wyciagu-do-twarzy-face-pull'],

  // BICEPS / TRICEPS
  ['Zginanie przedramion ze sztangą', 'biceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-ze-sztanga-stojac-barbell'],
  ['Zginanie przedramion w chwycie młotkowym', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-hantlami-w-chwycie'],
  ['Wyciskanie wąskim chwytem na płaskiej', 'triceps', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/wyciskanie-sztangi-lamanej-waskim-chwytem'],
  ['Francuskie wyciskanie leżąc', 'triceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-ze-sztanga-lamana-lezac'],
  ['Prostowanie przedramion z linką wyciągu', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-z-lina-z-wyciagu'],

  // BRZUCH / ŁYDKI
  ['Deska (Plank przodem)', 'core', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/izometryczny-skurcz-miesni-brzucha-w-podporze'],
  ['Spięcia brzucha z linkami (Allahy)', 'core', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/spiecia-brzucha-z-linkami-wyciagu-gornego'],
  ['Wspięcia na palcach siedząc (maszyna)', 'łydki', 'machine', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-siedzac-na-maszynie'],
  ['Wspięcia na palcach stojąc z hantlą', 'łydki', 'dumbbell', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-stojac-z-hantlami']
];

const fsExercises = fsRaw.map((d, i) => ({
  id: 'fs-' + i, name: d[0], m: d[1], eq: d[2], t: d[3], rr: [d[4], d[5]],
  unit: d[4] >= 20 && d[1] === 'core' && d[0].toLowerCase().includes('deska') ? 's' : 'powt',
  url: d[6]
}));

// ============================================================
// BAZA ĆWICZEŃ: ORYGINALNA (Jako Rezerwa dla generatora)
// ============================================================
const originalEx = [
  { id: 'cable-cross-high', name: 'Krzyżowanie wyciągów z góry', m: 'klatka', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'pec-deck', name: 'Pec deck (butterfly)', m: 'klatka', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'machine-press-flat', name: 'Wyciskanie na maszynie', m: 'klatka', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'sumo-dl', name: 'Martwy ciąg sumo', m: 'plecy', eq: 'barbell', t: 'compound', rr: [3, 6] },
  { id: 'lat-pulldown-narrow', name: 'Ściąganie drążka wąskim chwytem', m: 'plecy', eq: 'cable', t: 'compound', rr: [8, 12] },
  { id: 'machine-row', name: 'Wiosłowanie na maszynie', m: 'plecy', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'machine-shoulder', name: 'Wyciskanie barków na maszynie', m: 'barki', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'cable-lateral', name: 'Wznosy linki bokiem', m: 'barki', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'cable-curl', name: 'Uginanie ramion na wyciągu', m: 'biceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'preacher-machine', name: 'Uginanie na modlitewniku (maszyna)', m: 'biceps', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'tri-pushdown-vbar', name: 'Prostowanie triceps na wyciągu (V-bar)', m: 'triceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'leg-ext', name: 'Prostowanie nóg siedząc', m: 'czworogłowe', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'hack-squat', name: 'Hack przysiad (maszyna)', m: 'czworogłowe', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'leg-press-calf', name: 'Wspięcia na suwnicy', m: 'łydki', eq: 'machine', t: 'isolation', rr: [10, 15] }
];

// Scalona baza (gwarantuje, że generator ma zawsze pełny wybór sprzętu)
const EX = [...fsExercises, ...originalEx];

const ytUrl = (name) => `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' fabryka siły')}`;

// ============================================================
// HELPERS
// ============================================================
const PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];
function calcPlates(targetWeight, barWeight = 20) {
  const perSide = (targetWeight - barWeight) / 2;
  if (perSide <= 0) return [];
  const result = [];
  let remaining = perSide;
  for (const p of PLATES) {
    while (remaining >= p - 0.001) { result.push(p); remaining -= p; }
  }
  return result;
}

function warmupSets(topWeight, isCompound) {
  if (topWeight < 30) return [];
  const sets = isCompound
    ? [{ pct: 0.4, reps: 8 }, { pct: 0.6, reps: 5 }, { pct: 0.8, reps: 3 }]
    : [{ pct: 0.5, reps: 8 }, { pct: 0.75, reps: 5 }];
  return sets.map(s => ({ weight: Math.round((topWeight * s.pct) / 2.5) * 2.5, reps: s.reps }));
}

const EQUIPMENT_AVAILABILITY = {
  full_gym: ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'],
  home_full: ['barbell', 'dumbbell', 'bodyweight'],
  dumbbell: ['dumbbell', 'bodyweight'],
  bodyweight: ['bodyweight'],
};

// ============================================================
// PLAN GENERATOR
// ============================================================
function pickN(arr, n, seen = new Set()) {
  const fresh = arr.filter(e => !seen.has(e.id));
  const pool = fresh.length >= n ? fresh : arr;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const out = shuffled.slice(0, n);
  out.forEach(e => seen.add(e.id));
  return out;
}

function buildWorkout(label, recipe, eqList, seen) {
  const exercises = [];
  for (const step of recipe) {
    const candidates = EX.filter(e => {
      if (!eqList.includes(e.eq)) return false;
      if (step.muscles && !step.muscles.includes(e.m)) return false;
      if (step.type && e.t !== step.type) return false;
      return true;
    });
    if (candidates.length === 0) continue;
    const picks = pickN(candidates, 1, seen);
    if (picks[0]) exercises.push({ ...picks[0], sets: step.sets || 3 });
  }
  return { name: label, exercises };
}

function generatePlan(profile) {
  const eq = EQUIPMENT_AVAILABILITY[profile.equipment];
  const seen = new Set();
  const days = profile.days;

  const PUSH = [ { muscles: ['klatka'], type: 'compound', sets: 4 }, { muscles: ['barki'], type: 'compound', sets: 3 }, { muscles: ['klatka'], sets: 3 }, { muscles: ['barki'], type: 'isolation', sets: 3 }, { muscles: ['triceps'], sets: 3 } ];
  const PULL = [ { muscles: ['plecy'], type: 'compound', sets: 4 }, { muscles: ['plecy'], type: 'compound', sets: 3 }, { muscles: ['plecy'], sets: 3 }, { muscles: ['barki'], type: 'isolation', sets: 3 }, { muscles: ['biceps'], sets: 3 } ];
  const LEGS = [ { muscles: ['czworogłowe'], type: 'compound', sets: 4 }, { muscles: ['dwugłowe uda'], type: 'compound', sets: 3 }, { muscles: ['pośladki', 'czworogłowe'], sets: 3 }, { muscles: ['czworogłowe'], type: 'isolation', sets: 3 }, { muscles: ['łydki'], sets: 4 } ];
  const UPPER = [ { muscles: ['klatka'], type: 'compound', sets: 4 }, { muscles: ['plecy'], type: 'compound', sets: 4 }, { muscles: ['barki'], type: 'compound', sets: 3 }, { muscles: ['biceps'], sets: 3 }, { muscles: ['triceps'], sets: 3 } ];
  const LOWER = [ { muscles: ['czworogłowe'], type: 'compound', sets: 4 }, { muscles: ['dwugłowe uda'], type: 'compound', sets: 3 }, { muscles: ['łydki'], sets: 4 }, { muscles: ['core'], sets: 3 } ];
  const FBA = [ { muscles: ['czworogłowe'], type: 'compound', sets: 4 }, { muscles: ['klatka'], type: 'compound', sets: 4 }, { muscles: ['plecy'], type: 'compound', sets: 4 }, { muscles: ['barki'], type: 'isolation', sets: 3 }, { muscles: ['biceps'], sets: 3 } ];
  const FBB = [ { muscles: ['dwugłowe uda'], type: 'compound', sets: 4 }, { muscles: ['barki'], type: 'compound', sets: 4 }, { muscles: ['plecy'], type: 'compound', sets: 4 }, { muscles: ['klatka'], sets: 3 }, { muscles: ['triceps'], sets: 3 } ];

  const splits = {
    2: [['Trening A — Full Body', FBA], ['Trening B — Full Body', FBB]],
    3: [['Push', PUSH], ['Pull', PULL], ['Legs', LEGS]],
    4: [['Upper A', UPPER], ['Lower A', LOWER], ['Upper B', UPPER], ['Lower B', LOWER]],
    5: [['Push', PUSH], ['Pull', PULL], ['Legs', LEGS], ['Upper', UPPER], ['Lower', LOWER]],
    6: [['Push A', PUSH], ['Pull A', PULL], ['Legs A', LEGS], ['Push B', PUSH], ['Pull B', PULL], ['Legs B', LEGS]],
  };

  const layout = splits[days] || splits[3];
  return layout.map(([label, recipe]) => buildWorkout(label, recipe, eq, new Set()));
}

// ============================================================
// PROGRESSION ALGORITHM
// ============================================================
function getRecommendation(exercise, history) {
  const isBW = exercise.eq === 'bodyweight';
  const isCompound = exercise.t === 'compound';
  const increment = isCompound ? (exercise.eq === 'barbell' ? 2.5 : 2) : 1.25;
  const [minR, maxR] = exercise.rr;

  if (!history || history.length === 0) {
    const startWeight = isBW ? 0 : (isCompound ? (exercise.eq === 'barbell' ? 40 : 10) : (exercise.eq === 'barbell' ? 20 : 5));
    return { weight: startWeight, reps: minR + Math.floor((maxR - minR) / 2), note: 'Pierwszy raz — zostaw 2-3 powtórzenia w zapasie (RIR).' };
  }

  const last = history[history.length - 1];
  const valid = last.sets.filter(s => s.completed && s.reps > 0);
  if (valid.length === 0) return { weight: last.sets[0]?.weight || 0, reps: minR, note: 'Powtórz ostatnie wartości.' };

  const avgRIR = valid.reduce((a, s) => a + (s.rir ?? 2), 0) / valid.length;
  const topReps = Math.max(...valid.map(s => s.reps));
  const lastWeight = valid[0].weight;

  if (avgRIR >= 3) return { weight: isBW ? lastWeight : lastWeight + increment * 2, reps: minR, note: 'Ostatnio za łatwo. Skok ciężaru.' };
  if (avgRIR >= 1.5) {
    if (topReps >= maxR) return { weight: isBW ? lastWeight : lastWeight + increment, reps: minR, note: `Górny zakres osiągnięty. +${increment} kg.` };
    return { weight: lastWeight, reps: Math.min(topReps + 1, maxR), note: 'Spróbuj dorzucić 1 powtórzenie.' };
  }
  if (avgRIR >= 0.5) return { weight: lastWeight, reps: topReps, note: 'Ten sam ciężar i powtórzenia.' };
  return { weight: isBW ? lastWeight : Math.max(0, lastWeight - increment * 2), reps: minR, note: 'Lekki deload (RIR 0 ostatnio).' };
}

// ============================================================
// STORAGE
// ============================================================
const KEY_PROFILE = 'progres:profile';
const KEY_PLAN = 'progres:plan';
const KEY_HISTORY = 'progres:history';
const KEY_ACTIVE = 'progres:active';

async function loadAll() {
  const out = { profile: null, plan: null, history: {}, active: null };
  for (const [field, key] of [['profile', KEY_PROFILE], ['plan', KEY_PLAN], ['history', KEY_HISTORY], ['active', KEY_ACTIVE]]) {
    try { const v = localStorage.getItem(key); if (v) out[field] = JSON.parse(v); } catch (e) {}
  }
  if (!out.history || typeof out.history !== 'object') out.history = {};
  return out;
}
async function saveOne(key, val) {
  try {
    if (val === null || val === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

// ============================================================
// UI HELPERS & ONBOARDING
// ============================================================
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
* { -webkit-tap-highlight-color: transparent; }
body, html, #root { background: #0a0a0a; }
.font-display { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
.font-body { font-family: 'Sora', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }
input[type="number"] { -moz-appearance: textfield; }
input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.scroll-hide::-webkit-scrollbar { display: none; }
.scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

const Btn = ({ children, onClick, variant = 'primary', className = '', ...rest }) => {
  const base = 'font-display uppercase tracking-wider text-base py-3 px-5 transition-all active:scale-[0.97] flex items-center justify-center gap-2';
  const styles = {
    primary: 'bg-[#d4ff00] text-black hover:bg-[#c0e800]',
    ghost: 'bg-transparent text-white border border-neutral-800 hover:border-neutral-700',
    dark: 'bg-neutral-900 text-white border border-neutral-800',
    danger: 'bg-transparent text-red-400 border border-red-900/60',
  };
  return <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`} {...rest}>{children}</button>;
};

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ goal: null, experience: null, days: null, equipment: null });
  const steps = [
    { key: 'goal', q: 'Jaki jest Twój cel?', opts: [{ v: 'muscle', l: 'Budowa masy', d: 'Hipertrofia' }, { v: 'strength', l: 'Siła', d: 'Niskie powtórzenia' }, { v: 'both', l: 'Siła + masa', d: 'Mieszane' }] },
    { key: 'experience', q: 'Twoje doświadczenie', opts: [{ v: 'beginner', l: 'Początkujący', d: '< 6 miesięcy' }, { v: 'intermediate', l: 'Średniozaawansowany', d: '6m – 2 lata' }, { v: 'advanced', l: 'Zaawansowany', d: '> 2 lata' }] },
    { key: 'days', q: 'Dni w tygodniu?', opts: [{ v: 3, l: '3 dni', d: 'PPL' }, { v: 4, l: '4 dni', d: 'Upper/Lower' }, { v: 5, l: '5 dni', d: 'PPL + UL' }, { v: 6, l: '6 dni', d: 'PPL x2' }] },
    { key: 'equipment', q: 'Jaki masz sprzęt?', opts: [{ v: 'full_gym', l: 'Pełna siłownia', d: 'Wszystko' }, { v: 'home_full', l: 'Dom: sztanga + hantle', d: 'Brak maszyn' }, { v: 'dumbbell', l: 'Tylko hantle', d: 'Hantle + BW' }, { v: 'bodyweight', l: 'Masa ciała', d: 'Bez sprzętu' }] },
  ];
  const cur = steps[step];

  const choose = (val) => {
    const next = { ...data, [cur.key]: val };
    setData(next);
    if (step < steps.length - 1) setTimeout(() => setStep(step + 1), 150);
    else onDone(next);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col p-5 pt-12">
      <div className="flex gap-1.5 mb-8">{steps.map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-[#d4ff00]' : 'bg-neutral-800'}`} />)}</div>
      <h1 className="font-display text-4xl uppercase mb-8">{cur.q}</h1>
      <div className="space-y-3">
        {cur.opts.map(opt => (
          <button key={opt.v} onClick={() => choose(opt.v)} className={`w-full text-left p-5 border ${data[cur.key] === opt.v ? 'border-[#d4ff00] bg-[#d4ff00]/5' : 'border-neutral-800'}`}>
            <div className="font-display text-2xl uppercase">{opt.l}</div>
            <div className="text-sm text-neutral-500">{opt.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// WIDOKI GŁÓWNE
// ============================================================
function HomeView({ plan, history, onStart }) {
  const totalSessions = Object.values(history).reduce((a, h) => a + (h?.length || 0), 0);
  
  const todayIdx = useMemo(() => {
    if (!plan || plan.length === 0) return 0;
    
    // Create a deduplicated list of sessions by sessionId
    const sessionsMap = {};
    for (const [exId, sessions] of Object.entries(history)) {
      for (const s of sessions || []) {
        if (!sessionsMap[s.sessionId]) {
          sessionsMap[s.sessionId] = { date: s.date, workoutName: s.workoutName };
        }
      }
    }
    const sessionList = Object.values(sessionsMap).sort((a, b) => b.date - a.date);
    
    if (sessionList.length === 0) return 0;
    const lastName = sessionList[0]?.workoutName;
    const idx = plan.findIndex(w => w.name === lastName);
    return idx === -1 ? 0 : (idx + 1) % plan.length;
  }, [plan, history]);

  const next = plan?.[todayIdx];

  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-5xl uppercase text-[#d4ff00]">PROGRES</h1>
      <p className="text-neutral-500 text-sm uppercase mb-8">Trener Siłowy</p>

      {next && (
        <div className="border border-[#d4ff00] p-5 mb-6">
          <div className="text-xs uppercase text-neutral-400 mb-2">Następny w planie</div>
          <h2 className="font-display text-3xl uppercase mb-4">{next.name}</h2>
          <Btn onClick={() => onStart(todayIdx)} className="w-full"><Play size={18} strokeWidth={3}/>Rozpocznij</Btn>
        </div>
      )}

      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Twój plan</div>
      <div className="space-y-2">
        {plan?.map((w, i) => (
          <button key={i} onClick={() => onStart(i)} className={`w-full text-left p-4 border ${i === todayIdx ? 'border-[#d4ff00]/40 bg-[#d4ff00]/5' : 'border-neutral-800'} flex items-center justify-between`}>
            <div>
              <div className="font-mono text-xs text-neutral-500">DZIEŃ {i + 1}</div>
              <div className="font-display text-xl uppercase">{w.name}</div>
            </div>
            <ChevronRight className="text-neutral-600" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EXERCISE DETAIL MODAL
// ============================================================
function eqLabel(eq) {
  return { barbell: 'Sztanga', dumbbell: 'Hantle', cable: 'Wyciąg', machine: 'Maszyna', bodyweight: 'Masa ciała' }[eq] || eq;
}

function ExerciseDetail({ exercise, history, onClose, onSwap, swapMode }) {
  const exHistory = history?.[exercise.id] || [];
  const allSets = exHistory.flatMap(s => s.sets.filter(st => st.completed));
  const pr = allSets.reduce((a, s) => Math.max(a, s.weight || 0), 0);
  const vUrl = exercise.url || ytUrl(exercise.name);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-[#0a0a0a] border-t-2 sm:border-2 border-[#d4ff00] w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 flex justify-between items-start border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase text-[#d4ff00] mb-1">
              <span>{exercise.m}</span>
              <span className="text-neutral-700">·</span>
              <span className="text-neutral-500">{eqLabel(exercise.eq)}</span>
            </div>
            <h2 className="font-display text-2xl uppercase leading-tight">{exercise.name}</h2>
          </div>
          <button onClick={onClose} className="shrink-0 text-neutral-500 hover:text-white"><X size={24}/></button>
        </div>
        <div className="p-5 space-y-5">
          {pr > 0 && (
            <div className="border border-neutral-800 p-3 flex items-center gap-3">
              <Award className="text-[#d4ff00]" size={20}/>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase">Twój rekord</div>
                <div className="font-mono text-lg text-white">{pr} kg</div>
              </div>
            </div>
          )}
          <div className="border border-neutral-800 p-3">
            <div className="text-xs uppercase text-neutral-500 mb-1">Zakres roboczy</div>
            <div className="font-mono text-white">{exercise.rr[0]}–{exercise.rr[1]} {exercise.unit || 'powt'}</div>
          </div>
          <a href={vUrl} target="_blank" rel="noopener noreferrer" className="bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between hover:border-red-500 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-red-600 flex items-center justify-center rounded-sm"><Play size={14} fill="white" stroke="white"/></div>
              <div>
                <div className="font-display uppercase text-base">Zobacz instruktaż</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">{exercise.url ? 'Wideo Fabryka Siły' : 'Wyszukaj na YT'}</div>
              </div>
            </div>
            <ExternalLink size={16} className="text-neutral-500"/>
          </a>
          {onSwap && <Btn variant="ghost" onClick={onSwap} className="w-full"><Repeat size={16}/>{swapMode ? 'Wymień to ćwiczenie' : 'Pokaż alternatywy'}</Btn>}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// WORKOUT VIEW
// ============================================================
function WorkoutView({ workout, history, onFinish, onCancel, active, setActive, profile, onSwapExercise }) {
  const [currentEx, setCurrentEx] = useState(active?.currentEx ?? 0);
  const [showDetail, setShowDetail] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [restSecs, setRestSecs] = useState(0);
  const [restTotal, setRestTotal] = useState(0);

  useEffect(() => { setCurrentEx(active?.currentEx ?? 0); }, [active?.workoutName]);

  useEffect(() => {
    if (restSecs <= 0) return;
    const id = setInterval(() => {
      setRestSecs(s => {
        if (s <= 1) {
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.frequency.value = 800; gain.gain.value = 0.2;
            osc.start(); osc.stop(ctx.currentTime + 0.15);
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          } catch (e) {}
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [restSecs]);

  if (!active) return null;
  
  if (workout.exercises.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-5 flex flex-col items-center justify-center text-center">
        <h2 className="font-display text-2xl mb-4 text-red-500">Pusty trening!</h2>
        <p className="text-neutral-500 mb-8">Generator nie znalazł odpowiednich ćwiczeń dla wybranego sprzętu.</p>
        <Btn onClick={onCancel}>Wróć</Btn>
      </div>
    );
  }

  const ex = workout.exercises[currentEx];
  const exHistory = history[ex?.id] || [];
  const recommendation = ex ? getRecommendation(ex, exHistory) : { weight: 0, reps: 0 };
  const allTimeBest = exHistory.flatMap(s => s.sets.filter(st => st.completed)).reduce((a, s) => Math.max(a, s.weight || 0), 0);
  const setData = active.exercises[currentEx];
  const warmups = ex.eq !== 'bodyweight' && ex.eq !== 'machine' ? warmupSets(recommendation.weight, ex.t === 'compound') : [];

  const updateSet = (setIdx, patch) => {
    const wasCompleted = setData.sets[setIdx].completed;
    const newActive = { ...active };
    newActive.exercises = active.exercises.map((e, i) => i === currentEx ? { ...e, sets: e.sets.map((s, j) => j === setIdx ? { ...s, ...patch } : s) } : e);
    newActive.currentEx = currentEx;
    setActive(newActive);

    if (patch.completed === true && !wasCompleted) {
      const rest = ex.t === 'compound' ? 180 : 90;
      setRestTotal(rest); setRestSecs(rest);
    }
  };

  const swapCurrentExercise = (newEx) => {
    const newActive = { ...active };
    newActive.exercises = newActive.exercises.map((e, i) => i === currentEx ? { exerciseId: newEx.id, sets: Array.from({ length: e.sets.length }, () => ({ weight: null, reps: null, rir: null, completed: false })) } : e);
    setActive(newActive);
    onSwapExercise(currentEx, newEx);
    setShowSwap(false); setShowDetail(false);
  };

  const totalCompleted = active.exercises.reduce((a, e) => a + e.sets.filter(s => s.completed).length, 0);
  const totalSets = active.exercises.reduce((a, e) => a + e.sets.length, 0);
  const isLast = currentEx === workout.exercises.length - 1;
  const elapsed = Math.floor((Date.now() - active.date) / 60000);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-32">
      <div className="sticky top-0 bg-[#0a0a0a] z-10 px-5 pt-6 pb-4 border-b border-neutral-900">
        <div className="flex justify-between items-center mb-3">
          <button onClick={onCancel} className="text-neutral-500 text-xs uppercase tracking-widest"><X size={14} className="inline mr-1"/>Anuluj</button>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-500"><Timer size={11} className="inline mr-1"/>{elapsed}min</span>
            <span className="font-mono text-xs text-neutral-500">{totalCompleted}/{totalSets} serii</span>
          </div>
        </div>
        <div className="h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div className="h-full bg-[#d4ff00] transition-all" style={{ width: `${(totalCompleted / totalSets) * 100}%` }}/>
        </div>
      </div>

      <div className="flex gap-2 px-5 pt-4 pb-2 overflow-x-auto scroll-hide">
        {workout.exercises.map((e, i) => {
          const done = active.exercises[i].sets.every(s => s.completed);
          return (
            <button
              key={i}
              onClick={() => { setCurrentEx(i); setActive({ ...active, currentEx: i }); setRestSecs(0); }}
              className={`shrink-0 w-9 h-9 flex items-center justify-center font-mono text-sm border ${i === currentEx ? 'border-[#d4ff00] text-[#d4ff00] bg-[#d4ff00]/10' : done ? 'border-neutral-700 text-neutral-400 bg-neutral-900' : 'border-neutral-800 text-neutral-600'}`}
            >
              {done ? <Check size={14} strokeWidth={3}/> : i + 1}
            </button>
          );
        })}
      </div>

      <div className="px-5 pt-4">
        <div className="flex justify-between items-start mb-4 gap-3">
          <h2 className="font-display text-3xl uppercase leading-tight flex-1">{ex.name}</h2>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setShowDetail(true)} className="w-10 h-10 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#d4ff00]/60"><Info size={18}/></button>
            <button onClick={() => setShowSwap(true)} className="w-10 h-10 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-[#d4ff00]/60"><Repeat size={18}/></button>
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 p-4 mb-4">
          <div className="flex items-center gap-2 text-xs text-[#d4ff00] uppercase tracking-widest mb-2"><Target size={12}/>Cel na dziś</div>
          <div className="flex items-baseline gap-2 font-mono mb-2">
            <span className="text-3xl">{recommendation.weight}</span><span className="text-sm text-neutral-500">{ex.eq === 'bodyweight' ? 'm.c.' : 'kg'}</span>
            <span className="text-3xl text-neutral-600 px-1">×</span>
            <span className="text-3xl">{recommendation.reps}</span><span className="text-sm text-neutral-500">{ex.unit || 'powt'}</span>
          </div>
          <div className="text-xs text-neutral-400">{recommendation.note}</div>
          
          {warmups.length > 0 && (
            <div className="mt-3 pt-3 border-t border-neutral-900">
              <div className="flex items-center gap-1.5 text-[10px] text-orange-400 uppercase tracking-widest mb-1"><Flame size={10}/>Rozgrzewka</div>
              <div className="font-mono text-xs text-neutral-400">{warmups.map(w => `${w.weight}×${w.reps}`).join(' → ')}</div>
            </div>
          )}
        </div>

        <div className="space-y-2 mt-5">
          <div className="grid grid-cols-12 gap-2 px-1 text-[10px] text-neutral-600 uppercase tracking-widest mb-1">
            <div className="col-span-1">#</div><div className="col-span-3">Ciężar</div><div className="col-span-2">Powt</div><div className="col-span-4">RIR</div><div className="col-span-2 text-right">OK</div>
          </div>
          {setData.sets.map((s, i) => {
            const isBW = ex.eq === 'bodyweight';
            const isPR = s.completed && s.weight && s.weight > allTimeBest && allTimeBest > 0;
            return (
              <div key={i} className={`grid grid-cols-12 gap-2 items-center p-2 border ${s.completed ? 'border-[#d4ff00]/40 bg-[#d4ff00]/5' : 'border-neutral-800'} relative`}>
                {isPR && <div className="absolute -top-2 left-2 px-1 bg-[#d4ff00] text-black text-[9px] font-mono font-bold uppercase flex items-center"><Sparkles size={9}/>PR</div>}
                <div className="col-span-1 font-mono text-sm text-neutral-500">{i + 1}</div>
                <div className="col-span-3">
                  <input type="number" inputMode="decimal" placeholder={String(recommendation.weight)} value={s.weight ?? ''} onChange={(e) => updateSet(i, { weight: e.target.value === '' ? null : Number(e.target.value) })} className="w-full bg-transparent border-b border-neutral-800 font-mono p-1 text-white focus:border-[#d4ff00] outline-none" disabled={isBW}/>
                </div>
                <div className="col-span-2">
                  <input type="number" inputMode="numeric" placeholder={String(recommendation.reps)} value={s.reps ?? ''} onChange={(e) => updateSet(i, { reps: e.target.value === '' ? null : Number(e.target.value) })} className="w-full bg-transparent border-b border-neutral-800 font-mono p-1 text-white focus:border-[#d4ff00] outline-none"/>
                </div>
                <div className="col-span-4 flex gap-1">
                  {[0, 1, 2, 3].map(r => (
                    <button key={r} onClick={() => updateSet(i, { rir: r })} className={`flex-1 py-1 text-xs font-mono border ${s.rir === r ? 'bg-[#d4ff00] text-black border-[#d4ff00]' : 'border-neutral-800 text-neutral-500'}`}>{r === 3 ? '3+' : r}</button>
                  ))}
                </div>
                <div className="col-span-2 flex justify-end">
                  <button onClick={() => updateSet(i, { completed: !s.completed, weight: s.weight ?? recommendation.weight, reps: s.reps ?? recommendation.reps, rir: s.rir ?? 2 })} className={`w-9 h-9 flex items-center justify-center border ${s.completed ? 'bg-[#d4ff00] text-black border-[#d4ff00]' : 'border-neutral-700 text-neutral-600'}`}><Check size={16}/></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {restSecs > 0 && <RestTimer secondsLeft={restSecs} totalSeconds={restTotal} onSkip={() => setRestSecs(0)} onAdjust={(d) => setRestSecs(s => Math.max(0, s + d))} />}

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#0a0a0a] border-t border-neutral-900 flex gap-2 z-20">
        <Btn variant="ghost" onClick={goPrev} className="flex-1" disabled={currentEx === 0}>Wstecz</Btn>
        <Btn onClick={goNext} className="flex-1">{isLast ? <>Zakończ <Check size={16}/></> : <>Dalej <ChevronRight size={16}/></>}</Btn>
      </div>

      {showSwap && (
        <div className="fixed inset-0 z-[60] bg-black/90 p-5 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 mt-10"><h2 className="font-display text-2xl uppercase">Wymień na:</h2><button onClick={() => setShowSwap(false)} className="text-neutral-500"><X size={24}/></button></div>
          <div className="space-y-2">
            {EX.filter(e => e.m === ex.m && EQUIPMENT_AVAILABILITY[profile.equipment].includes(e.eq) && e.id !== ex.id).map(e => (
              <button key={e.id} onClick={() => swapCurrentExercise(e)} className="w-full text-left p-4 border border-neutral-800 hover:border-[#d4ff00]"><div className="text-sm font-body">{e.name}</div></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// RESZTA WIDOKÓW
// ============================================================
function HistoryView({ history }) {
  const sessions = useMemo(() => {
    const map = {};
    Object.entries(history).forEach(([exId, setsList]) => {
      setsList.forEach(s => {
        if (!map[s.sessionId]) map[s.sessionId] = { date: s.date, name: s.workoutName, exs: [] };
        map[s.sessionId].exs.push({ exId, sets: s.sets });
      });
    });
    return Object.values(map).sort((a, b) => b.date - a.date);
  }, [history]);

  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-4xl uppercase mb-1">Historia</h1>
      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-6">{sessions.length} ukończonych sesji</p>
      
      {sessions.length === 0 ? (
        <div className="border border-dashed border-neutral-800 p-8 text-center text-neutral-500">
          Brak sesji. Rozpocznij pierwszy trening.
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((s, i) => (
            <div key={i} className="border border-neutral-800 p-4">
              <div className="flex justify-between items-baseline mb-3">
                <div className="font-display text-xl uppercase text-white">{s.name}</div>
                <div className="font-mono text-xs text-neutral-500">{new Date(s.date).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short' })}</div>
              </div>
              <div className="space-y-1">
                {s.exs.map((e, j) => {
                  const completed = e.sets.filter(x => x.completed);
                  if (completed.length === 0) return null;
                  return (
                    <div key={j} className="text-sm flex justify-between py-1 border-t border-neutral-900/50">
                      <span className="truncate pr-2 text-neutral-300">{EX.find(x => x.id === e.exId)?.name}</span>
                      <span className="font-mono text-xs text-neutral-500 shrink-0">{completed.map(x => `${x.weight}×${x.reps}`).join(' · ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressView({ history }) {
  const exerciseList = Object.entries(history)
    .map(([id, sessions]) => ({ id, sessions: sessions || [] }))
    .filter(e => e.sessions.length > 0)
    .map(e => ({ ...e, exercise: EX.find(x => x.id === e.id) }))
    .filter(e => e.exercise);

  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-4xl uppercase mb-1">Postępy</h1>
      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-8">Rekordy i trendy</p>
      {exerciseList.length === 0 ? (
        <div className="border border-dashed border-neutral-800 p-8 text-center text-neutral-500">Trenuj, by zobaczyć wykresy.</div>
      ) : (
        <div className="space-y-4">
          {exerciseList.map(({ id, sessions, exercise }) => {
            const allSets = sessions.flatMap(s => s.sets.filter(st => st.completed));
            if (allSets.length === 0) return null;
            const maxWeight = Math.max(...allSets.map(s => s.weight || 0));
            const lastSession = sessions[sessions.length - 1];
            const topSetLast = lastSession.sets.filter(s => s.completed).reduce((a, s) => (s.weight > (a?.weight || 0) ? s : a), null);

            return (
              <div key={id} className="border border-neutral-800 p-4">
                <h3 className="font-display text-lg uppercase mb-3 text-white">{exercise.name}</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-[10px] text-neutral-600 uppercase tracking-widest">Rekord</div>
                    <div className="font-mono text-lg text-[#d4ff00]">{maxWeight} kg</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-600 uppercase tracking-widest">Ostatnio</div>
                    <div className="font-mono text-lg text-white">{topSetLast ? `${topSetLast.weight}×${topSetLast.reps}` : '—'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LibraryView({ history }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sel, setSel] = useState(null);
  
  const muscles = ['all', ...Array.from(new Set(EX.map(e => e.m)))];
  let filtered = filter === 'all' ? EX : EX.filter(e => e.m === filter);
  if (search.trim()) filtered = filtered.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-4xl uppercase mb-1">Biblioteka</h1>
      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">{EX.length} ćwiczeń</p>
      
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Szukaj..." className="w-full p-3 bg-neutral-950 border border-neutral-800 text-sm focus:border-[#d4ff00] outline-none mb-3"/>
      
      <div className="flex gap-2 overflow-x-auto scroll-hide -mx-5 px-5 pb-3 mb-2">
        {muscles.map(m => (
          <button key={m} onClick={() => setFilter(m)} className={`shrink-0 px-3 py-1.5 text-xs uppercase tracking-wider border ${filter === m ? 'bg-[#d4ff00] text-black border-[#d4ff00]' : 'border-neutral-800 text-neutral-400'}`}>
            {m === 'all' ? 'Wszystkie' : m}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(e => (
          <button key={e.id} onClick={() => setSel(e)} className="w-full text-left border border-neutral-800 p-4 hover:border-[#d4ff00]/40 transition-colors">
            <div className="flex justify-between items-start gap-2 mb-1">
              <span className="text-sm font-body text-white">{e.name}</span>
              <span className="text-[9px] font-mono text-[#d4ff00] border border-[#d4ff00]/40 px-1 py-0.5 rounded-sm shrink-0 uppercase">
                {e.url ? 'WIDEO FS' : 'WIDEO YT'}
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-widest">{e.m} · {eqLabel(e.eq)}</div>
          </button>
        ))}
      </div>
      {sel && <ExerciseDetail exercise={sel} history={history} onClose={() => setSel(null)} />}
    </div>
  );
}

function PlanEditor({ plan, profile, onSave, onCancel }) {
  const [workouts, setWorkouts] = useState(JSON.parse(JSON.stringify(plan)));

  const renameWorkout = (idx) => {
    const newName = window.prompt('Nazwa treningu:', workouts[idx].name);
    if (newName?.trim()) setWorkouts(workouts.map((w, i) => i === idx ? { ...w, name: newName.trim() } : w));
  };
  const deleteWorkout = (idx) => {
    if (window.confirm(`Usunąć trening?`)) setWorkouts(workouts.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      <div className="sticky top-0 bg-[#0a0a0a] z-20 px-5 pt-6 pb-4 border-b border-neutral-900 flex justify-between">
        <button onClick={onCancel} className="text-neutral-500 text-sm uppercase tracking-wider"><X size={14} className="inline mr-1"/>Anuluj</button>
        <button onClick={() => onSave(workouts)} className="bg-[#d4ff00] text-black px-4 py-2 text-sm uppercase tracking-wider font-bold"><Check size={16} className="inline mr-1"/>Zapisz</button>
      </div>
      <div className="px-5 pt-4">
        <h1 className="font-display text-3xl uppercase mb-6">Edytor planu</h1>
        <div className="space-y-4">
          {workouts.map((w, wIdx) => (
            <div key={wIdx} className="border border-neutral-800">
              <div className="flex justify-between items-center p-3 border-b border-neutral-900 bg-neutral-950">
                <button onClick={() => renameWorkout(wIdx)} className="text-left">
                  <div className="font-mono text-[10px] text-neutral-500 uppercase">DZIEŃ {wIdx + 1}</div>
                  <div className="font-display text-lg uppercase">{w.name}</div>
                </button>
                <button onClick={() => deleteWorkout(wIdx)} className="text-neutral-500 hover:text-red-400"><Trash2 size={16}/></button>
              </div>
              <div className="divide-y divide-neutral-900">
                {w.exercises.map((e, eIdx) => (
                  <div key={eIdx} className="p-3 text-sm text-neutral-300">{e.name}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsView({ profile, onRegenerate, onReset, onEditPlan }) {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-4xl uppercase mb-8">Ustawienia</h1>
      <div className="border border-neutral-800 p-4 mb-3">
        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Profil</div>
        <div className="flex justify-between py-2 border-b border-neutral-900"><span className="text-sm text-neutral-400">Cel</span><span className="font-mono text-sm text-white">{profile.goal}</span></div>
        <div className="flex justify-between py-2 border-b border-neutral-900"><span className="text-sm text-neutral-400">Dni</span><span className="font-mono text-sm text-white">{profile.days}</span></div>
        <div className="flex justify-between py-2"><span className="text-sm text-neutral-400">Sprzęt</span><span className="font-mono text-sm text-white">{profile.equipment}</span></div>
      </div>
      <Btn onClick={onEditPlan} className="w-full mb-3"><FileText size={16}/>Edytuj plan</Btn>
      <Btn variant="ghost" onClick={onRegenerate} className="w-full mb-6"><RotateCcw size={16}/>Wygeneruj nowy plan</Btn>
      {confirming ? (
        <div className="border border-red-900/60 p-4">
          <div className="text-sm text-red-300 mb-3">Skasować wszystkie dane?</div>
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={() => setConfirming(false)} className="flex-1">Anuluj</Btn>
            <Btn variant="danger" onClick={onReset} className="flex-1">Skasuj</Btn>
          </div>
        </div>
      ) : <Btn variant="danger" onClick={() => setConfirming(true)} className="w-full"><Trash2 size={16}/>Resetuj aplikację</Btn>}
    </div>
  );
}

function BottomNav({ view, setView }) {
  const items = [ { id: 'home', i: Home, l: 'Dziś' }, { id: 'progress', i: TrendingUp, l: 'Postępy' }, { id: 'history', i: History, l: 'Historia' }, { id: 'library', i: Library, l: 'Ćwicz.' }, { id: 'settings', i: Settings, l: 'Ust.' } ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-neutral-900 grid grid-cols-5 z-40">
      {items.map(it => (
        <button key={it.id} onClick={() => setView(it.id)} className={`py-3 flex flex-col items-center gap-1 ${view === it.id ? 'text-[#d4ff00]' : 'text-neutral-600'}`}>
          <it.i size={20} strokeWidth={view === it.id ? 2.5 : 2}/>
          <span className="text-[10px] uppercase font-mono">{it.l}</span>
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [history, setHistory] = useState({});
  const [active, setActive] = useState(null);
  const [view, setView] = useState('home');

  useEffect(() => { loadAll().then(d => { setProfile(d.profile); setPlan(d.plan); setHistory(d.history); setActive(d.active); setLoading(false); }); }, []);

  const handleSwap = (exIdx, newEx) => {
    if (!active || !plan) return;
    const wIdx = active.workoutIdx;
    const newPlan = [...plan];
    newPlan[wIdx] = { ...newPlan[wIdx], exercises: newPlan[wIdx].exercises.map((e, i) => i === exIdx ? { ...newEx, sets: e.sets } : e) };
    setPlan(newPlan); saveOne(KEY_PLAN, newPlan);
  };

  const finish = () => {
    if (!active) return;
    const newHist = { ...history };
    active.exercises.forEach(e => {
      if (!newHist[e.exerciseId]) newHist[e.exerciseId] = [];
      newHist[e.exerciseId] = [...newHist[e.exerciseId], { date: active.date, sessionId: active.sessionId, workoutName: active.workoutName, sets: e.sets }];
    });
    setHistory(newHist); saveOne(KEY_HISTORY, newHist);
    setActive(null); saveOne(KEY_ACTIVE, null); 
    setView('home'); // POPRAWKA: po zakończeniu treningu wraca do ekranu "Dziś"
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#d4ff00] font-display text-2xl uppercase tracking-widest">Progres</div>;
  if (!profile) return <><style>{FONT_IMPORT}</style><Onboarding onDone={d => { setProfile(d); saveOne(KEY_PROFILE, d); const p = generatePlan(d); setPlan(p); saveOne(KEY_PLAN, p); }}/></>;

  if (active) {
    const liveWorkout = { ...plan[active.workoutIdx], exercises: active.exercises.map((ae, i) => ({ ...(EX.find(x => x.id === ae.exerciseId) || plan[active.workoutIdx].exercises[i]), sets: ae.sets.length })) };
    return <><style>{FONT_IMPORT}</style><WorkoutView workout={liveWorkout} history={history} active={active} setActive={a => { setActive(a); saveOne(KEY_ACTIVE, a); }} onFinish={finish} onCancel={() => { setActive(null); saveOne(KEY_ACTIVE, null); }} profile={profile} onSwapExercise={handleSwap}/></>;
  }

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-body">
        {view === 'editor' ? <PlanEditor plan={plan} profile={profile} onSave={p => { setPlan(p); saveOne(KEY_PLAN, p); setView('home'); }} onCancel={() => setView('home')}/> : (
          <>
            {view === 'home' && <HomeView plan={plan} history={history} onStart={i => { const w = plan[i]; const a = { sessionId: `s_${Date.now()}`, workoutName: w.name, workoutIdx: i, date: Date.now(), currentEx: 0, exercises: w.exercises.map(e => ({ exerciseId: e.id, sets: Array(e.sets).fill({ weight: null, reps: null, rir: null, completed: false }) })) }; setActive(a); saveOne(KEY_ACTIVE, a); }} />}
            {view === 'history' && <HistoryView history={history}/>}
            {view === 'progress' && <ProgressView history={history}/>}
            {view === 'library' && <LibraryView history={history}/>}
            {view === 'settings' && <SettingsView profile={profile} onRegenerate={() => { const p = generatePlan(profile); setPlan(p); saveOne(KEY_PLAN, p); setView('home'); }} onReset={() => { localStorage.clear(); window.location.reload(); }} onEditPlan={() => setView('editor')} />}
            <BottomNav view={view} setView={setView}/>
          </>
        )}
      </div>
    </>
  );
}
