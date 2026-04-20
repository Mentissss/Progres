import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Plus, Minus, Check, X, Dumbbell, History, Library, Home, Settings, TrendingUp, Trash2, RotateCcw, Play, Award, Target, Info, Timer, Repeat, FileText, Pause, ExternalLink, Flame, Sparkles } from 'lucide-react';

// ============================================================
// EXERCISE DATABASE
// ============================================================
const EX = [
  // ============ KLATKA (chest) ============
  { id: 'bb-bench', name: 'Wyciskanie sztangi na ławce płaskiej', m: 'klatka', eq: 'barbell', t: 'compound', rr: [5, 10] },
  { id: 'bb-incline', name: 'Wyciskanie sztangi na ławce skośnej', m: 'klatka', eq: 'barbell', t: 'compound', rr: [6, 12] },
  { id: 'bb-decline', name: 'Wyciskanie sztangi na ławce ujemnej', m: 'klatka', eq: 'barbell', t: 'compound', rr: [6, 12] },
  { id: 'bb-floor-press', name: 'Wyciskanie sztangi z podłogi', m: 'klatka', eq: 'barbell', t: 'compound', rr: [5, 8] },
  { id: 'db-bench', name: 'Wyciskanie hantli na ławce płaskiej', m: 'klatka', eq: 'dumbbell', t: 'compound', rr: [6, 12] },
  { id: 'db-incline', name: 'Wyciskanie hantli na ławce skośnej', m: 'klatka', eq: 'dumbbell', t: 'compound', rr: [6, 12] },
  { id: 'db-decline', name: 'Wyciskanie hantli na ławce ujemnej', m: 'klatka', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'db-floor-press', name: 'Wyciskanie hantli z podłogi', m: 'klatka', eq: 'dumbbell', t: 'compound', rr: [6, 10] },
  { id: 'sa-db-bench', name: 'Wyciskanie hantli jednorącz', m: 'klatka', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'db-fly-flat', name: 'Rozpiętki hantlami na ławce płaskiej', m: 'klatka', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'db-fly-incline', name: 'Rozpiętki hantlami na ławce skośnej', m: 'klatka', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'db-fly-decline', name: 'Rozpiętki hantlami na ławce ujemnej', m: 'klatka', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'svend-press', name: 'Svend press (ściskanie talerza)', m: 'klatka', eq: 'dumbbell', t: 'isolation', rr: [12, 20] },
  { id: 'around-world', name: 'Around the worlds z hantlami', m: 'klatka', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'cable-cross-high', name: 'Krzyżowanie wyciągów z góry', m: 'klatka', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'cable-cross-low', name: 'Krzyżowanie wyciągów z dołu', m: 'klatka', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'cable-cross-mid', name: 'Krzyżowanie wyciągów na wprost', m: 'klatka', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'cable-fly-bench', name: 'Rozpiętki na wyciągu na ławce', m: 'klatka', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'sa-cable-press', name: 'Wyciskanie wyciągu jednorącz', m: 'klatka', eq: 'cable', t: 'compound', rr: [10, 15] },
  { id: 'pec-deck', name: 'Pec deck (butterfly)', m: 'klatka', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'machine-press-flat', name: 'Wyciskanie na maszynie (płaskie)', m: 'klatka', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'machine-press-incline', name: 'Wyciskanie na maszynie (skośne)', m: 'klatka', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'machine-press-decline', name: 'Wyciskanie na maszynie (ujemne)', m: 'klatka', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'smith-bench-flat', name: 'Wyciskanie na suwnicy Smitha (płaskie)', m: 'klatka', eq: 'machine', t: 'compound', rr: [6, 12] },
  { id: 'smith-bench-incline', name: 'Wyciskanie na suwnicy Smitha (skośne)', m: 'klatka', eq: 'machine', t: 'compound', rr: [6, 12] },
  { id: 'dips-chest', name: 'Dipy na poręczach (klatka)', m: 'klatka', eq: 'bodyweight', t: 'compound', rr: [6, 15] },
  { id: 'pushup', name: 'Pompki klasyczne', m: 'klatka', eq: 'bodyweight', t: 'compound', rr: [10, 25] },
  { id: 'pushup-incline', name: 'Pompki ze stopami niżej (łatwiejsze)', m: 'klatka', eq: 'bodyweight', t: 'compound', rr: [10, 25] },
  { id: 'pushup-decline', name: 'Pompki ze stopami w górze', m: 'klatka', eq: 'bodyweight', t: 'compound', rr: [8, 20] },
  { id: 'pushup-deficit', name: 'Pompki na uchwytach (deficit)', m: 'klatka', eq: 'bodyweight', t: 'compound', rr: [8, 15] },
  { id: 'pushup-archer', name: 'Pompki łucznika', m: 'klatka', eq: 'bodyweight', t: 'compound', rr: [5, 12] },
  { id: 'plyo-pushup', name: 'Pompki plyometryczne', m: 'klatka', eq: 'bodyweight', t: 'compound', rr: [5, 10] },

  // ============ PLECY (back) ============
  { id: 'deadlift', name: 'Martwy ciąg klasyczny', m: 'plecy', eq: 'barbell', t: 'compound', rr: [3, 6] },
  { id: 'sumo-dl', name: 'Martwy ciąg sumo', m: 'plecy', eq: 'barbell', t: 'compound', rr: [3, 6] },
  { id: 'trap-bar-dl', name: 'Martwy ciąg trap-bar', m: 'plecy', eq: 'barbell', t: 'compound', rr: [4, 8] },
  { id: 'rack-pull', name: 'Rack pulls (martwy ciąg z podstawek)', m: 'plecy', eq: 'barbell', t: 'compound', rr: [5, 8] },
  { id: 'deficit-dl', name: 'Martwy ciąg z deficytu', m: 'plecy', eq: 'barbell', t: 'compound', rr: [4, 6] },
  { id: 'pull-up', name: 'Podciąganie nachwytem', m: 'plecy', eq: 'bodyweight', t: 'compound', rr: [5, 12] },
  { id: 'pull-up-wide', name: 'Podciąganie szerokim nachwytem', m: 'plecy', eq: 'bodyweight', t: 'compound', rr: [4, 10] },
  { id: 'chin-up', name: 'Podciąganie podchwytem', m: 'plecy', eq: 'bodyweight', t: 'compound', rr: [5, 12] },
  { id: 'pull-up-neutral', name: 'Podciąganie chwytem neutralnym', m: 'plecy', eq: 'bodyweight', t: 'compound', rr: [5, 12] },
  { id: 'weighted-pull-up', name: 'Podciąganie z obciążeniem', m: 'plecy', eq: 'bodyweight', t: 'compound', rr: [4, 8] },
  { id: 'inverted-row', name: 'Australijskie podciąganie (wiosło)', m: 'plecy', eq: 'bodyweight', t: 'compound', rr: [8, 15] },
  { id: 'lat-pulldown-wide', name: 'Ściąganie drążka szerokim chwytem', m: 'plecy', eq: 'cable', t: 'compound', rr: [8, 12] },
  { id: 'lat-pulldown-narrow', name: 'Ściąganie drążka wąskim chwytem', m: 'plecy', eq: 'cable', t: 'compound', rr: [8, 12] },
  { id: 'lat-pulldown-neutral', name: 'Ściąganie drążka chwytem neutralnym', m: 'plecy', eq: 'cable', t: 'compound', rr: [8, 12] },
  { id: 'lat-pulldown-reverse', name: 'Ściąganie drążka podchwytem', m: 'plecy', eq: 'cable', t: 'compound', rr: [8, 12] },
  { id: 'sa-lat-pulldown', name: 'Ściąganie wyciągu jednorącz', m: 'plecy', eq: 'cable', t: 'compound', rr: [10, 15] },
  { id: 'straight-arm-pulldown', name: 'Ściąganie wyciągu prostymi rękami', m: 'plecy', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'bb-row', name: 'Wiosłowanie sztangą w opadzie', m: 'plecy', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'yates-row', name: 'Wiosłowanie sztangą podchwytem (Yates)', m: 'plecy', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'pendlay-row', name: 'Pendlay row (wiosłowanie z podłogi)', m: 'plecy', eq: 'barbell', t: 'compound', rr: [5, 8] },
  { id: 'meadows-row', name: 'Meadows row (landmine jednorącz)', m: 'plecy', eq: 'barbell', t: 'compound', rr: [8, 12] },
  { id: 'seal-row', name: 'Seal row (wiosło na ławce w pozycji leżącej)', m: 'plecy', eq: 'barbell', t: 'compound', rr: [8, 12] },
  { id: 't-bar', name: 'Wiosłowanie T-bar', m: 'plecy', eq: 'barbell', t: 'compound', rr: [8, 12] },
  { id: 'db-row', name: 'Wiosłowanie hantlą jednorącz', m: 'plecy', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'kroc-row', name: 'Kroc row (ciężka wiosło hantlą)', m: 'plecy', eq: 'dumbbell', t: 'compound', rr: [10, 20] },
  { id: 'chest-supp-db-row', name: 'Wiosłowanie hantlami z podparciem klatki', m: 'plecy', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'cable-row-wide', name: 'Wiosłowanie wyciągiem (szeroko)', m: 'plecy', eq: 'cable', t: 'compound', rr: [8, 12] },
  { id: 'cable-row-narrow', name: 'Wiosłowanie wyciągiem (wąsko)', m: 'plecy', eq: 'cable', t: 'compound', rr: [8, 12] },
  { id: 'sa-cable-row', name: 'Wiosłowanie wyciągiem jednorącz', m: 'plecy', eq: 'cable', t: 'compound', rr: [10, 15] },
  { id: 'machine-row', name: 'Wiosłowanie na maszynie', m: 'plecy', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'high-row-machine', name: 'High row na maszynie', m: 'plecy', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'db-pullover', name: 'Pullover z hantlą', m: 'plecy', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'cable-pullover', name: 'Pullover na wyciągu', m: 'plecy', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'face-pull', name: 'Przyciąganie liny do twarzy', m: 'plecy', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'shrugs-db', name: 'Wzruszenia barkami z hantlami', m: 'plecy', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'shrugs-bb', name: 'Wzruszenia barkami ze sztangą', m: 'plecy', eq: 'barbell', t: 'isolation', rr: [10, 15] },
  { id: 'shrugs-cable', name: 'Wzruszenia barkami na wyciągu', m: 'plecy', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'shrugs-trap-bar', name: 'Wzruszenia barkami trap-bar', m: 'plecy', eq: 'barbell', t: 'isolation', rr: [8, 12] },

  // ============ BARKI (shoulders) ============
  { id: 'ohp', name: 'Wyciskanie żołnierskie stojąc (OHP)', m: 'barki', eq: 'barbell', t: 'compound', rr: [5, 10] },
  { id: 'seated-bb-press', name: 'Wyciskanie sztangi siedząc', m: 'barki', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'push-press', name: 'Push press (z odbicia nóg)', m: 'barki', eq: 'barbell', t: 'compound', rr: [4, 8] },
  { id: 'btn-press', name: 'Wyciskanie zza karku', m: 'barki', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'landmine-press', name: 'Landmine press (mina)', m: 'barki', eq: 'barbell', t: 'compound', rr: [8, 12] },
  { id: 'db-shoulder-press', name: 'Wyciskanie hantli nad głowę stojąc', m: 'barki', eq: 'dumbbell', t: 'compound', rr: [6, 12] },
  { id: 'seated-db-press', name: 'Wyciskanie hantli nad głowę siedząc', m: 'barki', eq: 'dumbbell', t: 'compound', rr: [6, 12] },
  { id: 'arnold', name: 'Arnold press', m: 'barki', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'sa-db-press', name: 'Wyciskanie hantli nad głowę jednorącz', m: 'barki', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'machine-shoulder', name: 'Wyciskanie barków na maszynie', m: 'barki', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'smith-shoulder-press', name: 'Wyciskanie nad głowę na suwnicy Smitha', m: 'barki', eq: 'machine', t: 'compound', rr: [6, 12] },
  { id: 'lateral-raise', name: 'Wznosy hantli bokiem', m: 'barki', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'seated-lateral', name: 'Wznosy hantli bokiem siedząc', m: 'barki', eq: 'dumbbell', t: 'isolation', rr: [12, 15] },
  { id: 'leaning-lateral', name: 'Wznosy bokiem w przechyle (jednorącz)', m: 'barki', eq: 'dumbbell', t: 'isolation', rr: [12, 15] },
  { id: 'cable-lateral', name: 'Wznosy linki bokiem', m: 'barki', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'machine-lateral', name: 'Wznosy bokiem na maszynie', m: 'barki', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'front-raise-db', name: 'Wznosy hantli przodem', m: 'barki', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'front-raise-bb', name: 'Wznosy sztangi przodem', m: 'barki', eq: 'barbell', t: 'isolation', rr: [10, 15] },
  { id: 'front-raise-cable', name: 'Wznosy linki przodem', m: 'barki', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'plate-raise', name: 'Wznosy talerzem przodem', m: 'barki', eq: 'barbell', t: 'isolation', rr: [10, 15] },
  { id: 'rear-delt-machine', name: 'Odwrotne rozpiętki na maszynie (rear delt)', m: 'barki', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'rear-delt-db', name: 'Odwrotne rozpiętki hantlami w opadzie', m: 'barki', eq: 'dumbbell', t: 'isolation', rr: [12, 15] },
  { id: 'rear-delt-cable', name: 'Odwrotne rozpiętki na wyciągu', m: 'barki', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'cable-rear-cross', name: 'Krzyżowanie wyciągów na tylne aktony', m: 'barki', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'cuban-press', name: 'Cuban press', m: 'barki', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'bradford-press', name: 'Bradford press', m: 'barki', eq: 'barbell', t: 'compound', rr: [8, 12] },
  { id: 'pike-pushup', name: 'Pompki w pozycji szczupaka', m: 'barki', eq: 'bodyweight', t: 'compound', rr: [8, 15] },
  { id: 'handstand-pushup', name: 'Pompki w staniu na rękach', m: 'barki', eq: 'bodyweight', t: 'compound', rr: [3, 8] },

  // ============ BICEPS ============
  { id: 'bb-curl', name: 'Uginanie ramion ze sztangą prostą', m: 'biceps', eq: 'barbell', t: 'isolation', rr: [8, 12] },
  { id: 'ez-curl', name: 'Uginanie ramion ze sztangą łamaną (EZ)', m: 'biceps', eq: 'barbell', t: 'isolation', rr: [8, 12] },
  { id: 'db-curl', name: 'Uginanie ramion z hantlami stojąc', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [8, 12] },
  { id: 'seated-db-curl', name: 'Uginanie hantli siedząc', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [8, 12] },
  { id: 'alt-db-curl', name: 'Uginanie hantli naprzemiennie', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'hammer-curl', name: 'Uginanie młotkowe', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [8, 12] },
  { id: 'cross-hammer', name: 'Uginanie młotkowe na klatkę', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [10, 12] },
  { id: 'preacher-curl-bb', name: 'Uginanie na modlitewniku ze sztangą', m: 'biceps', eq: 'barbell', t: 'isolation', rr: [8, 12] },
  { id: 'preacher-curl-db', name: 'Uginanie na modlitewniku z hantlą', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [8, 12] },
  { id: 'preacher-machine', name: 'Uginanie na modlitewniku (maszyna)', m: 'biceps', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'cable-curl', name: 'Uginanie ramion na wyciągu (drążek)', m: 'biceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'cable-rope-curl', name: 'Uginanie ramion na wyciągu (linka)', m: 'biceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'bayesian-curl', name: 'Bayesian curl (wyciąg za plecami)', m: 'biceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'concentration-curl', name: 'Uginanie z koncentracją (concentration curl)', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [10, 12] },
  { id: 'incline-curl', name: 'Uginanie hantli na ławce skośnej', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [8, 12] },
  { id: 'spider-curl', name: 'Spider curl', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [10, 12] },
  { id: 'zottman-curl', name: 'Zottman curl', m: 'biceps', eq: 'dumbbell', t: 'isolation', rr: [10, 12] },
  { id: '21s', name: '21-tki ze sztangą', m: 'biceps', eq: 'barbell', t: 'isolation', rr: [21, 21] },
  { id: 'reverse-curl', name: 'Uginanie sztangi nachwytem (reverse)', m: 'biceps', eq: 'barbell', t: 'isolation', rr: [10, 12] },
  { id: 'drag-curl', name: 'Drag curl', m: 'biceps', eq: 'barbell', t: 'isolation', rr: [10, 12] },

  // ============ TRICEPS ============
  { id: 'tri-pushdown-rope', name: 'Prostowanie ramion na wyciągu (linka)', m: 'triceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'tri-pushdown-vbar', name: 'Prostowanie ramion na wyciągu (V-bar)', m: 'triceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'tri-pushdown-bar', name: 'Prostowanie ramion na wyciągu (drążek prosty)', m: 'triceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'reverse-pushdown', name: 'Prostowanie ramion podchwytem', m: 'triceps', eq: 'cable', t: 'isolation', rr: [12, 15] },
  { id: 'sa-pushdown', name: 'Prostowanie ramion jednorącz na wyciągu', m: 'triceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'overhead-tri-db', name: 'Wyciskanie francuskie nad głową (hantel)', m: 'triceps', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'overhead-tri-cable', name: 'Wyciskanie francuskie nad głową (wyciąg)', m: 'triceps', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'overhead-tri-ez', name: 'Wyciskanie francuskie nad głową (EZ)', m: 'triceps', eq: 'barbell', t: 'isolation', rr: [10, 12] },
  { id: 'skullcrusher-ez', name: 'Wyciskanie francuskie leżąc (EZ)', m: 'triceps', eq: 'barbell', t: 'isolation', rr: [8, 12] },
  { id: 'skullcrusher-db', name: 'Wyciskanie francuskie leżąc (hantle)', m: 'triceps', eq: 'dumbbell', t: 'isolation', rr: [10, 12] },
  { id: 'jm-press', name: 'JM press', m: 'triceps', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'tate-press', name: 'Tate press', m: 'triceps', eq: 'dumbbell', t: 'isolation', rr: [10, 12] },
  { id: 'close-grip', name: 'Wyciskanie wąsko sztangą', m: 'triceps', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'close-grip-smith', name: 'Wyciskanie wąsko na suwnicy Smitha', m: 'triceps', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'tri-dips', name: 'Dipy między ławkami', m: 'triceps', eq: 'bodyweight', t: 'compound', rr: [8, 15] },
  { id: 'parallel-dips', name: 'Dipy na poręczach (triceps)', m: 'triceps', eq: 'bodyweight', t: 'compound', rr: [6, 12] },
  { id: 'diamond-pushup', name: 'Pompki diamentowe', m: 'triceps', eq: 'bodyweight', t: 'compound', rr: [8, 15] },
  { id: 'kickback', name: 'Wyprost ramienia w opadzie (kickback)', m: 'triceps', eq: 'dumbbell', t: 'isolation', rr: [10, 15] },
  { id: 'cable-kickback', name: 'Kickback na wyciągu', m: 'triceps', eq: 'cable', t: 'isolation', rr: [12, 15] },

  // ============ CZWOROGŁOWE (quads) ============
  { id: 'back-squat', name: 'Przysiad ze sztangą (back squat)', m: 'czworogłowe', eq: 'barbell', t: 'compound', rr: [5, 10] },
  { id: 'low-bar-squat', name: 'Przysiad low-bar', m: 'czworogłowe', eq: 'barbell', t: 'compound', rr: [3, 6] },
  { id: 'front-squat', name: 'Przysiad przedni (front squat)', m: 'czworogłowe', eq: 'barbell', t: 'compound', rr: [5, 8] },
  { id: 'pause-squat', name: 'Przysiad z pauzą', m: 'czworogłowe', eq: 'barbell', t: 'compound', rr: [3, 6] },
  { id: 'box-squat', name: 'Box squat (przysiad na skrzynię)', m: 'czworogłowe', eq: 'barbell', t: 'compound', rr: [3, 6] },
  { id: 'zercher-squat', name: 'Przysiad Zerchera', m: 'czworogłowe', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'safety-bar-squat', name: 'Przysiad ze sztangą bezpieczeństwa', m: 'czworogłowe', eq: 'barbell', t: 'compound', rr: [5, 8] },
  { id: 'goblet-squat', name: 'Przysiad goblet z hantlą', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'heel-elev-goblet', name: 'Przysiad goblet z piętami uniesionymi', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'bulgarian', name: 'Przysiad bułgarski (split squat)', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'fes-split-squat', name: 'Split squat z przednią nogą uniesioną', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'lunges', name: 'Wykroki w miejscu z hantlami', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'walking-lunges', name: 'Wykroki chodzone z hantlami', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [10, 16] },
  { id: 'reverse-lunges', name: 'Wykroki w tył', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'step-up', name: 'Wchodzenie na skrzynię', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'cossack-squat', name: 'Przysiad kozacki', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [6, 10] },
  { id: 'leg-press', name: 'Wypychanie nogami na suwnicy', m: 'czworogłowe', eq: 'machine', t: 'compound', rr: [8, 15] },
  { id: 'sa-leg-press', name: 'Wypychanie nogą jednonóż', m: 'czworogłowe', eq: 'machine', t: 'compound', rr: [10, 15] },
  { id: 'hack-squat', name: 'Hack przysiad (maszyna)', m: 'czworogłowe', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'pendulum-squat', name: 'Pendulum squat (maszyna)', m: 'czworogłowe', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'belt-squat', name: 'Przysiad z pasem (belt squat)', m: 'czworogłowe', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'smith-squat', name: 'Przysiad na suwnicy Smitha', m: 'czworogłowe', eq: 'machine', t: 'compound', rr: [8, 12] },
  { id: 'leg-ext', name: 'Prostowanie nóg siedząc', m: 'czworogłowe', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'sa-leg-ext', name: 'Prostowanie nogi jednonóż', m: 'czworogłowe', eq: 'machine', t: 'isolation', rr: [12, 15] },
  { id: 'sissy-squat', name: 'Sissy squat', m: 'czworogłowe', eq: 'bodyweight', t: 'isolation', rr: [10, 15] },
  { id: 'cyclist-squat', name: 'Przysiad cyklisty (wąska postawa)', m: 'czworogłowe', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'wall-sit', name: 'Wall sit (siad pod ścianą)', m: 'czworogłowe', eq: 'bodyweight', t: 'isolation', rr: [30, 60], unit: 's' },
  { id: 'pistol-squat', name: 'Pistolet (przysiad jednonóż)', m: 'czworogłowe', eq: 'bodyweight', t: 'compound', rr: [4, 8] },

  // ============ DWUGŁOWE UDA (hamstrings) ============
  { id: 'rdl', name: 'Martwy ciąg rumuński (RDL)', m: 'dwugłowe uda', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'db-rdl', name: 'RDL z hantlami', m: 'dwugłowe uda', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'sl-rdl', name: 'RDL na jednej nodze', m: 'dwugłowe uda', eq: 'dumbbell', t: 'compound', rr: [8, 12] },
  { id: 'stiff-leg-dl', name: 'Stiff-leg deadlift (sztywne nogi)', m: 'dwugłowe uda', eq: 'barbell', t: 'compound', rr: [6, 10] },
  { id: 'lying-curl', name: 'Uginanie nóg leżąc', m: 'dwugłowe uda', eq: 'machine', t: 'isolation', rr: [8, 12] },
  { id: 'seated-curl', name: 'Uginanie nóg siedząc', m: 'dwugłowe uda', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'standing-curl', name: 'Uginanie nóg stojąc', m: 'dwugłowe uda', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'nordic-curl', name: 'Nordic curl', m: 'dwugłowe uda', eq: 'bodyweight', t: 'isolation', rr: [4, 8] },
  { id: 'ghr', name: 'Glute-ham raise (GHR)', m: 'dwugłowe uda', eq: 'machine', t: 'isolation', rr: [6, 10] },
  { id: 'good-morning', name: 'Good morning ze sztangą', m: 'dwugłowe uda', eq: 'barbell', t: 'compound', rr: [8, 12] },
  { id: 'pull-through', name: 'Cable pull-through', m: 'dwugłowe uda', eq: 'cable', t: 'compound', rr: [10, 15] },
  { id: 'reverse-hyper', name: 'Reverse hyper (odwrotne unoszenie tułowia)', m: 'dwugłowe uda', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'back-extension', name: 'Hyperextension (unoszenie tułowia)', m: 'dwugłowe uda', eq: 'bodyweight', t: 'isolation', rr: [10, 15] },

  // ============ POŚLADKI (glutes) ============
  { id: 'hip-thrust', name: 'Hip thrust ze sztangą', m: 'pośladki', eq: 'barbell', t: 'compound', rr: [8, 12] },
  { id: 'db-hip-thrust', name: 'Hip thrust z hantlą', m: 'pośladki', eq: 'dumbbell', t: 'compound', rr: [10, 15] },
  { id: 'machine-hip-thrust', name: 'Hip thrust na maszynie', m: 'pośladki', eq: 'machine', t: 'compound', rr: [10, 15] },
  { id: 'sl-hip-thrust', name: 'Hip thrust na jednej nodze', m: 'pośladki', eq: 'bodyweight', t: 'compound', rr: [8, 12] },
  { id: 'b-stance-hip-thrust', name: 'B-stance hip thrust', m: 'pośladki', eq: 'barbell', t: 'compound', rr: [10, 15] },
  { id: 'glute-bridge', name: 'Mostek biodrowy', m: 'pośladki', eq: 'bodyweight', t: 'isolation', rr: [12, 20] },
  { id: 'frog-pump', name: 'Frog pump', m: 'pośladki', eq: 'bodyweight', t: 'isolation', rr: [15, 25] },
  { id: 'cable-kickback', name: 'Pośladek na wyciągu (kickback)', m: 'pośladki', eq: 'cable', t: 'isolation', rr: [12, 15] },
  { id: 'machine-kickback', name: 'Kickback pośladkowy na maszynie', m: 'pośladki', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'glute-medius', name: 'Wznosy nogi bokiem (glute medius)', m: 'pośladki', eq: 'cable', t: 'isolation', rr: [12, 20] },
  { id: 'clamshell', name: 'Clamshells z taśmą', m: 'pośladki', eq: 'bodyweight', t: 'isolation', rr: [15, 20] },

  // ============ ŁYDKI (calves) ============
  { id: 'standing-calf', name: 'Wspięcia na palce stojąc (maszyna)', m: 'łydki', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'seated-calf', name: 'Wspięcia na palce siedząc (maszyna)', m: 'łydki', eq: 'machine', t: 'isolation', rr: [12, 20] },
  { id: 'donkey-calf', name: 'Donkey calf raise', m: 'łydki', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'leg-press-calf', name: 'Wspięcia na suwnicy', m: 'łydki', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'smith-calf', name: 'Wspięcia na suwnicy Smitha', m: 'łydki', eq: 'machine', t: 'isolation', rr: [10, 15] },
  { id: 'sl-db-calf', name: 'Wspięcia jednonóż z hantlą', m: 'łydki', eq: 'dumbbell', t: 'isolation', rr: [12, 20] },
  { id: 'db-calf', name: 'Wspięcia z hantlami', m: 'łydki', eq: 'dumbbell', t: 'isolation', rr: [12, 20] },
  { id: 'bb-calf', name: 'Wspięcia ze sztangą', m: 'łydki', eq: 'barbell', t: 'isolation', rr: [10, 15] },
  { id: 'tibialis-raise', name: 'Wznosy piszczeli (tibialis)', m: 'łydki', eq: 'bodyweight', t: 'isolation', rr: [15, 25] },

  // ============ PRZEDRAMIONA (forearms) ============
  { id: 'wrist-curl-bb', name: 'Uginanie nadgarstków ze sztangą', m: 'przedramiona', eq: 'barbell', t: 'isolation', rr: [12, 20] },
  { id: 'wrist-curl-db', name: 'Uginanie nadgarstków z hantlami', m: 'przedramiona', eq: 'dumbbell', t: 'isolation', rr: [12, 20] },
  { id: 'reverse-wrist-curl', name: 'Odwrotne uginanie nadgarstków', m: 'przedramiona', eq: 'barbell', t: 'isolation', rr: [12, 20] },
  { id: 'behind-back-wrist', name: 'Uginanie nadgarstków zza pleców', m: 'przedramiona', eq: 'barbell', t: 'isolation', rr: [12, 20] },
  { id: 'farmers-carry', name: 'Spacer farmera', m: 'przedramiona', eq: 'dumbbell', t: 'compound', rr: [20, 40], unit: 's' },
  { id: 'plate-pinch', name: 'Pinch grip (ściskanie talerzy)', m: 'przedramiona', eq: 'bodyweight', t: 'isolation', rr: [15, 30], unit: 's' },
  { id: 'dead-hang', name: 'Wis na drążku', m: 'przedramiona', eq: 'bodyweight', t: 'isolation', rr: [20, 60], unit: 's' },
  { id: 'wrist-roller', name: 'Wrist roller (zwijanie ciężaru)', m: 'przedramiona', eq: 'bodyweight', t: 'isolation', rr: [3, 6] },

  // ============ CORE / BRZUCH ============
  { id: 'plank', name: 'Deska (plank)', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [30, 60], unit: 's' },
  { id: 'side-plank', name: 'Deska boczna', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [20, 45], unit: 's' },
  { id: 'leg-raise', name: 'Unoszenie nóg w zwisie', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [8, 15] },
  { id: 'knee-raise', name: 'Unoszenie kolan w zwisie', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [10, 20] },
  { id: 'cable-crunch', name: 'Brzuszki na wyciągu', m: 'core', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'decline-crunch', name: 'Brzuszki na ławce ujemnej', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [12, 20] },
  { id: 'situp', name: 'Klasyczne brzuszki', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [15, 25] },
  { id: 'russian-twist', name: 'Russian twist', m: 'core', eq: 'dumbbell', t: 'isolation', rr: [16, 30] },
  { id: 'bicycle-crunch', name: 'Rowerek (bicycle crunch)', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [16, 30] },
  { id: 'ab-wheel', name: 'Rolka do brzucha', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [8, 15] },
  { id: 'dragon-flag', name: 'Dragon flag', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [4, 8] },
  { id: 'l-sit', name: 'L-sit', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [10, 30], unit: 's' },
  { id: 'v-up', name: 'V-up', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [10, 20] },
  { id: 'mountain-climber', name: 'Mountain climbers', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [20, 40] },
  { id: 'dead-bug', name: 'Dead bug', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [10, 15] },
  { id: 'pallof-press', name: 'Pallof press', m: 'core', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'woodchopper', name: 'Wood chopper na wyciągu', m: 'core', eq: 'cable', t: 'isolation', rr: [10, 15] },
  { id: 'hanging-windshield', name: 'Wycieraczki w zwisie', m: 'core', eq: 'bodyweight', t: 'isolation', rr: [6, 12] },
];

// ============================================================
// EXERCISE DESCRIPTIONS (technique cues for main lifts)
// ============================================================
const DESC = {
  // KLATKA
  'bb-bench': {
    setup: 'Łopatki ściągnięte i schowane w dół, mostek wypchnięty, stopy mocno na podłodze. Chwyt nieco szerszy niż barki, nadgarstki nad łokciami.',
    cues: ['Sztanga ląduje na dolnej części klatki', 'Łokcie pod kątem ~45° do tułowia', 'Pchnij się od ławki — całe ciało napięte', 'Pełen zakres — dotknij klatki, wyprostuj ramiona'],
    mistake: 'Łokcie rozłożone na 90° → ból barków. Brak ściągniętych łopatek → niestabilność.',
  },
  'bb-incline': {
    setup: 'Ławka na 30-45°. Łopatki ściągnięte, stopy stabilne. Chwyt jak na płaskiej.',
    cues: ['Sztanga schodzi do górnej części klatki', 'Wyprost prosto w górę, nie łukiem', 'Łokcie 45°', 'Wyższy kąt = więcej barków, niższy = więcej klatki'],
  },
  'db-bench': {
    setup: 'Hantle nad sutkami, dłonie skierowane do siebie lub w dół. Łopatki ściągnięte.',
    cues: ['Pełen zakres — hantle obok klatki na dole', 'W górze wyciśnij i lekko zbliż hantle', 'Kontrolowany ekscentryk (2-3s w dół)', 'Łokcie pod hantlami przez cały ruch'],
  },
  'dips-chest': {
    setup: 'Tułów lekko pochylony do przodu, łokcie skierowane na zewnątrz. Nogi za sobą lub skrzyżowane.',
    cues: ['Pochyl się do przodu = więcej klatki', 'Schodź do uczucia rozciągnięcia w klatce', 'Łokcie nie blokują się w pełnym wyproście', 'Dodaj obciążenie gdy 12+ powtórzeń'],
  },
  'cable-cross-high': {
    setup: 'Wyciągi ustawione wysoko, lekkie pochylenie tułowia, jedna noga z przodu dla stabilności.',
    cues: ['Łuk ruchu — łokcie lekko ugięte i nie ruszają się', 'Ruch w dół i do siebie', 'Spinaj klatkę na końcu zakresu', 'Rozciągnij klatkę kontrolowanie w pozycji startowej'],
  },
  'pec-deck': {
    setup: 'Plecy mocno przylegają, stopy płasko. Łokcie na poduszkach (lub przedramiona).',
    cues: ['Tylko łokcie się stykają, nie ręce', 'Powolny ekscentryk', 'Pełne rozciągnięcie na końcu', '1-2 sekundowa pauza w skurczu'],
  },
  // PLECY
  'deadlift': {
    setup: 'Sztanga nad środkiem stóp, golenie blisko sztangi. Chwyt nieco szerszy niż nogi. Plecy proste, klatka wypchnięta, biodra wyżej niż kolana.',
    cues: ['Sztanga prowadzona blisko ciała', 'Wypych nogami od podłogi, biodra i klatka idą razem', 'Aktywne łopatki — bary lekko ściągnięte', 'Bez przeprostu w lędźwiach na górze'],
    mistake: 'Zaokrąglone plecy = kontuzja. Sztanga z dala od goleni = utrata dźwigni.',
  },
  'sumo-dl': {
    setup: 'Stopy szeroko, palce na zewnątrz ~30°. Chwyt sztangi wąski, w środku.',
    cues: ['Biodra niżej, tułów bardziej pionowy niż w klasycznym DL', 'Kolana wypchnięte na zewnątrz, w linii ze stopami', 'Łopatki nad sztangą na starcie', 'Prowadź klatkę do góry, sztanga wzdłuż goleni'],
  },
  'rdl': {
    setup: 'Sztanga w rękach, kolana lekko ugięte i nieruchome. Plecy proste, klatka wypchnięta.',
    cues: ['Biodra do tyłu — jak zamykanie drzwi tyłkiem', 'Sztanga zsuwa się po udach blisko ciała', 'Schodź do uczucia rozciągnięcia dwugłowych', 'Wracaj wypychając biodra do przodu'],
    mistake: 'Zginanie kolan zamiast bioder. Zaokrąglone plecy.',
  },
  'pull-up': {
    setup: 'Chwyt nachwytem nieco szerszy niż barki. Pełny zwis na rozciągniętych ramionach (z aktywnymi łopatkami).',
    cues: ['Najpierw ściągnij łopatki, potem ciągnij ramieniem', 'Klatka do drążka, łokcie do bioder', 'Pełen zakres — broda wyraźnie nad drążkiem', 'Kontrolowany ekscentryk (2-3s)'],
  },
  'lat-pulldown-wide': {
    setup: 'Drążek szeroki, chwyt nachwytem szerzej niż barki. Lekko odchyl tułów (~10°).',
    cues: ['Ciągnij łokciami w dół do żeber, nie rękami', 'Drążek do górnej części klatki', 'Spin łopatki na dole', 'Nie kołysz tułowiem'],
  },
  'bb-row': {
    setup: 'Pochylenie ~45°, plecy proste, sztanga wisi pod barkami. Chwyt szerokość barków.',
    cues: ['Łokcie w stronę bioder', 'Sztanga ląduje na dolnych żebrach/pępku', 'Spin łopatek na końcu', 'Tułów stabilny — nie buja'],
  },
  'db-row': {
    setup: 'Jedno kolano i ręka na ławce, plecy prostopadle do podłogi. Hantel wisi swobodnie.',
    cues: ['Ciągnij łokciem do biodra (nie do barku)', 'Pełne rozciągnięcie na dole', 'Spin łopatki na końcu', 'Bez rotacji tułowia'],
  },
  'cable-row-narrow': {
    setup: 'Stopy oparte, kolana lekko ugięte, plecy proste, klatka wypchnięta.',
    cues: ['Ciągnij łokciami obok ciała', 'Uchwyt do brzucha', 'Spin łopatek na końcu', 'Nie odchylaj tułowia ponad pion'],
  },
  'face-pull': {
    setup: 'Wyciąg na poziomie twarzy, chwyt linki nadchwytem.',
    cues: ['Łokcie wysoko na poziomie barków', 'Końce linki do uszu', 'Pauza ze ściągniętymi tylnymi aktonami', 'Lekki ciężar, kontrola'],
  },
  // BARKI
  'ohp': {
    setup: 'Sztanga na obojczykach, chwyt nieco szerszy niż barki. Pośladki i brzuch napięte, łokcie lekko z przodu sztangi.',
    cues: ['Cofnij głowę gdy sztanga przechodzi twarz', 'Wypych pionowo w górę', 'Na górze sztanga nad środkiem stóp', 'Bez wybijania z bioder (chyba że robisz push press)'],
  },
  'db-shoulder-press': {
    setup: 'Hantle na wysokości barków, dłonie do przodu. Łokcie pod hantlami.',
    cues: ['Wypych w górę po lekkim łuku', 'Hantle stykają się delikatnie na górze', 'Pełen zakres — łokcie poniżej barków na dole', 'Brzuch napięty, bez przeprostu w lędźwiach'],
  },
  'lateral-raise': {
    setup: 'Stopy szerokość bioder, hantle przy biodrach, lekkie pochylenie tułowia do przodu.',
    cues: ['Łokcie prowadzą ruch, nie dłonie', 'Hantle do poziomu barków, nie wyżej', 'Lekkie ugięcie łokci, zafiksowane', 'Powolny ekscentryk (2-3s)'],
    mistake: 'Bujanie ciężarem z bioder. Zbyt ciężki ciężar = trapezy zamiast barków.',
  },
  'rear-delt-machine': {
    setup: 'Klatka oparta o poduszkę, chwyt uchwytów neutralny lub nachwytem.',
    cues: ['Łokcie na zewnątrz, prowadzą ruch', 'Spin łopatek na końcu zakresu', 'Bez rzucania — kontrola', 'Lekkie pochylenie głowy do przodu izoluje tylne aktony'],
  },
  // BICEPS
  'bb-curl': {
    setup: 'Chwyt podchwytem szerokość barków. Łokcie blisko tułowia, ramiona unieruchomione.',
    cues: ['Tylko łokieć się rusza', 'Pełen zakres — sztanga do barków', 'Bez bujania bioder', 'Spin biceps na górze'],
  },
  'db-curl': {
    setup: 'Hantle przy biodrach, dłonie do przodu lub neutralne (skręcaj w trakcie ruchu).',
    cues: ['Łokcie unieruchomione przy ciele', 'Supinacja (skręt nadgarstka) podczas wznoszenia', 'Pełen zakres', 'Powolny ekscentryk'],
  },
  'hammer-curl': {
    setup: 'Hantle przy biodrach, dłonie zwrócone do siebie (chwyt młotkowy).',
    cues: ['Trzymaj chwyt neutralny przez cały ruch', 'Łokcie przy ciele', 'Pełen zakres do barków', 'Atakuje brachialis i przedramię'],
  },
  // TRICEPS
  'tri-pushdown-rope': {
    setup: 'Wyciąg na samej górze, chwyt linki neutralny. Łokcie blisko ciała, lekkie pochylenie do przodu.',
    cues: ['Tylko łokieć się rusza', 'Rozciągnij linkę na dole — końce w bok', 'Pełen wyprost na końcu', 'Łokcie nigdy nie odchodzą od tułowia'],
  },
  'overhead-tri-cable': {
    setup: 'Plecami do wyciągu, linka nad głową. Łokcie skierowane do przodu, blisko głowy.',
    cues: ['Łokcie nieruchome, prowadzą do góry', 'Pełne rozciągnięcie tricepsa na dole', 'Wyprost na samej górze', 'Bez wyginania pleców'],
  },
  'skullcrusher-ez': {
    setup: 'Leżąc na ławce, sztanga EZ nad klatką. Łokcie skierowane w sufit.',
    cues: ['Tylko łokieć się rusza, ramię pionowe', 'Sztanga schodzi do czoła lub za głowę', 'Pełen wyprost', 'Łokcie nie rozjeżdżają się na boki'],
  },
  'close-grip': {
    setup: 'Jak wyciskanie, ale chwyt na szerokość barków lub minimalnie węższy. Łokcie blisko tułowia.',
    cues: ['Łokcie schowane, blisko żeber', 'Sztanga do dolnej części klatki', 'Pełen wyprost ramion', 'Pełna ROM = lepsza praca tricepsa'],
  },
  // NOGI
  'back-squat': {
    setup: 'Sztanga na górnej części trapezów (high-bar) lub niżej na tylnych aktonach (low-bar). Stopy szerokość barków, palce lekko na zewnątrz.',
    cues: ['Klatka wypchnięta, plecy proste przez cały ruch', 'Kolana w linii ze stopami (nie do środka)', 'Schodź do równoległości lub poniżej', 'Wypych przez piętę i śródstopie, nie palce'],
    mistake: 'Kolana zwijane do środka. Zaokrąglenie pleców na dole. Pięty odrywające się od podłogi.',
  },
  'front-squat': {
    setup: 'Sztanga na przednich aktonach barków, łokcie wysoko (równolegle do podłogi). Chwyt frontalny lub krzyżowy.',
    cues: ['Łokcie wysoko przez cały ruch', 'Tułów bardziej pionowy niż w back squat', 'Schodź głębiej — większy zakres ruchu', 'Pchaj kolana do przodu i na zewnątrz'],
  },
  'leg-press': {
    setup: 'Stopy na platformie szerokość barków. Plecy i pośladki przylegają. Kąt kolan ~90° na starcie.',
    cues: ['Schodź kontrolowanie do ~90° lub niżej', 'Bez odrywania pośladków — to obciąża lędźwie', 'Kolana w linii ze stopami', 'Nie blokuj kolan na końcu'],
  },
  'hack-squat': {
    setup: 'Plecy oparte, ramiona pod poduszkami. Stopy na platformie szerokość barków.',
    cues: ['Schodź do równoległości lub poniżej', 'Stopy wyżej = więcej pośladków, niżej = więcej czworogłowych', 'Kolana zgodnie ze stopami', 'Powolny ekscentryk'],
  },
  'bulgarian': {
    setup: 'Tylna noga oparta o ławkę, przednia ~70cm przed ławką. Tułów lekko pochylony do przodu.',
    cues: ['Ciężar na przedniej nodze (~80%)', 'Przednia pięta mocno na podłodze', 'Schodź aż tylne kolano blisko podłogi', 'Bez rotacji bioder'],
  },
  'leg-ext': {
    setup: 'Plecy przy oparciu, podkładka tuż nad kostkami. Uchwyty trzymane mocno.',
    cues: ['Pełen wyprost — spin czworogłowych na górze', 'Powolny ekscentryk', 'Bez kompensacji bioder', '1-2 sekundowa pauza w skurczu'],
  },
  'lying-curl': {
    setup: 'Leżąc twarzą w dół, podkładka nad piętami (nie na łydkach).',
    cues: ['Pięty do pośladków — pełen zakres', 'Bez odrywania bioder od poduszki', 'Powolny ekscentryk', 'Spin dwugłowych na górze'],
  },
  'seated-curl': {
    setup: 'Plecy oparte, podkładka nad piętami. Pas biodrowy zapięty jeśli jest.',
    cues: ['Pełen zakres — pięty pod ławkę', 'Bez odrywania ud', 'Powolny ekscentryk (2-3s)', 'Lekkie zgięcie palców stóp w trakcie zwiększa aktywację'],
  },
  'hip-thrust': {
    setup: 'Plecy oparte o ławkę pod łopatkami, sztanga na biodrach (z padem). Stopy szerokość barków, golenie pionowe na górze.',
    cues: ['Wypchnij biodra w górę aż tułów-uda-golenie tworzą linię', 'Spin pośladków 1-2s na górze', 'Broda lekko schowana — neutralna szyja', 'Pchaj przez pięty'],
  },
  'standing-calf': {
    setup: 'Palce na podstawce, pięty zwisają. Plecy proste, korpus napięty.',
    cues: ['Pełne rozciągnięcie na dole (2s)', 'Maksymalny wyprost na palcach', 'Powolne tempo — bez bujania', 'Pauza na górze i na dole'],
  },
  'seated-calf': {
    setup: 'Kolana pod poduszkami, palce na podstawce.',
    cues: ['Atakuje płaszczkowaty (soleus)', 'Pełen zakres — pełne rozciągnięcie i pełen wyprost', 'Powolne tempo', 'Wyższe powtórzenia (12-20)'],
  },
  // CORE
  'plank': {
    setup: 'Łokcie pod barkami, ciało w linii prostej od głowy do pięt. Brzuch napięty, pośladki ściśnięte.',
    cues: ['Bez opadania bioder', 'Bez wypinania pośladków w górę', 'Oddychaj normalnie', 'Krótszy plank z dobrą formą > długi z opadającymi biodrami'],
  },
  'leg-raise': {
    setup: 'Wis na drążku z aktywnym chwytem, łopatki lekko ściągnięte.',
    cues: ['Unoś nogi siłą brzucha, nie biodrami', 'Nogi proste = trudniej, ugięte = łatwiej', 'Bez bujania', 'Powolny ekscentryk'],
  },
  'cable-crunch': {
    setup: 'Klęcz przed wyciągiem górnym, linka za głową, łokcie blisko twarzy.',
    cues: ['Zwijaj się — broda do bioder', 'Ruch tylko z brzucha, nie biodra', 'Pauza w skurczu', 'Powolny powrót'],
  },
  'ab-wheel': {
    setup: 'Klęcz, rolka pod barkami, brzuch napięty.',
    cues: ['Wytocz tak daleko jak utrzymasz proste plecy', 'Bez wyginania lędźwi w dół', 'Wracaj siłą brzucha', 'Zaczynaj od krótkich powtórzeń'],
  },
};

// YouTube search URL helper
const ytUrl = (name) => `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' technika wykonania')}`;

// Plate calculator (kg, standard plates)
const PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];
function calcPlates(targetWeight, barWeight = 20) {
  const perSide = (targetWeight - barWeight) / 2;
  if (perSide <= 0) return [];
  const result = [];
  let remaining = perSide;
  for (const p of PLATES) {
    while (remaining >= p - 0.001) {
      result.push(p);
      remaining -= p;
    }
  }
  return result;
}

// Warm-up calculator: returns array of {weight, reps}
function warmupSets(topWeight, isCompound) {
  if (topWeight < 30) return [];
  const sets = isCompound
    ? [{ pct: 0.4, reps: 8 }, { pct: 0.6, reps: 5 }, { pct: 0.8, reps: 3 }]
    : [{ pct: 0.5, reps: 8 }, { pct: 0.75, reps: 5 }];
  return sets.map(s => ({
    weight: Math.round((topWeight * s.pct) / 2.5) * 2.5,
    reps: s.reps,
  }));
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

  const PUSH = [
    { muscles: ['klatka'], type: 'compound', sets: 4 },
    { muscles: ['barki'], type: 'compound', sets: 3 },
    { muscles: ['klatka'], sets: 3 },
    { muscles: ['barki'], type: 'isolation', sets: 3 },
    { muscles: ['triceps'], sets: 3 },
    { muscles: ['triceps'], sets: 3 },
  ];
  const PULL = [
    { muscles: ['plecy'], type: 'compound', sets: 4 },
    { muscles: ['plecy'], type: 'compound', sets: 3 },
    { muscles: ['plecy'], sets: 3 },
    { muscles: ['barki'], type: 'isolation', sets: 3 },
    { muscles: ['biceps'], sets: 3 },
    { muscles: ['biceps'], sets: 3 },
  ];
  const LEGS = [
    { muscles: ['czworogłowe'], type: 'compound', sets: 4 },
    { muscles: ['dwugłowe uda'], type: 'compound', sets: 3 },
    { muscles: ['pośladki', 'czworogłowe'], sets: 3 },
    { muscles: ['czworogłowe'], type: 'isolation', sets: 3 },
    { muscles: ['dwugłowe uda'], type: 'isolation', sets: 3 },
    { muscles: ['łydki'], sets: 4 },
  ];
  const UPPER = [
    { muscles: ['klatka'], type: 'compound', sets: 4 },
    { muscles: ['plecy'], type: 'compound', sets: 4 },
    { muscles: ['barki'], type: 'compound', sets: 3 },
    { muscles: ['plecy'], sets: 3 },
    { muscles: ['biceps'], sets: 3 },
    { muscles: ['triceps'], sets: 3 },
  ];
  const LOWER = [
    { muscles: ['czworogłowe'], type: 'compound', sets: 4 },
    { muscles: ['dwugłowe uda'], type: 'compound', sets: 3 },
    { muscles: ['czworogłowe'], type: 'isolation', sets: 3 },
    { muscles: ['dwugłowe uda'], type: 'isolation', sets: 3 },
    { muscles: ['łydki'], sets: 4 },
    { muscles: ['core'], sets: 3 },
  ];
  const FBA = [
    { muscles: ['czworogłowe'], type: 'compound', sets: 4 },
    { muscles: ['klatka'], type: 'compound', sets: 4 },
    { muscles: ['plecy'], type: 'compound', sets: 4 },
    { muscles: ['barki'], type: 'isolation', sets: 3 },
    { muscles: ['biceps'], sets: 3 },
  ];
  const FBB = [
    { muscles: ['dwugłowe uda'], type: 'compound', sets: 4 },
    { muscles: ['barki'], type: 'compound', sets: 4 },
    { muscles: ['plecy'], type: 'compound', sets: 4 },
    { muscles: ['klatka'], sets: 3 },
    { muscles: ['triceps'], sets: 3 },
  ];

  const splits = {
    2: [['Trening A — Full Body', FBA], ['Trening B — Full Body', FBB]],
    3: [['Push', PUSH], ['Pull', PULL], ['Legs', LEGS]],
    4: [['Upper A', UPPER], ['Lower A', LOWER], ['Upper B', UPPER], ['Lower B', LOWER]],
    5: [['Push', PUSH], ['Pull', PULL], ['Legs', LEGS], ['Upper', UPPER], ['Lower', LOWER]],
    6: [['Push A', PUSH], ['Pull A', PULL], ['Legs A', LEGS], ['Push B', PUSH], ['Pull B', PULL], ['Legs B', LEGS]],
  };

  const layout = splits[days] || splits[3];
  return layout.map(([label, recipe]) => {
    const localSeen = new Set();
    return buildWorkout(label, recipe, eq, localSeen);
  });
}

// ============================================================
// PROGRESSIVE OVERLOAD ALGORITHM
// ============================================================
function getRecommendation(exercise, history) {
  const isBW = exercise.eq === 'bodyweight';
  const isCompound = exercise.t === 'compound';
  const increment = isCompound ? (exercise.eq === 'barbell' ? 2.5 : 2) : 1.25;
  const [minR, maxR] = exercise.rr;

  if (!history || history.length === 0) {
    const startWeight = isBW ? 0 : (isCompound ? (exercise.eq === 'barbell' ? 40 : 10) : (exercise.eq === 'barbell' ? 20 : 5));
    return {
      weight: startWeight,
      reps: minR + Math.floor((maxR - minR) / 2),
      note: 'Pierwszy raz — dobierz ciężar tak, by zostawić 2-3 RIR.',
    };
  }

  const last = history[history.length - 1];
  const valid = last.sets.filter(s => s.completed && s.reps > 0);
  if (valid.length === 0) {
    return {
      weight: last.sets[0]?.weight || 0,
      reps: minR,
      note: 'Powtórz ostatnie wartości.',
    };
  }

  const avgRIR = valid.reduce((a, s) => a + (s.rir ?? 2), 0) / valid.length;
  const topReps = Math.max(...valid.map(s => s.reps));
  const lastWeight = valid[0].weight;

  if (avgRIR >= 3) {
    return {
      weight: isBW ? lastWeight : lastWeight + increment * 2,
      reps: minR,
      note: 'Ostatnio za łatwo (RIR 3+). Skok ciężaru.',
    };
  }
  if (avgRIR >= 1.5) {
    if (topReps >= maxR) {
      return {
        weight: isBW ? lastWeight : lastWeight + increment,
        reps: minR,
        note: `Górny zakres osiągnięty. +${increment} kg, restart powtórzeń.`,
      };
    }
    return {
      weight: lastWeight,
      reps: Math.min(topReps + 1, maxR),
      note: 'Spróbuj dorzucić 1 powtórzenie.',
    };
  }
  if (avgRIR >= 0.5) {
    return {
      weight: lastWeight,
      reps: topReps,
      note: 'Konsoliduj — ten sam ciężar i powtórzenia.',
    };
  }
  return {
    weight: isBW ? lastWeight : Math.max(0, lastWeight - increment * 2),
    reps: minR,
    note: 'Zostawiłeś wszystko (RIR 0). Lekki deload.',
  };
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
    try {
      const v = localStorage.getItem(key);
      if (v) out[field] = JSON.parse(v);
    } catch (e) {}
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
// UI HELPERS
// ============================================================
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
* { -webkit-tap-highlight-color: transparent; }
body, html, #root { background: #0a0a0a; }
.font-display { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
.font-body { font-family: 'Sora', sans-serif; }
.font-mono { font-family: 'JetBrains Mono', monospace; }
input[type="number"] { -moz-appearance: textfield; }
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.scroll-hide::-webkit-scrollbar { display: none; }
.scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
@keyframes pulse-lime { 0%,100% { box-shadow: 0 0 0 0 rgba(212,255,0,0.4); } 50% { box-shadow: 0 0 0 8px rgba(212,255,0,0); } }
.pulse-lime { animation: pulse-lime 2s infinite; }
`;

const Btn = ({ children, onClick, variant = 'primary', className = '', ...rest }) => {
  const base = 'font-display uppercase tracking-wider text-base py-3 px-5 transition-all active:scale-[0.97] flex items-center justify-center gap-2';
  const styles = {
    primary: 'bg-[#d4ff00] text-black hover:bg-[#c0e800]',
    ghost: 'bg-transparent text-white border border-neutral-800 hover:border-neutral-600',
    dark: 'bg-neutral-900 text-white border border-neutral-800',
    danger: 'bg-transparent text-red-400 border border-red-900/60',
  };
  return <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`} {...rest}>{children}</button>;
};

// ============================================================
// ONBOARDING
// ============================================================
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ goal: null, experience: null, days: null, equipment: null });

  const steps = [
    {
      key: 'goal', q: 'Jaki jest Twój cel?',
      opts: [
        { v: 'muscle', l: 'Budowa masy', d: 'Hipertrofia, średnie zakresy' },
        { v: 'strength', l: 'Siła', d: 'Niskie powtórzenia, większy ciężar' },
        { v: 'both', l: 'Siła + masa', d: 'Mieszane podejście' },
      ],
    },
    {
      key: 'experience', q: 'Twoje doświadczenie',
      opts: [
        { v: 'beginner', l: 'Początkujący', d: 'Mniej niż 6 miesięcy' },
        { v: 'intermediate', l: 'Średniozaawansowany', d: '6 mies. – 2 lata' },
        { v: 'advanced', l: 'Zaawansowany', d: 'Ponad 2 lata' },
      ],
    },
    {
      key: 'days', q: 'Ile dni w tygodniu trenujesz?',
      opts: [
        { v: 2, l: '2 dni', d: 'Full Body × 2' },
        { v: 3, l: '3 dni', d: 'Push / Pull / Legs' },
        { v: 4, l: '4 dni', d: 'Upper / Lower × 2' },
        { v: 5, l: '5 dni', d: 'PPL + Upper/Lower' },
        { v: 6, l: '6 dni', d: 'Push/Pull/Legs × 2' },
      ],
    },
    {
      key: 'equipment', q: 'Jaki masz sprzęt?',
      opts: [
        { v: 'full_gym', l: 'Pełna siłownia', d: 'Sztanga, hantle, wyciągi, maszyny' },
        { v: 'home_full', l: 'Dom: sztanga + hantle', d: 'Bez wyciągów i maszyn' },
        { v: 'dumbbell', l: 'Tylko hantle', d: 'Hantle + masa ciała' },
        { v: 'bodyweight', l: 'Masa ciała', d: 'Bez sprzętu' },
      ],
    },
  ];

  const cur = steps[step];

  const choose = (val) => {
    const next = { ...data, [cur.key]: val };
    setData(next);
    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 150);
    } else {
      onDone(next);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body flex flex-col">
      <div className="px-5 pt-12 pb-6">
        <div className="flex gap-1.5 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-[#d4ff00]' : 'bg-neutral-800'}`} />
          ))}
        </div>
        <div className="text-neutral-500 text-xs uppercase tracking-widest mb-2">Krok {step + 1} z {steps.length}</div>
        <h1 className="font-display text-4xl uppercase leading-tight">{cur.q}</h1>
      </div>
      <div className="flex-1 px-5 pb-8 space-y-3">
        {cur.opts.map(opt => (
          <button
            key={opt.v}
            onClick={() => choose(opt.v)}
            className={`w-full text-left p-5 border transition-all active:scale-[0.99] ${
              data[cur.key] === opt.v ? 'border-[#d4ff00] bg-[#d4ff00]/5' : 'border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="font-display text-2xl uppercase">{opt.l}</div>
            <div className="text-sm text-neutral-500 mt-1">{opt.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// HOME
// ============================================================
function HomeView({ profile, plan, history, onStart, onPickWorkout }) {
  const totalSessions = Object.values(history).reduce((a, h) => a + (h?.length || 0), 0);
  const lastDate = useMemo(() => {
    let max = 0;
    for (const sessions of Object.values(history)) {
      for (const s of sessions || []) {
        if (s.date > max) max = s.date;
      }
    }
    return max;
  }, [history]);

  // Suggest next workout: cycle through plan based on last completed
  const todayIdx = useMemo(() => {
    if (!plan || plan.length === 0) return 0;
    const sessions = Object.values(history).flat().sort((a, b) => b.date - a.date);
    if (sessions.length === 0) return 0;
    const lastName = sessions[0]?.workoutName;
    const idx = plan.findIndex(w => w.name === lastName);
    return idx === -1 ? 0 : (idx + 1) % plan.length;
  }, [plan, history]);

  const next = plan?.[todayIdx];
  const daysSince = lastDate ? Math.floor((Date.now() - lastDate) / 86400000) : null;

  return (
    <div className="px-5 pt-10 pb-24">
      <div className="flex items-baseline justify-between mb-1">
        <h1 className="font-display text-5xl uppercase">PROGRES</h1>
        <span className="font-mono text-xs text-neutral-600">v1.0</span>
      </div>
      <p className="text-neutral-500 text-sm uppercase tracking-widest mb-8">Trener siłowy</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="border border-neutral-800 p-4">
          <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Sesje</div>
          <div className="font-mono text-3xl text-[#d4ff00]">{totalSessions}</div>
        </div>
        <div className="border border-neutral-800 p-4">
          <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Ostatnio</div>
          <div className="font-mono text-3xl text-white">
            {daysSince === null ? '—' : daysSince === 0 ? 'dziś' : `${daysSince}d`}
          </div>
        </div>
      </div>

      {next && (
        <div className="border-2 border-[#d4ff00] p-5 mb-6 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-xs font-mono text-[#d4ff00] uppercase">Dziś</div>
          <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Następny trening</div>
          <h2 className="font-display text-3xl uppercase mb-1">{next.name}</h2>
          <div className="text-sm text-neutral-400 mb-5">{next.exercises.length} ćwiczeń · {next.exercises.reduce((a, e) => a + e.sets, 0)} serii</div>
          <Btn onClick={() => onStart(todayIdx)} className="w-full pulse-lime"><Play size={18} strokeWidth={3}/>Rozpocznij</Btn>
        </div>
      )}

      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Tygodniowy plan</div>
      <div className="space-y-2">
        {plan?.map((w, i) => (
          <button
            key={i}
            onClick={() => onPickWorkout(i)}
            className={`w-full text-left p-4 border ${i === todayIdx ? 'border-[#d4ff00]/40 bg-[#d4ff00]/5' : 'border-neutral-800'} flex items-center justify-between active:scale-[0.99] transition`}
          >
            <div>
              <div className="font-mono text-xs text-neutral-500 mb-0.5">DZIEŃ {i + 1}</div>
              <div className="font-display text-xl uppercase">{w.name}</div>
              <div className="text-xs text-neutral-500 mt-1">{w.exercises.length} ćwiczeń</div>
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
function ExerciseDetail({ exercise, history, onClose, onSwap, swapMode }) {
  const desc = DESC[exercise.id];
  const exHistory = history?.[exercise.id] || [];
  const allSets = exHistory.flatMap(s => s.sets.filter(st => st.completed));
  const pr = allSets.reduce((a, s) => Math.max(a, s.weight || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="bg-[#0a0a0a] border-t-2 sm:border-2 border-[#d4ff00] w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-neutral-900 px-5 py-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#d4ff00] mb-1">
              <span>{exercise.m}</span>
              <span className="text-neutral-700">·</span>
              <span className="text-neutral-500">{eqLabel(exercise.eq)}</span>
              <span className="text-neutral-700">·</span>
              <span className="text-neutral-500">{exercise.t === 'compound' ? 'Wielost.' : 'Izol.'}</span>
            </div>
            <h2 className="font-display text-2xl uppercase leading-tight">{exercise.name}</h2>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-white">
            <X size={20}/>
          </button>
        </div>

        <div className="p-5 space-y-5">
          {pr > 0 && (
            <div className="border border-neutral-800 p-3 flex items-center gap-3">
              <Award className="text-[#d4ff00]" size={20}/>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500">Twój rekord</div>
                <div className="font-mono text-lg text-white">{pr} kg</div>
              </div>
            </div>
          )}

          {desc ? (
            <>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#d4ff00] mb-2">Pozycja wyjściowa</div>
                <p className="text-sm text-neutral-300 leading-relaxed">{desc.setup}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#d4ff00] mb-2">Wskazówki techniczne</div>
                <ul className="space-y-1.5">
                  {desc.cues.map((c, i) => (
                    <li key={i} className="text-sm text-neutral-300 flex gap-2 leading-relaxed">
                      <span className="text-[#d4ff00] mt-0.5 shrink-0">▸</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {desc.mistake && (
                <div className="border border-red-900/40 bg-red-950/20 p-3">
                  <div className="text-xs uppercase tracking-widest text-red-400 mb-1">Częste błędy</div>
                  <p className="text-sm text-neutral-300 leading-relaxed">{desc.mistake}</p>
                </div>
              )}
            </>
          ) : (
            <div className="border border-dashed border-neutral-800 p-4 text-sm text-neutral-500">
              Szczegółowy opis dla tego ćwiczenia nie jest jeszcze dostępny. Sprawdź demonstrację na YouTube.
            </div>
          )}

          <div className="border border-neutral-800 p-3">
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Zakres roboczy</div>
            <div className="font-mono text-base text-white">{exercise.rr[0]}–{exercise.rr[1]} {exercise.unit || 'powtórzeń'}</div>
          </div>

          <a
            href={ytUrl(exercise.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-neutral-900 border border-neutral-800 hover:border-red-500/60 transition-colors p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-red-600 rounded-sm flex items-center justify-center">
                <Play size={14} fill="white" stroke="white"/>
              </div>
              <div>
                <div className="font-display text-base uppercase">Zobacz na YouTube</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Demonstracja techniki</div>
              </div>
            </div>
            <ExternalLink size={16} className="text-neutral-500"/>
          </a>

          {onSwap && (
            <Btn variant="ghost" onClick={onSwap} className="w-full">
              <Repeat size={16}/>{swapMode ? 'Wymień to ćwiczenie' : 'Pokaż alternatywy'}
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SWAP EXERCISE MODAL
// ============================================================
function SwapModal({ currentExercise, profile, onSelect, onClose }) {
  const eq = EQUIPMENT_AVAILABILITY[profile.equipment];
  const alternatives = EX.filter(e =>
    e.m === currentExercise.m &&
    e.id !== currentExercise.id &&
    eq.includes(e.eq)
  );

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-[#0a0a0a] border-t-2 sm:border-2 border-[#d4ff00] w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-neutral-900 px-5 py-4 flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#d4ff00] mb-1">Wymień ćwiczenie</div>
            <h2 className="font-display text-xl uppercase">{currentExercise.m}</h2>
            <div className="text-xs text-neutral-500 mt-1">{alternatives.length} alternatyw</div>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white"><X size={20}/></button>
        </div>
        <div className="p-3 space-y-2">
          {alternatives.map(e => (
            <button
              key={e.id}
              onClick={() => onSelect(e)}
              className="w-full text-left p-3 border border-neutral-800 hover:border-[#d4ff00] active:scale-[0.99] transition-all"
            >
              <div className="text-sm text-white">{e.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-neutral-500 uppercase">{eqLabel(e.eq)}</span>
                <span className="text-[10px] text-neutral-700">·</span>
                <span className="text-[10px] text-neutral-500 uppercase">{e.t === 'compound' ? 'Wielost.' : 'Izol.'}</span>
                <span className="text-[10px] text-neutral-700">·</span>
                <span className="text-[10px] font-mono text-neutral-500">{e.rr[0]}–{e.rr[1]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// REST TIMER
// ============================================================
function RestTimer({ secondsLeft, totalSeconds, onSkip, onAdjust }) {
  const pct = (secondsLeft / totalSeconds) * 100;
  const min = Math.floor(secondsLeft / 60);
  const sec = secondsLeft % 60;

  return (
    <div className="fixed left-0 right-0 bottom-[140px] z-30 px-5">
      <div className="max-w-lg mx-auto bg-[#d4ff00] text-black p-3 flex items-center gap-3 shadow-2xl">
        <Timer size={20} strokeWidth={2.5}/>
        <div className="flex-1">
          <div className="font-mono text-2xl font-bold leading-none">
            {min}:{sec.toString().padStart(2, '0')}
          </div>
          <div className="h-1 bg-black/20 mt-1 overflow-hidden">
            <div className="h-full bg-black transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button onClick={() => onAdjust(-15)} className="w-9 h-9 flex items-center justify-center bg-black/10 font-mono text-xs font-bold">-15s</button>
        <button onClick={() => onAdjust(15)} className="w-9 h-9 flex items-center justify-center bg-black/10 font-mono text-xs font-bold">+15s</button>
        <button onClick={onSkip} className="w-9 h-9 flex items-center justify-center bg-black text-[#d4ff00]"><X size={18}/></button>
      </div>
    </div>
  );
}


function WorkoutView({ workout, history, onFinish, onCancel, active, setActive, profile, onSwapExercise }) {
  const [currentEx, setCurrentEx] = useState(active?.currentEx ?? 0);
  const [showDetail, setShowDetail] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showPlates, setShowPlates] = useState(false);
  const [restSecs, setRestSecs] = useState(0);
  const [restTotal, setRestTotal] = useState(0);

  useEffect(() => { setCurrentEx(active?.currentEx ?? 0); }, [active?.workoutName]);

  // Rest timer countdown
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

  const ex = workout.exercises[currentEx];
  const exHistory = history[ex.id] || [];
  const recommendation = getRecommendation(ex, exHistory);
  const allTimeBest = exHistory.flatMap(s => s.sets.filter(st => st.completed)).reduce((a, s) => Math.max(a, s.weight || 0), 0);
  const setData = active.exercises[currentEx];
  const warmups = ex.eq !== 'bodyweight' && ex.eq !== 'machine' ? warmupSets(recommendation.weight, ex.t === 'compound') : [];
  const plates = ex.eq === 'barbell' ? calcPlates(recommendation.weight) : [];

  const updateSet = (setIdx, patch) => {
    const wasCompleted = active.exercises[currentEx].sets[setIdx].completed;
    const newActive = { ...active };
    newActive.exercises = active.exercises.map((e, i) => {
      if (i !== currentEx) return e;
      return { ...e, sets: e.sets.map((s, j) => j === setIdx ? { ...s, ...patch } : s) };
    });
    newActive.currentEx = currentEx;
    setActive(newActive);

    if (patch.completed === true && !wasCompleted) {
      const rest = ex.t === 'compound' ? 180 : 90;
      setRestTotal(rest);
      setRestSecs(rest);
    }
  };

  const updateNotes = (notes) => {
    setActive({ ...active, notes });
  };

  const swapCurrentExercise = (newEx) => {
    const newActive = { ...active };
    const sameNumberOfSets = newActive.exercises[currentEx].sets.length;
    newActive.exercises = newActive.exercises.map((e, i) => {
      if (i !== currentEx) return e;
      return {
        exerciseId: newEx.id,
        sets: Array.from({ length: sameNumberOfSets }, () => ({ weight: null, reps: null, rir: null, completed: false })),
      };
    });
    setActive(newActive);
    onSwapExercise(currentEx, newEx);
    setShowSwap(false);
    setShowDetail(false);
  };

  const totalCompleted = active.exercises.reduce((a, e) => a + e.sets.filter(s => s.completed).length, 0);
  const totalSets = active.exercises.reduce((a, e) => a + e.sets.length, 0);
  const isLast = currentEx === workout.exercises.length - 1;

  const goNext = () => {
    if (isLast) onFinish();
    else { setCurrentEx(currentEx + 1); setActive({ ...active, currentEx: currentEx + 1 }); setRestSecs(0); }
  };
  const goPrev = () => {
    if (currentEx === 0) return;
    setCurrentEx(currentEx - 1); setActive({ ...active, currentEx: currentEx - 1 }); setRestSecs(0);
  };

  const elapsed = Math.floor((Date.now() - active.date) / 60000);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body pb-32">
      <div className="px-5 pt-6 pb-4 sticky top-0 bg-[#0a0a0a] z-10 border-b border-neutral-900">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onCancel} className="text-neutral-500 text-sm uppercase tracking-wider flex items-center gap-1"><X size={16}/>Anuluj</button>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-500"><Timer size={11} className="inline mr-1"/>{elapsed}min</span>
            <span className="font-mono text-xs text-neutral-500">{totalCompleted}/{totalSets} serii</span>
          </div>
        </div>
        <div className="h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div className="h-full bg-[#d4ff00] transition-all" style={{ width: `${(totalCompleted / totalSets) * 100}%` }} />
        </div>
      </div>

      <div className="flex gap-2 px-5 pt-4 pb-2 overflow-x-auto scroll-hide">
        {workout.exercises.map((e, i) => {
          const done = active.exercises[i].sets.every(s => s.completed);
          const isCurrent = i === currentEx;
          return (
            <button
              key={i}
              onClick={() => { setCurrentEx(i); setActive({ ...active, currentEx: i }); setRestSecs(0); }}
              className={`shrink-0 w-9 h-9 flex items-center justify-center font-mono text-sm border ${
                isCurrent ? 'border-[#d4ff00] text-[#d4ff00] bg-[#d4ff00]/10' :
                done ? 'border-neutral-700 text-neutral-400 bg-neutral-900' :
                'border-neutral-800 text-neutral-600'
              }`}
            >
              {done ? <Check size={14} strokeWidth={3}/> : i + 1}
            </button>
          );
        })}
      </div>

      <div className="px-5 pt-4">
        <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-widest mb-1">
          <span>Ćwiczenie {currentEx + 1} z {workout.exercises.length} · {ex.m}</span>
        </div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="font-display text-3xl uppercase leading-tight flex-1">{ex.name}</h2>
          <div className="flex gap-1 shrink-0 mt-1">
            <button onClick={() => setShowDetail(true)} className="w-9 h-9 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:border-[#d4ff00]/60"><Info size={16}/></button>
            <button onClick={() => setShowSwap(true)} className="w-9 h-9 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:border-[#d4ff00]/60"><Repeat size={16}/></button>
          </div>
        </div>

        <div className="border border-neutral-800 bg-neutral-950 p-4 mb-2">
          <div className="flex items-center gap-2 text-xs text-[#d4ff00] uppercase tracking-widest mb-2">
            <Target size={12}/>Rekomendacja na dziś
          </div>
          <div className="flex items-baseline gap-3 font-mono mb-2">
            <span className="text-3xl text-white">{recommendation.weight}</span>
            <span className="text-sm text-neutral-500">{ex.eq === 'bodyweight' ? 'm.c.' : 'kg'}</span>
            <span className="text-3xl text-white">×</span>
            <span className="text-3xl text-white">{recommendation.reps}</span>
            <span className="text-sm text-neutral-500">{ex.unit || 'powt.'}</span>
          </div>
          <div className="text-xs text-neutral-400">{recommendation.note}</div>

          {warmups.length > 0 && (
            <div className="mt-3 pt-3 border-t border-neutral-900">
              <div className="flex items-center gap-1.5 text-[10px] text-orange-400 uppercase tracking-widest mb-1.5">
                <Flame size={10}/>Rozgrzewka
              </div>
              <div className="font-mono text-xs text-neutral-400">
                {warmups.map((w, i) => `${w.weight}×${w.reps}`).join('  →  ')}
              </div>
            </div>
          )}

          {plates.length > 0 && (
            <button onClick={() => setShowPlates(!showPlates)} className="mt-3 pt-3 border-t border-neutral-900 w-full text-left">
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Talerze (sztanga 20kg)</div>
                <ChevronRight size={12} className={`text-neutral-600 transition-transform ${showPlates ? 'rotate-90' : ''}`}/>
              </div>
              {showPlates && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-neutral-500 mr-1 self-center">na stronę:</span>
                  {plates.map((p, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-mono bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00]">{p}</span>
                  ))}
                </div>
              )}
            </button>
          )}
        </div>

        {exHistory.length > 0 && (
          <div className="border border-neutral-800/50 px-4 py-2 mb-4 text-xs text-neutral-500 font-mono flex items-center justify-between">
            <span>Ostatnio: {exHistory[exHistory.length - 1].sets.filter(s => s.completed).map(s => `${s.weight}×${s.reps}`).join(' · ') || '—'}</span>
            {allTimeBest > 0 && <span className="text-[#d4ff00]">PR: {allTimeBest}kg</span>}
          </div>
        )}

        <div className="space-y-2 mt-5">
          <div className="grid grid-cols-12 gap-2 px-1 text-[10px] text-neutral-600 uppercase tracking-widest mb-1">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Ciężar</div>
            <div className="col-span-2">Powt.</div>
            <div className="col-span-4">RIR</div>
            <div className="col-span-2 text-right">OK</div>
          </div>
          {setData.sets.map((s, i) => (
            <SetRow key={i} idx={i} set={s} ex={ex} recommended={recommendation} allTimeBest={allTimeBest} onUpdate={(patch) => updateSet(i, patch)} />
          ))}
        </div>

        <div className="mt-5">
          <button onClick={() => setShowNotes(!showNotes)} className="w-full flex items-center justify-between p-3 border border-neutral-800 text-sm text-neutral-400">
            <span className="flex items-center gap-2"><FileText size={14}/>Notatki do treningu</span>
            <ChevronRight size={14} className={`transition-transform ${showNotes ? 'rotate-90' : ''}`}/>
          </button>
          {showNotes && (
            <textarea
              value={active.notes || ''}
              onChange={(e) => updateNotes(e.target.value)}
              placeholder="np. Lewe kolano dawało znać na 4. serii."
              className="w-full mt-2 p-3 bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:border-[#d4ff00] outline-none min-h-[80px] resize-none"
            />
          )}
        </div>
      </div>

      {restSecs > 0 && (
        <RestTimer secondsLeft={restSecs} totalSeconds={restTotal} onSkip={() => setRestSecs(0)} onAdjust={(d) => setRestSecs(s => Math.max(0, s + d))} />
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-neutral-900 px-5 py-4 flex gap-2 z-20">
        <Btn variant="ghost" onClick={goPrev} className="flex-1" disabled={currentEx === 0}>Wstecz</Btn>
        <Btn onClick={goNext} className="flex-1">
          {isLast ? <>Zakończ<Check size={16} strokeWidth={3}/></> : <>Dalej<ChevronRight size={16}/></>}
        </Btn>
      </div>

      {showDetail && (
        <ExerciseDetail exercise={ex} history={history} onClose={() => setShowDetail(false)} onSwap={() => { setShowDetail(false); setShowSwap(true); }} swapMode={true} />
      )}
      {showSwap && (
        <SwapModal currentExercise={ex} profile={profile} onSelect={swapCurrentExercise} onClose={() => setShowSwap(false)} />
      )}
    </div>
  );
}

function SetRow({ idx, set, ex, recommended, allTimeBest, onUpdate }) {
  const isBW = ex.eq === 'bodyweight';
  const isPR = set.completed && set.weight && set.weight > allTimeBest && allTimeBest > 0;
  return (
    <div className={`grid grid-cols-12 gap-2 items-center p-2 border ${set.completed ? 'border-[#d4ff00]/40 bg-[#d4ff00]/5' : 'border-neutral-800'} relative`}>
      {isPR && (
        <div className="absolute -top-2 left-2 px-1.5 py-0.5 bg-[#d4ff00] text-black text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-1">
          <Sparkles size={9} strokeWidth={3}/>PR
        </div>
      )}
      <div className="col-span-1 font-mono text-sm text-neutral-500">{idx + 1}</div>
      <div className="col-span-3">
        <input type="number" inputMode="decimal" value={set.weight ?? ''} placeholder={String(recommended.weight)} onChange={(e) => onUpdate({ weight: e.target.value === '' ? null : Number(e.target.value) })} className="w-full bg-transparent border-b border-neutral-800 focus:border-[#d4ff00] outline-none font-mono text-base px-1 py-1.5 text-white" disabled={isBW} />
      </div>
      <div className="col-span-2">
        <input type="number" inputMode="numeric" value={set.reps ?? ''} placeholder={String(recommended.reps)} onChange={(e) => onUpdate({ reps: e.target.value === '' ? null : Number(e.target.value) })} className="w-full bg-transparent border-b border-neutral-800 focus:border-[#d4ff00] outline-none font-mono text-base px-1 py-1.5 text-white" />
      </div>
      <div className="col-span-4 flex gap-1">
        {[0, 1, 2, 3].map(r => (
          <button key={r} onClick={() => onUpdate({ rir: r })} className={`flex-1 py-1.5 text-xs font-mono border ${set.rir === r ? 'border-[#d4ff00] bg-[#d4ff00] text-black' : 'border-neutral-800 text-neutral-500'}`}>
            {r === 3 ? '3+' : r}
          </button>
        ))}
      </div>
      <div className="col-span-2 flex justify-end">
        <button onClick={() => onUpdate({ completed: !set.completed, weight: set.weight ?? recommended.weight, reps: set.reps ?? recommended.reps, rir: set.rir ?? 2 })} className={`w-9 h-9 flex items-center justify-center border ${set.completed ? 'bg-[#d4ff00] border-[#d4ff00] text-black' : 'border-neutral-700 text-neutral-600'}`}>
          <Check size={16} strokeWidth={3}/>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// HISTORY VIEW
// ============================================================
function HistoryView({ history }) {
  const allSessions = useMemo(() => {
    const arr = [];
    for (const sessions of Object.values(history)) {
      for (const s of sessions || []) arr.push(s);
    }
    // dedupe by sessionId
    const seen = new Set();
    return arr.filter(s => {
      if (seen.has(s.sessionId)) return false;
      seen.add(s.sessionId);
      return true;
    }).sort((a, b) => b.date - a.date);
  }, [history]);

  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-4xl uppercase mb-1">Historia</h1>
      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-8">{allSessions.length} ukończonych sesji</p>
      {allSessions.length === 0 ? (
        <div className="border border-dashed border-neutral-800 p-8 text-center text-neutral-500">
          Brak sesji. Rozpocznij pierwszy trening, żeby zobaczyć tu postępy.
        </div>
      ) : (
        <div className="space-y-3">
          {allSessions.map(s => (
            <div key={s.sessionId} className="border border-neutral-800 p-4">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display text-xl uppercase">{s.workoutName}</h3>
                <span className="text-xs font-mono text-neutral-500">
                  {new Date(s.date).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short' })}
                </span>
              </div>
              <div className="space-y-1">
                {s.exercises.map((e, i) => {
                  const ex = EX.find(x => x.id === e.exerciseId);
                  const completed = e.sets.filter(st => st.completed);
                  if (completed.length === 0) return null;
                  return (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-300 truncate pr-2">{ex?.name || e.exerciseId}</span>
                      <span className="font-mono text-xs text-neutral-500 shrink-0">
                        {completed.map(st => `${st.weight}×${st.reps}`).join(' · ')}
                      </span>
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

// ============================================================
// PROGRESS VIEW (per-exercise charts)
// ============================================================
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
        <div className="border border-dashed border-neutral-800 p-8 text-center text-neutral-500">
          Trenuj, by zobaczyć tu wykresy progresji.
        </div>
      ) : (
        <div className="space-y-4">
          {exerciseList.map(({ id, sessions, exercise }) => {
            const allSets = sessions.flatMap(s => s.sets.filter(st => st.completed));
            if (allSets.length === 0) return null;
            const maxWeight = Math.max(...allSets.map(s => s.weight || 0));
            const e1rm = Math.max(...allSets.map(s => Math.round((s.weight || 0) * (1 + (s.reps || 0) / 30))));
            const lastSession = sessions[sessions.length - 1];
            const topSetLast = lastSession.sets.filter(s => s.completed).reduce((a, s) => (s.weight > (a?.weight || 0) ? s : a), null);

            return (
              <div key={id} className="border border-neutral-800 p-4">
                <h3 className="font-display text-lg uppercase mb-3">{exercise.name}</h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <div className="text-[10px] text-neutral-600 uppercase tracking-widest">Rekord</div>
                    <div className="font-mono text-lg text-[#d4ff00]">{maxWeight}<span className="text-xs text-neutral-500"> kg</span></div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-600 uppercase tracking-widest">e1RM</div>
                    <div className="font-mono text-lg text-white">{e1rm}<span className="text-xs text-neutral-500"> kg</span></div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-600 uppercase tracking-widest">Ostatnio</div>
                    <div className="font-mono text-lg text-white">{topSetLast ? `${topSetLast.weight}×${topSetLast.reps}` : '—'}</div>
                  </div>
                </div>
                <MiniChart sessions={sessions} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MiniChart({ sessions }) {
  // Plot top set weight per session
  const data = sessions.map(s => {
    const top = s.sets.filter(st => st.completed).reduce((a, st) => (st.weight > (a?.weight || 0) ? st : a), null);
    return top?.weight || 0;
  });
  if (data.length < 2) return <div className="text-xs text-neutral-600 italic">Mało danych — kontynuuj treningi</div>;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  return (
    <div className="flex items-end gap-1 h-16">
      {data.slice(-12).map((v, i) => (
        <div key={i} className="flex-1 bg-[#d4ff00]/30 hover:bg-[#d4ff00] transition-colors" style={{ height: `${((v - min) / range) * 80 + 20}%` }} />
      ))}
    </div>
  );
}

// ============================================================
// LIBRARY VIEW
// ============================================================
function LibraryView({ history }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const muscles = ['all', ...Array.from(new Set(EX.map(e => e.m)))];
  let filtered = filter === 'all' ? EX : EX.filter(e => e.m === filter);
  if (search.trim()) {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(e => e.name.toLowerCase().includes(s));
  }

  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-4xl uppercase mb-1">Biblioteka</h1>
      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">{EX.length} ćwiczeń</p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Szukaj ćwiczenia..."
        className="w-full p-3 bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:border-[#d4ff00] outline-none mb-3"
      />

      <div className="flex gap-2 overflow-x-auto scroll-hide -mx-5 px-5 pb-3 mb-3">
        {muscles.map(m => (
          <button
            key={m}
            onClick={() => setFilter(m)}
            className={`shrink-0 px-3 py-1.5 text-xs uppercase tracking-wider border ${filter === m ? 'border-[#d4ff00] bg-[#d4ff00] text-black' : 'border-neutral-800 text-neutral-400'}`}
          >
            {m === 'all' ? 'Wszystkie' : m}
          </button>
        ))}
      </div>

      <div className="text-xs text-neutral-600 mb-2 font-mono">{filtered.length} wyników</div>

      <div className="space-y-2">
        {filtered.map(e => {
          const hasDesc = !!DESC[e.id];
          return (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className="w-full text-left border border-neutral-800 p-3 hover:border-[#d4ff00]/40 active:scale-[0.99] transition-all"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-body text-sm text-white truncate flex-1">{e.name}</h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  {hasDesc && <span className="text-[9px] font-mono text-[#d4ff00] uppercase">opis</span>}
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">{e.t === 'compound' ? 'Wielost.' : 'Izol.'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[#d4ff00] uppercase tracking-widest">{e.m}</span>
                <span className="text-[10px] text-neutral-600">·</span>
                <span className="text-[10px] text-neutral-500">{eqLabel(e.eq)}</span>
                <span className="text-[10px] text-neutral-600">·</span>
                <span className="text-[10px] font-mono text-neutral-500">{e.rr[0]}–{e.rr[1]} {e.unit || 'powt'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <ExerciseDetail
          exercise={selected}
          history={history}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

// ============================================================
// PLAN EDITOR
// ============================================================
function eqLabel(eq) {
  return { barbell: 'Sztanga', dumbbell: 'Hantle', cable: 'Wyciąg', machine: 'Maszyna', bodyweight: 'Masa ciała' }[eq] || eq;
}

function PlanEditor({ plan, profile, onSave, onCancel }) {
  const [workouts, setWorkouts] = useState(JSON.parse(JSON.stringify(plan)));
  const [addingTo, setAddingTo] = useState(null);

  const renameWorkout = (idx) => {
    const newName = window.prompt('Nazwa treningu:', workouts[idx].name);
    if (newName?.trim()) {
      setWorkouts(workouts.map((w, i) => i === idx ? { ...w, name: newName.trim() } : w));
    }
  };

  const deleteWorkout = (idx) => {
    if (!window.confirm(`Usunąć trening "${workouts[idx].name}"?`)) return;
    setWorkouts(workouts.filter((_, i) => i !== idx));
  };

  const addWorkout = () => {
    const name = window.prompt('Nazwa nowego treningu:', `Trening ${workouts.length + 1}`);
    if (name?.trim()) {
      setWorkouts([...workouts, { name: name.trim(), exercises: [] }]);
    }
  };

  const moveWorkout = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= workouts.length) return;
    const next = [...workouts];
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    setWorkouts(next);
  };

  const updateExercise = (wIdx, eIdx, patch) => {
    setWorkouts(workouts.map((w, i) => {
      if (i !== wIdx) return w;
      return { ...w, exercises: w.exercises.map((e, j) => j === eIdx ? { ...e, ...patch } : e) };
    }));
  };

  const removeExercise = (wIdx, eIdx) => {
    setWorkouts(workouts.map((w, i) => {
      if (i !== wIdx) return w;
      return { ...w, exercises: w.exercises.filter((_, j) => j !== eIdx) };
    }));
  };

  const moveExercise = (wIdx, eIdx, dir) => {
    const newIdx = eIdx + dir;
    const w = workouts[wIdx];
    if (newIdx < 0 || newIdx >= w.exercises.length) return;
    const exs = [...w.exercises];
    [exs[eIdx], exs[newIdx]] = [exs[newIdx], exs[eIdx]];
    setWorkouts(workouts.map((wo, i) => i === wIdx ? { ...wo, exercises: exs } : wo));
  };

  const addExerciseToWorkout = (wIdx, exercise) => {
    setWorkouts(workouts.map((w, i) => {
      if (i !== wIdx) return w;
      return { ...w, exercises: [...w.exercises, { ...exercise, sets: 3 }] };
    }));
    setAddingTo(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body pb-24">
      <div className="px-5 pt-6 pb-4 sticky top-0 bg-[#0a0a0a] z-20 border-b border-neutral-900">
        <div className="flex items-center justify-between">
          <button onClick={onCancel} className="text-neutral-500 text-sm uppercase tracking-wider flex items-center gap-1">
            <X size={16}/>Anuluj
          </button>
          <button onClick={() => onSave(workouts)} className="bg-[#d4ff00] text-black px-4 py-2 text-sm uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Check size={16} strokeWidth={3}/>Zapisz
          </button>
        </div>
      </div>

      <div className="px-5 pt-4">
        <h1 className="font-display text-3xl uppercase mb-1">Edytor planu</h1>
        <p className="text-neutral-500 text-xs uppercase tracking-widest mb-6">Dostosuj swoje treningi</p>

        <div className="space-y-4">
          {workouts.map((w, wIdx) => (
            <div key={wIdx} className="border border-neutral-800">
              <div className="flex items-center gap-2 p-3 border-b border-neutral-900 bg-neutral-950">
                <div className="flex flex-col gap-0.5">
                  <button onClick={() => moveWorkout(wIdx, -1)} disabled={wIdx === 0} className="w-6 h-5 flex items-center justify-center text-neutral-600 disabled:opacity-30">▲</button>
                  <button onClick={() => moveWorkout(wIdx, 1)} disabled={wIdx === workouts.length - 1} className="w-6 h-5 flex items-center justify-center text-neutral-600 disabled:opacity-30">▼</button>
                </div>
                <button onClick={() => renameWorkout(wIdx)} className="flex-1 text-left">
                  <div className="font-mono text-[10px] text-neutral-500 uppercase">DZIEŃ {wIdx + 1}</div>
                  <div className="font-display text-lg uppercase">{w.name}</div>
                  <div className="text-[10px] text-neutral-600 uppercase tracking-widest">{w.exercises.length} ćwiczeń · tap aby zmienić nazwę</div>
                </button>
                <button onClick={() => deleteWorkout(wIdx)} className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:text-red-400">
                  <Trash2 size={16}/>
                </button>
              </div>

              <div className="divide-y divide-neutral-900">
                {w.exercises.map((e, eIdx) => (
                  <div key={eIdx} className="flex items-center gap-2 p-2">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => moveExercise(wIdx, eIdx, -1)} disabled={eIdx === 0} className="w-5 h-4 flex items-center justify-center text-neutral-600 text-[10px] disabled:opacity-30">▲</button>
                      <button onClick={() => moveExercise(wIdx, eIdx, 1)} disabled={eIdx === w.exercises.length - 1} className="w-5 h-4 flex items-center justify-center text-neutral-600 text-[10px] disabled:opacity-30">▼</button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{e.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] text-[#d4ff00] uppercase tracking-widest">{e.m}</span>
                        <span className="text-[9px] text-neutral-600">·</span>
                        <span className="text-[9px] text-neutral-500">{eqLabel(e.eq)}</span>
                      </div>
                    </div>
                    <div className="flex items-center border border-neutral-800 shrink-0">
                      <button onClick={() => updateExercise(wIdx, eIdx, { sets: Math.max(1, e.sets - 1) })} className="w-7 h-7 flex items-center justify-center text-neutral-500"><Minus size={12}/></button>
                      <span className="font-mono text-xs text-white w-7 text-center">{e.sets}</span>
                      <button onClick={() => updateExercise(wIdx, eIdx, { sets: Math.min(8, e.sets + 1) })} className="w-7 h-7 flex items-center justify-center text-neutral-500"><Plus size={12}/></button>
                    </div>
                    <button onClick={() => removeExercise(wIdx, eIdx)} className="w-7 h-7 flex items-center justify-center text-neutral-500 shrink-0"><X size={14}/></button>
                  </div>
                ))}
                {w.exercises.length === 0 && (
                  <div className="p-4 text-center text-xs text-neutral-600 italic">Brak ćwiczeń. Dodaj poniżej.</div>
                )}
              </div>

              <button onClick={() => setAddingTo(wIdx)} className="w-full p-3 text-sm text-[#d4ff00] uppercase tracking-wider flex items-center justify-center gap-2 border-t border-neutral-900 hover:bg-[#d4ff00]/5">
                <Plus size={14}/>Dodaj ćwiczenie
              </button>
            </div>
          ))}

          <button onClick={addWorkout} className="w-full p-4 border border-dashed border-neutral-700 text-sm text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-2 hover:border-[#d4ff00]">
            <Plus size={16}/>Dodaj nowy trening
          </button>
        </div>
      </div>

      {addingTo !== null && (
        <ExercisePicker
          profile={profile}
          onSelect={(ex) => addExerciseToWorkout(addingTo, ex)}
          onClose={() => setAddingTo(null)}
        />
      )}
    </div>
  );
}

function ExercisePicker({ profile, onSelect, onClose }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const eq = EQUIPMENT_AVAILABILITY[profile.equipment];
  const muscles = ['all', ...Array.from(new Set(EX.map(e => e.m)))];

  let filtered = EX.filter(e => eq.includes(e.eq));
  if (filter !== 'all') filtered = filtered.filter(e => e.m === filter);
  if (search.trim()) {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(e => e.name.toLowerCase().includes(s));
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-[#0a0a0a] border-t-2 sm:border-2 border-[#d4ff00] w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="bg-[#0a0a0a] border-b border-neutral-900 p-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl uppercase">Wybierz ćwiczenie</h2>
            <button onClick={onClose}><X size={20} className="text-neutral-500"/></button>
          </div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj..." className="w-full p-2 bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:border-[#d4ff00] outline-none mb-2"/>
          <div className="flex gap-1.5 overflow-x-auto scroll-hide">
            {muscles.map(m => (
              <button key={m} onClick={() => setFilter(m)} className={`shrink-0 px-2 py-1 text-[10px] uppercase tracking-wider border ${filter === m ? 'border-[#d4ff00] bg-[#d4ff00] text-black' : 'border-neutral-800 text-neutral-400'}`}>
                {m === 'all' ? 'Wszystkie' : m}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-y-auto p-2 space-y-1 flex-1">
          {filtered.map(e => (
            <button key={e.id} onClick={() => onSelect(e)} className="w-full text-left p-3 border border-neutral-800 hover:border-[#d4ff00] active:scale-[0.99] transition-all">
              <div className="text-sm text-white">{e.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[#d4ff00] uppercase">{e.m}</span>
                <span className="text-[10px] text-neutral-600">·</span>
                <span className="text-[10px] text-neutral-500">{eqLabel(e.eq)}</span>
                <span className="text-[10px] text-neutral-600">·</span>
                <span className="text-[10px] font-mono text-neutral-500">{e.rr[0]}–{e.rr[1]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


// ============================================================
// SETTINGS VIEW
// ============================================================
function SettingsView({ profile, onRegenerate, onReset, onEditPlan }) {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="px-5 pt-10 pb-24">
      <h1 className="font-display text-4xl uppercase mb-1">Ustawienia</h1>
      <p className="text-neutral-500 text-xs uppercase tracking-widest mb-8">Profil i dane</p>

      <div className="border border-neutral-800 p-4 mb-3">
        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Profil</div>
        <Row label="Cel" value={{ muscle: 'Budowa masy', strength: 'Siła', both: 'Siła + masa' }[profile.goal]} />
        <Row label="Doświadczenie" value={{ beginner: 'Początkujący', intermediate: 'Średnio', advanced: 'Zaawansowany' }[profile.experience]} />
        <Row label="Dni / tydzień" value={profile.days} />
        <Row label="Sprzęt" value={{ full_gym: 'Pełna siłownia', home_full: 'Sztanga + hantle', dumbbell: 'Hantle', bodyweight: 'Masa ciała' }[profile.equipment]} />
      </div>

      <Btn onClick={onEditPlan} className="w-full mb-3"><FileText size={16}/>Edytuj plan</Btn>
      <Btn variant="ghost" onClick={onRegenerate} className="w-full mb-3"><RotateCcw size={16}/>Wygeneruj nowy plan (auto)</Btn>

      {confirming ? (
        <div className="border border-red-900/60 p-4">
          <div className="text-sm text-red-300 mb-3">Skasować wszystkie dane (profil, plan, historię)?</div>
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={() => setConfirming(false)} className="flex-1">Anuluj</Btn>
            <Btn variant="danger" onClick={onReset} className="flex-1">Skasuj</Btn>
          </div>
        </div>
      ) : (
        <Btn variant="danger" onClick={() => setConfirming(true)} className="w-full"><Trash2 size={16}/>Resetuj aplikację</Btn>
      )}

      <div className="mt-10 text-center text-xs text-neutral-700 font-mono">
        PROGRES · Lokalny tracker progresji<br/>
        Auto-regulacja oparta o RIR
      </div>
    </div>
  );
}

const Row = ({ label, value }) => (
  <div className="flex items-baseline justify-between py-2 border-b border-neutral-900 last:border-0">
    <span className="text-sm text-neutral-400">{label}</span>
    <span className="font-mono text-sm text-white">{value}</span>
  </div>
);

// ============================================================
// BOTTOM NAV
// ============================================================
function BottomNav({ view, setView }) {
  const items = [
    { id: 'home', icon: Home, label: 'Dziś' },
    { id: 'progress', icon: TrendingUp, label: 'Postępy' },
    { id: 'history', icon: History, label: 'Historia' },
    { id: 'library', icon: Library, label: 'Ćwicz.' },
    { id: 'settings', icon: Settings, label: 'Ust.' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-neutral-900 z-30">
      <div className="grid grid-cols-5">
        {items.map(it => {
          const Icon = it.icon;
          const active = view === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setView(it.id)}
              className={`py-3 flex flex-col items-center gap-0.5 ${active ? 'text-[#d4ff00]' : 'text-neutral-600'}`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2}/>
              <span className="text-[10px] uppercase tracking-wider font-mono">{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [history, setHistory] = useState({});
  const [active, setActive] = useState(null);
  const [view, setView] = useState('home');

  useEffect(() => {
    loadAll().then(d => {
      setProfile(d.profile);
      setPlan(d.plan);
      setHistory(d.history);
      setActive(d.active);
      setLoading(false);
    });
  }, []);

  const handleOnboarding = (data) => {
    setProfile(data);
    saveOne(KEY_PROFILE, data);
    const newPlan = generatePlan(data);
    setPlan(newPlan);
    saveOne(KEY_PLAN, newPlan);
  };

  const startWorkout = (idx) => {
    const w = plan[idx];
    const newActive = {
      sessionId: `s_${Date.now()}`,
      workoutName: w.name,
      workoutIdx: idx,
      date: Date.now(),
      currentEx: 0,
      exercises: w.exercises.map(e => ({
        exerciseId: e.id,
        sets: Array.from({ length: e.sets }, () => ({ weight: null, reps: null, rir: null, completed: false })),
      })),
    };
    setActive(newActive);
    saveOne(KEY_ACTIVE, newActive);
  };

  const updateActive = (newActive) => {
    setActive(newActive);
    saveOne(KEY_ACTIVE, newActive);
  };

  const finishWorkout = () => {
    if (!active) return;
    const w = plan[active.workoutIdx];
    const session = {
      sessionId: active.sessionId,
      workoutName: active.workoutName,
      date: active.date,
      exercises: active.exercises,
    };
    // Persist to per-exercise history
    const newHistory = { ...history };
    active.exercises.forEach((e) => {
      if (!newHistory[e.exerciseId]) newHistory[e.exerciseId] = [];
      newHistory[e.exerciseId] = [...newHistory[e.exerciseId], { date: session.date, sessionId: session.sessionId, workoutName: session.workoutName, sets: e.sets }];
    });
    setHistory(newHistory);
    saveOne(KEY_HISTORY, newHistory);
    setActive(null);
    saveOne(KEY_ACTIVE, null);
    setView('history');
  };

  const cancelWorkout = () => {
    setActive(null);
    saveOne(KEY_ACTIVE, null);
  };

  const regeneratePlan = () => {
    const newPlan = generatePlan(profile);
    setPlan(newPlan);
    saveOne(KEY_PLAN, newPlan);
    setView('home');
  };

  const savePlan = (newPlan) => {
    setPlan(newPlan);
    saveOne(KEY_PLAN, newPlan);
    setView('home');
  };

  const resetAll = async () => {
    try {
      localStorage.removeItem(KEY_PROFILE);
      localStorage.removeItem(KEY_PLAN);
      localStorage.removeItem(KEY_HISTORY);
      localStorage.removeItem(KEY_ACTIVE);
    } catch (e) {}
    setProfile(null); setPlan(null); setHistory({}); setActive(null);
  };

  if (loading) {
    return (
      <>
        <style>{FONT_IMPORT}</style>
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="font-display text-3xl text-[#d4ff00] uppercase tracking-widest">Progres</div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <style>{FONT_IMPORT}</style>
        <Onboarding onDone={handleOnboarding} />
      </>
    );
  }

  if (active) {
    const w = plan[active.workoutIdx];
    // Build a workout view that reflects swapped exercises in active
    const liveWorkout = {
      ...w,
      exercises: active.exercises.map((ae, i) => {
        const original = w.exercises[i];
        const found = EX.find(x => x.id === ae.exerciseId);
        return found ? { ...found, sets: original?.sets || ae.sets.length } : original;
      }),
    };
    return (
      <>
        <style>{FONT_IMPORT}</style>
        <WorkoutView
          workout={liveWorkout}
          history={history}
          active={active}
          setActive={updateActive}
          onFinish={finishWorkout}
          onCancel={cancelWorkout}
          profile={profile}
          onSwapExercise={() => {}}
        />
      </>
    );
  }

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-body">
        {view === 'editor' ? (
          <PlanEditor
            plan={plan}
            profile={profile}
            onSave={savePlan}
            onCancel={() => setView('home')}
          />
        ) : (
          <>
            {view === 'home' && <HomeView profile={profile} plan={plan} history={history} onStart={startWorkout} onPickWorkout={startWorkout} />}
            {view === 'history' && <HistoryView history={history} />}
            {view === 'progress' && <ProgressView history={history} />}
            {view === 'library' && <LibraryView history={history} />}
            {view === 'settings' && <SettingsView profile={profile} onRegenerate={regeneratePlan} onReset={resetAll} onEditPlan={() => setView('editor')} />}
            <BottomNav view={view} setView={setView} />
          </>
        )}
      </div>
    </>
  );
}
