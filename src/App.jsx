import { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Plus, Minus, Check, X, Dumbbell, History, Library, Home, Settings, TrendingUp, Trash2, RotateCcw, Play, Award, Target, Info, Timer, Repeat, FileText, Pause, ExternalLink, Flame, Sparkles } from 'lucide-react';

// ============================================================
// EXERCISE DATABASE
// ============================================================
const fsRaw = [
  // ============ CZWOROGŁOWE UDA ============
  ['Zakroki Zerchera', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zakroki-zerchera'],
  ['Wyprosty kolan na maszynie jednonóż', 'czworogłowe', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wyprosty-kolan-na-maszynie-jednonoz'],
  ['Syzyfki z asekuracją', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/syzyfki-z-asekuracja'],
  ['Przysiad ze sztangą ze stojaków (Anderson squat)', 'czworogłowe', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-ze-sztagna-ze-stojakow'],
  ['Przysiad kolarski ze sztangą na plecach', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-kolarski-ze-sztanga-na-plecach'],
  ['Przysiad kolarski z ciężarem przed klatką', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-kolarski-z-ciezarem-przed-klatka'],
  ['Przysiad kolarski', 'czworogłowe', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-kolarski'],
  ['Odwrócone nordyckie opady z pomocą gumy', 'czworogłowe', 'bodyweight', 'isolation', 8, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/odwrocone-nordyckie-opady-z-pomoca-gumy'],
  ['Odwrócone nordyckie opady z obciążeniem', 'czworogłowe', 'bodyweight', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/odwrocone-nordyckie-opady-z-obciazeniem'],
  ['Odwrócone nordyckie opady', 'czworogłowe', 'bodyweight', 'isolation', 8, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/odwrocone-nordyckie-opady'],
  ['Pistolet na podwyższeniu', 'czworogłowe', 'bodyweight', 'compound', 4, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/pistolet-na-podwyzszeniu'],
  ['Zakroki ze sztangą na plecach', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zakroki-ze-sztanga-na-plecach'],
  ['Zakroki', 'czworogłowe', 'bodyweight', 'compound', 10, 16, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zakroki'],
  ['Wykroki długie chodzone z dłońmi na klatce piersiowej', 'czworogłowe', 'bodyweight', 'compound', 10, 16, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wykroki-dlugie-chodzone-z-dlonmi-trzymanymi-na-klatce-piersiowej'],
  ['Wykroki chodzone', 'czworogłowe', 'bodyweight', 'compound', 10, 16, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wykroki-chodzone'],
  ['Wchodzenie na podwyższenie', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wchodzenie-na-podwyzszenie'],
  ['Przysiad sumo z kettlem/hantlą na stepach', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-sumo-z-kettlem-hantla-na-stepach'],
  ['Wykroki w bok z TRX', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wykroki-w-bok-z-trx'],
  ['Przysiad z hantlami w pozycji front rack', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-z-hantlami-w-pozycji-front-rack'],
  ['Przysiad bułgarski z gumą', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-z-guma'],
  ['Przysiad łyżwiarski', 'czworogłowe', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-lyzwiarski'],
  ['Przysiad wykroczny', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-wykroczny'],
  ['Przysiad wykroczny z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-wykroczny-z-hantlami'],
  ['Przysiad bułgarski – wersja pośladkowa z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-wersja-posladkowa-z-hantlami'],
  ['Przysiad wykroczny z nogą wykroczną na podwyższeniu z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-wykroczny-z-noga-wykroczna-na-podwyzszeniu-z-hantlami'],
  ['Przysiad bułgarski (1 i 1/2)', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-1-i-1-2'],
  ['Zercher squat', 'czworogłowe', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zercher-squat'],
  ['Wykroki skośne', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wykroki-skosne'],
  ['Spanish squat', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/spanish-squat'],
  ['Landmine reverse lunges', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/landmine-reverse-lunges'],
  ['Przysiad do podwyższenia (Box squat)', 'czworogłowe', 'barbell', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-do-podwyzszenia'],
  ['Goblet box squat', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/goblet-box-squat'],
  ['Reverse drop lunges with dumbbell', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/reverse-drop-lunges-with-dumbbell'],
  ['Reverse drop lunges', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/reverse-drop-lunges'],
  ['Przysiad przedni z paskami', 'czworogłowe', 'barbell', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-przedni-z-paskami'],
  ['Landmine squat', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/landmine-squat'],
  ['Przysiad z gumą', 'czworogłowe', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-z-guma'],
  ['Pistols squat na TRX', 'czworogłowe', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/pistol-squat-na-trx'],
  ['Przysiad z wyskokiem na TRX', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-z-wyskokiem-na-trx'],
  ['Wykroki z ramionami w górze na TRX', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wykroki-z-ramionami-w-gorze-na-trx'],
  ['Zakroki na TRX', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zakroki-na-trx'],
  ['Wypychanie suwnicy jednonóż', 'czworogłowe', 'machine', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wypychanie-suwnicy-jednonoz'],
  ['Kozak squat z ciężarem', 'czworogłowe', 'dumbbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/kozak-squat-z-ciezarem'],
  ['Kozak squat bez ciężaru', 'czworogłowe', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/kozak-squat-bez-ciezaru'],
  ['Pistolet', 'czworogłowe', 'bodyweight', 'compound', 4, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/pistolet'],
  ['Pistolet z ciężarem', 'czworogłowe', 'bodyweight', 'compound', 3, 6, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/pistolet-z-ciezarem'],
  ['Przysiad sumo', 'czworogłowe', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-sumo'],
  ['Przysiad z TRX', 'czworogłowe', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-z-trx'],
  ['Przysiad bułgarski z TRX', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-z-trx'],
  ['Przysiad bułgarski – wersja dla mięśnia czworogłowego uda', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-wersja-dla-miesnia-czworoglowego-uda'],
  ['Przysiad bułgarski z hantlami – wersja dla m. czworogłowego', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-z-hantlami-wersja-dla-miesnia-czworoglowego-uda'],
  ['Przysiad wykroczny z nogą zakroczną na podwyższeniu z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-wykroczny-z-noga-zakroczna-na-podwyzszeniu-z-hantlami'],
  ['Przysiad do skrzyni jednonóż', 'czworogłowe', 'bodyweight', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-do-skrzyni-jednonoz'],
  ['Wchodzenie na podwyższenie z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wchodzenie-na-podwyzszenie-z-hantlami'],
  ['Zakroki z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/zakroki-z-hantlami'],
  ['Wykroki chodzone z hantlami w dłoniach', 'czworogłowe', 'dumbbell', 'compound', 10, 16, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/wykroki-chodzone-z-hantlami-w-dloniach'],
  ['Przysiad bułgarski – wersja pośladkowa', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-bulgarski-wersja-posladkowa'],
  ['Side step up – wejście bokiem', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/side-step-up-wejscie-bokiem'],
  ['Przysiad wykroczny z nogą wykroczną na podwyższeniu', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-wykroczny-z-noga-wykroczna-na-podwyzszeniu'],
  ['Przysiad wykroczny z nogą zakroczną na podwyższeniu', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/przysiad-wykroczny-z-noga-zakroczna-na-podwyzszeniu'],
  ['Poliquin step-up', 'czworogłowe', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/poliquin-stepup'],
  ['Poliquin step-up z hantlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/czworoglowe-uda/poliquin-stepup-z-hantlami'],
  ['Przysiad z dłońmi trzymanymi za głową (Air squat)', 'czworogłowe', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-z-dlonmi-trzymanymi-za-glowa'],
  ['Wykroki chodzone z dłońmi trzymanymi na klatce piersiowej', 'czworogłowe', 'bodyweight', 'compound', 10, 16, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/wykroki-chodzone-z-dlonmi-trzymanymi'],
  ['Wchodzenie na podwyższenie ze sztangą na plecach', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/wchodzenie-na-podwyzszenie-ze-sztanga-trzymana'],
  ['Przysiad z kettlami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-z-kettlami'],
  ['Przysiad ze sztangą trzymaną na plecach (Back squat)', 'czworogłowe', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-ze-sztanga-trzymana-na-plecach'],
  ['Wykroki w miejscu ze sztangą na plecach', 'czworogłowe', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/wykroki-w-miejscu-ze-sztanga-trzymana'],
  ['Wykroki chodzone ze sztangą na plecach', 'czworogłowe', 'barbell', 'compound', 10, 16, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/wykroki-chodzone-ze-sztanga-trzymana'],
  ['Przysiad z użyciem linek wyciągu dolnego', 'czworogłowe', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-z-uzyciem-linek-wyciagu-dolnego'],
  ['Przysiad na maszynie Smitha', 'czworogłowe', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-na-maszynie-smitha'],
  ['Wykroki w miejscu z hantelkami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/zakroki-w-miejscu-z-hantelkami'],
  ['Przysiad z hantelkami', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-z-hantelkami'],
  ['Przysiad ze sztangą trzymaną na barkach (Front squat)', 'czworogłowe', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-ze-sztanga-trzymana-na-barkach'],
  ['Goblet squat – przysiad z kettlem lub hantelką', 'czworogłowe', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/goblet-squat-przysiad-z-kettlem'],
  ['Wyprosty kolan na maszynie siedząc', 'czworogłowe', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/wyprosty-kolan-na-maszynie-siedzac'],
  ['Wypychanie nogami na suwnicy (Leg press)', 'czworogłowe', 'machine', 'compound', 8, 15, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/wypychanie-nogami-na-suwnicy'],
  ['Przysiad w wykroku na maszynie Smitha', 'czworogłowe', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/czworoglowe-uda/przysiad-w-wykroku-na-maszynie-smitha'],

  // ============ DWUGŁOWE UDA / POŚLADKI ============
  ['Żuraw z pomocą gumy', 'dwugłowe uda', 'bodyweight', 'isolation', 6, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/zuraw-z-pomoca-gumy'],
  ['Martwy ciąg jednonóż z półsztangą', 'dwugłowe uda', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/martwy-ciag-jednonoz-z-polsztanga'],
  ['Unoszenie bioder z hantlą na jednej nodze w oparciu o ławeczkę', 'pośladki', 'dumbbell', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-bioder-z-hantla-na-jednej-nodze-w-oparciu-o-laweczke'],
  ['Unoszenie nogi w klęku podpartym z gumą', 'pośladki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-nogi-w-kleku-podpartym-z-guma'],
  ['Pull through', 'dwugłowe uda', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/pull-through'],
  ['Przywodzenie nogi w bok z linką wyciągu dolnego', 'pośladki', 'cable', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/przywodzenie-nogi-w-bok-z-wykorzystaniem-linki-wyciagu-dolnego'],
  ['Przywodzenie nóg na maszynie', 'pośladki', 'machine', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/przywodzenie-nog-na-maszynie'],
  ['Przyciąganie pięt do pośladków na TRX (łatwiejsza wersja)', 'dwugłowe uda', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/przyciaganie-piet-do-posladkow-na-trx-latwiejsza-wersja'],
  ['Unoszenie bioder na jednej nodze w oparciu o ławeczkę', 'pośladki', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-bioder-na-jednej-nodze-w-oparciu-o-laweczke'],
  ['Unoszenie bioder na jednej nodze z hantlą', 'pośladki', 'dumbbell', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-bioder-na-jednej-nodze-z-hantla'],
  ['Unoszenie bioder w górę (Glute bridge)', 'pośladki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-bioder-w-gore'],
  ['Odwodzenie nogi w tył z linką wyciągu dolnego', 'pośladki', 'cable', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/odwodzenie-nogi-w-tyl-z-wykorzystaniem-linki-wyciagu-dolnego'],
  ['Odwodzenie nogi w tył na maszynie', 'pośladki', 'machine', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/odwodzenie-nogi-w-tyl-na-maszynie'],
  ['Odwodzenie nogi w klęku podpartym', 'pośladki', 'bodyweight', 'isolation', 15, 25, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/odwodzenie-nogi-w-kleku-podpartym'],
  ['Odwodzenie nogi w bok z linką wyciągu dolnego', 'pośladki', 'cable', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/odwodzenie-nogi-w-bok-z-wykorzystaniem-linki-wyciagu-dolnego'],
  ['Odwodzenie nóg na maszynie', 'pośladki', 'machine', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/odwodzenie-nog-na-maszynie'],
  ['Zginanie nóg z gumą miniband', 'dwugłowe uda', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/zginanie-nog-z-guma-miniband'],
  ['Zginanie nóg na maszynie jednonóż', 'dwugłowe uda', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/zginanie-nog-na-maszynie-jednonoz'],
  ['Unoszenie nóg na ławce skośnej', 'pośladki', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-nog-na-lawce-skosnej'],
  ['Frog hip thrust z hantlą', 'pośladki', 'dumbbell', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/frog-hip-thrust-z-hantla'],
  ['Odwodzenie nogi w pozycji side plank', 'pośladki', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/odwodzenie-nogi-w-pozycji-side-plank'],
  ['Unoszenie nóg na ławce rzymskiej', 'pośladki', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-nog-na-lawce-rzymskiej'],
  ['Unoszenie nóg na ławce poziomej', 'pośladki', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-nog-na-lawce-poziomej'],
  ['Stiff leg deadlift z podwyższenia', 'dwugłowe uda', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/stiff-leg-deadlift-z-podwyzszenia'],
  ['Side walk', 'pośladki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/side-walk'],
  ['Rumuński martwy ciąg z hantlami kickstand', 'dwugłowe uda', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/rumunski-martwy-ciag-z-hantlami-kickstand'],
  ['Rumuński martwy ciąg kickstand', 'dwugłowe uda', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/rumunski-martwy-ciag-kickstand'],
  ['Pull through z gumą', 'dwugłowe uda', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/pull-through-z-guma'],
  ['Odwodzenie nogi w leżeniu bokiem (Clamshell)', 'pośladki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/odwodzenie-nogi-w-lezeniu-bokiem'],
  ['Martwy ciąg na jednej nodze z asekuracją', 'dwugłowe uda', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/martwy-ciag-na-jednej-nodze-z-asekuracja'],
  ['Hamstring walkout', 'dwugłowe uda', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/hamstring-walkout'],
  ['Dzień dobry ze sztangą', 'dwugłowe uda', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/dzien-dobry-ze-sztanga'],
  ['Unoszenie bioder z uniesionymi palcami stóp', 'pośladki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-bioder-z-uniesionymi-palcami-stop'],
  ['Przywodzenie kopenhaskie', 'pośladki', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/przywodzenie-kopenhaskie'],
  ['Martwy ciąg sumo z podwyższenia', 'dwugłowe uda', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/martwy-ciag-sumo-z-podwyzszenia'],
  ['Martwy ciąg z kettlem z podwyższenia', 'dwugłowe uda', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/martwy-ciag-z-kettlem-z-podwyzszenia'],
  ['Mostek biodrowy z hantlą', 'pośladki', 'dumbbell', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/mostek-biodrowy-z-hantla'],
  ['Hip drop', 'pośladki', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/hip-drop'],
  ['Klasyczny martwy ciąg z podwyższenia', 'plecy', 'barbell', 'compound', 3, 6, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/klasyczny-martwy-ciag-z-podwyzszenia'],
  ['Dzień dobry z gumą', 'dwugłowe uda', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/dzien-dobry-z-guma'],
  ['Landmine RDL', 'dwugłowe uda', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/landmine-rdl'],
  ['Landmine deadlift', 'plecy', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/landmine-deadlift'],
  ['Przyciąganie pięt do pośladków z gumą', 'dwugłowe uda', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/przyciaganie-piet-do-posladkow-z-guma'],
  ['Martwy ciąg na jednej nodze z gumą', 'dwugłowe uda', 'bodyweight', 'compound', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/martwy-ciag-na-jednej-nodze-z-guma'],
  ['Martwy ciąg na prostych nogach z gumą', 'dwugłowe uda', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/martwy-ciag-na-prostych-nogach-z-guma'],
  ['Martwy ciąg z gumą', 'plecy', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/martwy-ciag-z-guma'],
  ['Unoszenie bioder z gumą', 'pośladki', 'bodyweight', 'isolation', 15, 25, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-bioder-z-guma'],
  ['X walk', 'pośladki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/x-walk'],
  ['Stiff leg deadlift', 'dwugłowe uda', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/stiff-leg-deadlift'],
  ['Unoszenie tułowia na ławce rzymskiej jednonóż', 'dwugłowe uda', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-tulowia-na-lawce-rzymskiej-jednonoz'],
  ['Zginanie nóg na piłce gimnastycznej leżąc (łatwiejsza wersja)', 'dwugłowe uda', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/zginanie-nog-na-pilce-gimnastycznej-lezac'],
  ['Żuraw (łatwiejsza wersja)', 'dwugłowe uda', 'bodyweight', 'isolation', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/zuraw-latwiejsza-wersja'],
  ['Unoszenie bioder z hantlą w oparciu o ławeczkę (Hip thrust)', 'pośladki', 'dumbbell', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/unoszenie-bioder-z-hantla-w-oparciu-o-laweczke'],
  ['Frog hip thrust', 'pośladki', 'bodyweight', 'isolation', 15, 25, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/frog-hip-thrust'],
  ['Przyciąganie pięt do pośladków na TRX', 'dwugłowe uda', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/przyciaganie-piet-do-posladkow-na-trx'],
  ['Uginanie nóg z hantlą w leżeniu', 'dwugłowe uda', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/uginanie-nog-z-hantla-w-lezeniu'],
  ['Unoszenie bioder na jednej nodze', 'pośladki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda-posladki/unoszenie-bioder-na-jednej-nodze'],
  ['Martwy ciąg na jednej nodze z hantlami', 'dwugłowe uda', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/martwy-ciag-na-jednej-nodze-z-hantlami'],
  ['Martwy ciąg sumo', 'plecy', 'barbell', 'compound', 3, 6, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/martwy-ciag-sumo'],
  ['Unoszenie bioder ze sztangą', 'pośladki', 'barbell', 'isolation', 8, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/unoszenie-bioder-ze-sztanga'],
  ['Unoszenie bioder ze sztangą w oparciu o ławeczkę (Hip thrust)', 'pośladki', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/unoszenie-bioder-ze-sztanga-w-oparciu-o-laweczke'],
  ['Żuraw (Nordic curl)', 'dwugłowe uda', 'bodyweight', 'isolation', 4, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/zuraw'],
  ['Żuraw z piłką', 'dwugłowe uda', 'bodyweight', 'isolation', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/dwuglowe-uda/zuraw-z-pilka'],
  ['Martwy ciąg na prostych nogach z hantlami', 'dwugłowe uda', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/dwuglowe-uda/martwy-ciag-na-prostych-nogach'],
  ['Martwy ciąg na prostych nogach (Romanian deadlift)', 'dwugłowe uda', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/dwuglowe-uda/martwy-ciag-na-prostych-nogach-barbell'],
  ['Zginanie nóg na maszynie leżąc lub siedząc', 'dwugłowe uda', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/dwuglowe-uda/zginanie-nog-na-maszynie-siedzac-seated'],
  ['Zginanie nóg na piłce gimnastycznej leżąc', 'dwugłowe uda', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/dwuglowe-uda/zginanie-nog-na-pilce-gimnastycznej-lezac'],

  // ============ PLECY ============
  ['Wiosłowanie gumą w opadzie tułowia', 'plecy', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-guma-w-opadzie-tulowia'],
  ['Ściąganie gumy jednorącz z nad głowy', 'plecy', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-gumy-jednoracz-z-nad-glowy'],
  ['Ściąganie chwytu wyciągu górnego po skosie', 'plecy', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-chwytu-wyciagu-gornego-po-skosie'],
  ['Ściąganie chwytu wyciągu górnego jednorącz', 'plecy', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-chwytu-wyciagu-gornego-jednoracz'],
  ['Podciąganie podchwytem z martwego punktu', 'plecy', 'bodyweight', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-podchwytem-z-martwego-punktu'],
  ['Podciąganie nachwytem z martwego punktu', 'plecy', 'bodyweight', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-nachwytem-z-martwego-punktu'],
  ['Podciąganie chwytem neutralnym na pojedynczym drążku', 'plecy', 'bodyweight', 'compound', 5, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-chwytem-neutralnym-na-pojedynczym-drazku'],
  ['Podciąganie australijskie jednorącz', 'plecy', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-australijskie-jednoracz'],
  ['Podciąganie australijskie podchwytem', 'plecy', 'bodyweight', 'compound', 8, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-australijskie-podchwytem'],
  ['Y raise z hantlami w opadzie tułowia', 'plecy', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/y-raise-z-hantlami-w-opadzie-tulowia'],
  ['Wiosłowanie kettlebell z podłogi', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-kettlebell-z-podlogi'],
  ['Wiosłowanie hantlami z podłogi', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-hantlami-z-podlogi'],
  ['Wiosłowanie w podporze na kolanach', 'plecy', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-w-podporze-na-kolanach'],
  ['Wiosłowanie w podporze z gumą miniband', 'plecy', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-w-podporze-z-guma-miniband'],
  ['Wiosłowanie w klęku jednonóż z gumą miniband', 'plecy', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-w-kleku-jednonoz-z-guma-miniband'],
  ['TRX Y raise', 'plecy', 'bodyweight', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/trx-y-raise'],
  ['TRX wiosłowanie jednorącz z rotacją', 'plecy', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/trx-wioslowanie-jednoracz-z-rotacja'],
  ['Szrugsy ze sztangą', 'plecy', 'barbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/szrugsy-ze-sztanga'],
  ['Wiosłowanie na TRX', 'plecy', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-na-trx'],
  ['Szrugsy z linkami wyciągu dolnego', 'plecy', 'cable', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/szrugsy-z-linkami-wyciagu-dolnego'],
  ['Szrugsy z hantlami', 'plecy', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/szrugsy-z-hantlami'],
  ['Seal row', 'plecy', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/seal-row'],
  ['Podciąganie z pomocą nóg', 'plecy', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-z-pomoca-nog'],
  ['Opuszczanie na drążku – podchwyt', 'plecy', 'bodyweight', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/opuszczanie-na-drazku-podchwyt'],
  ['Opuszczanie na drążku – nachwyt', 'plecy', 'bodyweight', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/opuszczanie-na-drazku-nachwyt'],
  ['Back widow', 'plecy', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/back-widow'],
  ['Wiosłowanie półsztangą', 'plecy', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-polsztanga'],
  ['Zwis aktywny', 'plecy', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/zwis-aktywny'],
  ['Scap pull up', 'plecy', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/scap-pull-up'],
  ['Kayak row', 'plecy', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/kayak-row'],
  ['Prostopadłe ściąganie gumy do bioder leżąc', 'plecy', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/prostopadle-sciaganie-gumy-do-bioder-lezac'],
  ['Prostopadłe ściąganie gumy do bioder stojąc', 'plecy', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/prostopadle-sciaganie-gumy-do-bioder-stojac'],
  ['Ściąganie gumy do klatki piersiowej', 'plecy', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-gumy-do-klatki-piersiowej'],
  ['Ściąganie gumy za kark', 'plecy', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-gumy-za-kark'],
  ['Wiosłowanie gumą', 'plecy', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-guma'],
  ['Ściąganie chwytem neutralnym z wyciągu górnego', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-chwytem-neutralnym-z-wyciagu-gornego'],
  ['Ściąganie drążka nachwytem na szerokość barków', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/sciaganie-drazka-nachwytem-na-szerokosc-barkow'],
  ['Wiosłowanie w oparciu o kolano', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-w-oparciu-o-kolano'],
  ['Wiosłowanie hantlą w oparciu ręką o ławeczkę', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-w-oparciu-reka-o-laweczke'],
  ['Podciąganie chwytem młotkowym', 'plecy', 'bodyweight', 'compound', 5, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-chwytem-mlotkowym'],
  ['Podciąganie nachwytem z pomocą gumy oporowej', 'plecy', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/podciaganie-nachwytem-z-pomoca-gumy-oporowej'],
  ['Wiosłowanie sztangą nachwytem w pełnym opadzie tułowia', 'plecy', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-sztanga-nachwytem-w-pelnym-opadzie-tulowia'],
  ['Wiosło Pendlaya', 'plecy', 'barbell', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslo-pendleya'],
  ['Trap Y raise', 'plecy', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/trap-y-raise'],
  ['Wiosłowanie w podporze – row renegade', 'plecy', 'dumbbell', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/wioslowanie-w-podporze-row-renegate'],
  ['Wiosłowanie hantlą w klęku podpartym na ławeczce', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-hantla-w-kleku-podpartym'],
  ['Wiosłowanie hantlami w oparciu o ławkę skośną', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-hantlami-w-oparciu-o-lawke'],
  ['Wiosłowanie sztangą nachwytem do klatki w opadzie', 'plecy', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-sztanga-trzymana-nachwytem-do-klatki'],
  ['Klasyczny martwy ciąg (Deadlift)', 'plecy', 'barbell', 'compound', 3, 6, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/klasyczny-martwy-ciag-barbell-deadlift'],
  ['Wiosłowanie z kółkami gimnastycznymi, TRX lub sztangą (Inverted row)', 'plecy', 'bodyweight', 'compound', 8, 15, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-z-wykorzystaniem-kolek-gimnastycznych-trx'],
  ['Podciąganie na drążku nachwytem (Pull ups)', 'plecy', 'bodyweight', 'compound', 5, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/podciaganie-na-drazku-trzymanym-nachwytem-pullups'],
  ['Podciąganie na drążku podchwytem (Chin ups)', 'plecy', 'bodyweight', 'compound', 5, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/podciaganie-na-drazku-trzymanym-podchwytem-chinup'],
  ['Podciąganie na drążku szeroko do karku', 'plecy', 'bodyweight', 'compound', 5, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/podciaganie-na-drazku-trzymanym-szeroko'],
  ['Przyciąganie drążka wyciągu górnego do klatki podchwytem wąsko', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/przyciaganie-drazka-wyciagu-gornego-do-klatki'],
  ['Prostopadłe przyciąganie drążka wyciągu górnego do bioder', 'plecy', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/prostopadle-przyciaganie-drazka-wyciagu-gornego'],
  ['Wiosłowanie końcem sztangi chwytem neutralnym', 'plecy', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-koncem-sztangi-chwytem-neutralnym'],
  ['Przyciąganie końca sztangi jednorącz w opadzie tułowia', 'plecy', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/przyciaganie-konca-sztangi-jednoracz-w-opadzie'],
  ['Przyciąganie linki wyciągu dolnego jednorącz', 'plecy', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/przyciaganie-linki-wyciagu-dolnego-jednoracz'],
  ['Przyciąganie linki wyciągu dolnego siedząc', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/przyciaganie-linki-wyciagu-dolnego-siedzac-seated'],
  ['Ściąganie drążka wyciągu górnego do klatki nachwytem szeroko', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/sciaganie-drazka-wyciagu-gornego-do-klatki'],
  ['Ściąganie drążka wyciągu górnego nachwytem za kark', 'plecy', 'cable', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/sciaganie-drazka-wyciagu-gornego-trzymanego-nachwytem'],
  ['Unoszenie tułowia na ławce rzymskiej (Hyperextension)', 'plecy', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/unoszenie-tulowia-na-lawce-rzymskiej-hyperextensions'],
  ['Wiosłowanie hantlami w opadzie tułowia', 'plecy', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-hantlami-w-opadzie-tulowia-bentover'],
  ['Wiosłowanie na suwnicy Smitha w opadzie tułowia', 'plecy', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-na-suwnicy-smitha-w-opadzie'],
  ['Wiosłowanie sztangą podchwytem w opadzie tułowia', 'plecy', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/na-plecy/wioslowanie-sztanga-trzymana-podchwytem-w-opadzie'],

  // ============ KLATKA PIERSIOWA ============
  ['Wyciskanie stojąc z wykorzystaniem wyciągu lub bramy', 'klatka', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-stojac-z-wykorzystaniem-wyciagu-lub-bramy'],
  ['Wyciskanie hantli wąskim chwytem neutralnym na ławeczce płaskiej', 'klatka', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-hantli-waskim-chwytem-neutralnym-na-laweczce-plaskiej'],
  ['Rozpiętki z gumą za plecami', 'klatka', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/rozpietki-z-guma-za-plecami'],
  ['Wyciskanie sztangi na ławce poziomej ze stojaków (Pin bench press)', 'klatka', 'barbell', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-sztangi-na-lawce-poziomej-ze-stojakow'],
  ['Wyciskanie z gumą za plecami', 'klatka', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-z-guma-za-plecami'],
  ['Wyciskanie sztangi na podłodze w domu', 'klatka', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-sztangi-na-podlodze-w-domu'],
  ['Wyciskanie sztangi na podłodze (Barbell floor press)', 'klatka', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-sztangi-na-podlodze'],
  ['Wyciskanie na podłodze jednorącz', 'klatka', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-na-podlodze-jednoracz'],
  ['Rozpiętki z hantlami w leżeniu na podłodze (Floor chest fly)', 'klatka', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/rozpietki-z-hantlami-w-lezeniu-na-podlodze'],
  ['Rozpiętki na TRX', 'klatka', 'bodyweight', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/rozpietki-na-trx'],
  ['Pompki podwieszane na TRX', 'klatka', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/pompki-podwieszane-na-trx'],
  ['Wyciskanie sztangi na ławce skośnej głową w dół', 'klatka', 'barbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/wyciskanie-sztangi-na-lawce-skosnej-glowa-w-dol'],
  ['Pompki na TRX', 'klatka', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/pompki-na-trx'],
  ['Floor press (Dumbbell floor press)', 'klatka', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/floor-press'],
  ['Rozpiętki z wykorzystaniem wyciągu dolnego', 'klatka', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/klatka-piersiowa/rozpietki-z-wykorzystaniem-wyciagu-dolnego'],
  ['Przenoszenie sztangielki za głowę (Dumbbell pullover)', 'klatka', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/przenoszenie-sztangielki-za-glowe-bentarm-dumbbell'],
  ['Wyciskanie na suwnicy Smitha na ławce skośnej głową w dół', 'klatka', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-na-suwnicy-smitha-lezac-2'],
  ['Wyciskanie sztangielek na ławce skośnej głową w dół', 'klatka', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangielek-na-lawce-skosnej-glowa'],
  ['Pompki (wersja klasyczna)', 'klatka', 'bodyweight', 'compound', 10, 25, 'https://www.fabrykasily.pl/cwiczenia/klatka-piersiowa/pompki-wersja-klasyczna'],
  ['Rozpiętki z hantlami na ławce płaskiej', 'klatka', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-z-hantlami-na-lawce-plaskiej'],
  ['Rozpiętki z wykorzystaniem wyciągów (Cable crossover)', 'klatka', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-z-wykorzystaniem-wyciagow-cable-crossover'],
  ['Rozpiętki na maszynie butterfly', 'klatka', 'machine', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-na-maszynie-butterfly-butterfly'],
  ['Pompki na poręczach (Dips – chest version)', 'klatka', 'bodyweight', 'compound', 6, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/pompki-na-poreczach-dips-chest'],
  ['Wyciskanie sztangi na ławce płaskiej do brody (Guillotine press)', 'klatka', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangi-na-lawce-plaskiej'],
  ['Rozpiętki z wyciągu na ławce dodatniej', 'klatka', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-z-wykorzystaniem-wyciagu-na-lawce'],
  ['Wyciskanie na suwnicy Smitha na ławce płaskiej', 'klatka', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-na-suwnicy-smitha-lezac'],
  ['Rozpiętki z wyciągu na ławce płaskiej', 'klatka', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-z-wykorzystaniem-wyciagu-na-lawce-2'],
  ['Wyciskanie sztangielek na ławce dodatniej (Incline dumbbell bench press)', 'klatka', 'dumbbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangielek-na-lawce-dodatniej-incline'],
  ['Wyciskanie sztangielek chwytem neutralnym na ławce ze skosem dodatnim', 'klatka', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangielek-chwytem-neutralnym-na-lawce'],
  ['Rozpiętki z hantlami na ławce dodatniej', 'klatka', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/rozpietki-z-hantlami-na-lawce-dodatniej'],
  ['Wznosy ramion z wyciągu dolnego (wersja na klatkę)', 'klatka', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wznosy-ramion-z-wykorzystaniem-dolnego-wyciagu'],
  ['Wyciskanie na maszynie hammer', 'klatka', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-na-maszynie-hammer-leverage-chest'],
  ['Wyciskanie sztangi na ławce płaskiej (Barbell bench press)', 'klatka', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangi-na-lawce-plaskiej-barbell'],
  ['Wyciskanie sztangi na ławce dodatniej (Incline barbell bench press)', 'klatka', 'barbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangi-na-lawce-dodatniej-incline'],
  ['Wyciskanie sztangielek na ławce płaskiej (Dumbbells bench press)', 'klatka', 'dumbbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-klatke-piersiowa/wyciskanie-sztangielek-na-lawce-plaskiej-dumbbell'],

  // ============ BARKI ============
  ['TRX odwrócone rozpiętki', 'barki', 'bodyweight', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/trx-odwrocone-rozpietki'],
  ['TRX face pull', 'barki', 'bodyweight', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/trx-face-pull'],
  ['Przenoszenie ramion z gumą miniband', 'barki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/przenoszenie-ramion-z-guma-miniband'],
  ['Powell raise', 'barki', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/powell-raise'],
  ['T raise z hantlami w opadzie tułowia', 'barki', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/t-raise-z-hantlami-w-opadzie-tulowia'],
  ['Rotacja wewnętrzna na wyciągu', 'barki', 'cable', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/rotacja-wewnetrzna-na-wyciagu'],
  ['Rotacja zewnętrzna na wyciągu', 'barki', 'cable', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/rotacja-zewnetrzna-na-wyciagu'],
  ['Z-press', 'barki', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/zpress'],
  ['Face pull z gumą', 'barki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/face-pull-guma'],
  ['Landmine press', 'barki', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/landmine-press'],
  ['Landmine press half kneeling', 'barki', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/landmine-press-half-kneeling'],
  ['Wyciskanie jednorącz nad głowę z gumą', 'barki', 'bodyweight', 'compound', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/cuban-press/wyciskanie-jednoracz-nad-glowe-z-guma'],
  ['Wyciskanie ramion z gumą nad głowę', 'barki', 'bodyweight', 'compound', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/wyciskanie-ramion-z-guma-nad-glowe'],
  ['Wznosy ramion w bok z gumą', 'barki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/cuban-press/wznosy-ramion-w-bok-z-guma'],
  ['Wznosy ramion w przód z gumą', 'barki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/wznosy-ramion-w-przod-z-guma'],
  ['Unoszenie ramion z hantlami w przód z przenoszeniem na boki', 'barki', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/unoszenie-ramion-z-hantlami-w-przod-z-przenoszeniem-na-boki'],
  ['Cuban press', 'barki', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/cuban-press'],
  ['Wyciskanie hantli w klęku jednonóż', 'barki', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/wyciskanie-hantli-w-kleku-jednonoz'],
  ['Unoszenie ramienia z linką wyciągu dolnego', 'barki', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/unoszenie-ramienia-z-wykorzystaniem-linki-wyciagu-dolnego'],
  ['Rotacja zewnętrzna w leżeniu bokiem', 'barki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/rotacja-zewnetrzna-w-lezeniu-bokiem'],
  ['Rotacje kubańskie z hantlami', 'barki', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/rotacje-kubanskie-z-hantlami'],
  ['Rotacje zewnętrzne ramienia hantlą siedząc', 'barki', 'dumbbell', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/rotacje-zewnetrzne-ramienia-hantla-siedzac'],
  ['Przyciąganie liny z wyciągu do twarzy (Face pull)', 'barki', 'cable', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/przyciaganie-liny-z-wyciagu-do-twarzy-face-pull'],
  ['T raise na ławeczce', 'barki', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/barki/t-raise-na-laweczce'],
  ['Wyciskanie sztangi zza głowy stojąc', 'barki', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-sztangi-zza-glowy-stojac-standing'],
  ['Wyciskanie sztangi nad głowę siedząc', 'barki', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-sztangi-nad-glowe-barbell-shoulder'],
  ['Wyciskanie sztangi na maszynie Smitha siedząc', 'barki', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-sztangi-na-maszynie-smith-siedzac'],
  ['Unoszenie ramion w przód ze sztangą w oparciu o ławkę dodatnią', 'barki', 'barbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/unoszenie-ramion-w-przod-ze-sztanga'],
  ['Arnoldki – wyciskanie hantli nad głowę z rotacją (Arnold press)', 'barki', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/arnoldki-wyciskanie-hantli-nad-glowe'],
  ['Odwodzenie linek w tył wyciągu stojąc', 'barki', 'cable', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-barki/odwodzenie-linek-w-tyl-wyciagu-stojac'],
  ['Naprzemianstronne unoszenie ramion w przód z wyciągu dolnego', 'barki', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/naprzemianstronne-unoszenie-ramion-w-przod'],
  ['Naprzemianstronne unoszenie ramion w przód ze sztangielkami', 'barki', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/naprzemianstronne-unoszenie-ramion-w-przod-2'],
  ['Naprzemienne wyciskanie hantli nad głowę stojąc', 'barki', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/naprzemienne-wyciskanie-hantli-nad-glowe-stojac'],
  ['Podciąganie sztangi pod brodę', 'barki', 'barbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/podciaganie-sztangi-pod-brode-upright-barbell'],
  ['Przyciąganie liny z wyciągu górnego do klatki piersiowej', 'barki', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/przyciaganie-liny-z-wyciagu-gornego'],
  ['Wyciskanie ramion nad głowę siedząc z wyciągu', 'barki', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-ramion-nad-glowe-siedzac'],
  ['Unoszenie ramion w bok ze sztangielkami siedząc', 'barki', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/unoszenie-ramion-w-bok-ze-sztangielkami'],
  ['Odwodzenie ramion w bok ze sztangielkami (Lateral raise)', 'barki', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/odwodzenie-ramion-w-bok-ze-sztangielkami'],
  ['Unoszenie ramion w przód ze sztangielkami (Front raise)', 'barki', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/unoszenie-ramion-w-przod-ze-sztangielkami'],
  ['Unoszenie ramion w przód ze sztangielką trzymaną oburącz', 'barki', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/unoszenie-ramion-w-przod-ze-sztangielka'],
  ['Wyciskanie sztangi nad głowę (Military press)', 'barki', 'barbell', 'compound', 5, 10, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-sztangi-nad-glowe-standing-front'],
  ['Wyciskanie hantli nad głowę siedząc', 'barki', 'dumbbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-hantli-nad-glowe-siedzac-seated'],
  ['Wyciskanie hantli nad głowę stojąc', 'barki', 'dumbbell', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-hantli-nad-glowe-stojac-standing'],
  ['Wyciskanie nad głowę na maszynie chwytem neutralnym', 'barki', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-nad-glowe-na-maszynie-chwytem'],
  ['Wyciskanie nad głowę z linkami wyciągu dolnego', 'barki', 'cable', 'compound', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-nad-glowe-z-linkami-wyciagu'],
  ['Wyciskanie sztangielki jednorącz nad głowę stojąc', 'barki', 'dumbbell', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-sztangielki-jednoracz-nad-glowe-stojac'],
  ['Wznosy ramion w bok w opadzie tułowia siedząc', 'barki', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wznosy-ramion-w-bok-w-opadzie'],
  ['Wznosy ramion w bok w opadzie tułowia', 'barki', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-barki/wznosy-ramion-w-bok-w-opadzie-2'],

  // ============ BRZUCH ============
  ['TRX superman na kolanach', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/trx-superman-na-kolanach'],
  ['TRX body saw', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/trx-body-saw'],
  ['Rotacje w pozycji podporu bokiem', 'core', 'bodyweight', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/rotacje-w-pozycji-podporu-bokiem'],
  ['Rotacje w pozycji deski bokiem', 'core', 'bodyweight', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/rotacje-w-pozycji-deski-bokiem'],
  ['Dotykanie przeciwnych barków w podporze', 'core', 'bodyweight', 'isolation', 16, 30, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/dotykanie-przeciwnych-barkow-w-podporze'],
  ['Deska na kolanach', 'core', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/deska-na-kolanach'],
  ['Pallof press w pozycji wykrocznej', 'core', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/pallof-press-w-pozycji-wykrocznej'],
  ['Pallof press w pozycji wykrocznej na wyciągu', 'core', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/pallof-press-w-pozycji-wykrocznej-na-wyciagu'],
  ['Deska bokiem na kolanach', 'core', 'bodyweight', 'isolation', 30, 45, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/deska-bokiem-na-kolanach'],
  ['Chaos pallof press', 'core', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/chaos-pallof-press'],
  ['Przyciąganie ręki do przeciwnej nogi (Alternating toe touch)', 'core', 'bodyweight', 'isolation', 16, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/przyciaganie-reki-do-przeciwnej-nogi'],
  ['Nożyce nogami', 'core', 'bodyweight', 'isolation', 20, 40, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/nozyce-nogami'],
  ['Deska na TRX', 'core', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/deska-na-trx'],
  ['Deska na piłce', 'core', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/deska-na-pilce'],
  ['Brzuszki z rękami na klatce piersiowej', 'core', 'bodyweight', 'isolation', 15, 25, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/brzuszki-z-rekami-na-klatce-piersiowej'],
  ['Wycieraczki – nogi ugięte', 'core', 'bodyweight', 'isolation', 10, 16, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/wycieraczki-nogi-ugiete'],
  ['Wycieraczki – nogi proste', 'core', 'bodyweight', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/wycieraczki-nogi-proste'],
  ['Unoszenie prostych nóg na stojaku', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/unoszenie-prostych-nog-na-stojaku'],
  ['Unoszenie kolan na skos w zwisie na drążku', 'core', 'bodyweight', 'isolation', 10, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/unoszenie-kolan-na-skos-w-zwisie-na-drazku'],
  ['Spięcia brzucha z linkami wyciągu górnego (Cable crunch)', 'core', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/spiecia-brzucha-z-linkami-wyciagu-gornego'],
  ['Rotacje w klęku jednonóż z hantlą', 'core', 'dumbbell', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/rotacje-w-kleku-jednonoz-z-hantla'],
  ['Przyciąganie kolan do klatki na stojaku', 'core', 'bodyweight', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/przyciaganie-kolan-do-klatki-na-stojaku'],
  ['Naprzemienne przyciąganie kolan z gumą miniband', 'core', 'bodyweight', 'isolation', 16, 30, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/naprzemienne-przyciaganie-kolan-z-guma-miniband'],
  ['Krążenia ramion w podporze na piłce (Stir the pot)', 'core', 'bodyweight', 'isolation', 10, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/krazenia-ramion-w-podporze-na-pilce'],
  ['Spacer farmera (Farmer walk)', 'core', 'dumbbell', 'compound', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/spacer-farmera'],
  ['Spacer farmera z ciężarem po jednej stronie nad klatką', 'core', 'dumbbell', 'compound', 20, 40, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/spacer-farmera-z-ciezarem-po-jednej-stronie-nad-klatka-piersiowa'],
  ['Spacer farmera z ciężarem nad klatką piersiową', 'core', 'dumbbell', 'compound', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/spacer-farmera-z-ciezarem-nad-klatka-piersiowa'],
  ['Suitcase walk', 'core', 'dumbbell', 'compound', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/suitcase-walk'],
  ['Pallof press na wyciągu', 'core', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/pallof-press-na-wyciagu'],
  ['Landmine twist', 'core', 'barbell', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/landmine-twist'],
  ['Janda sit up', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/janda-sit-up'],
  ['Body saw', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/body-saw'],
  ['Ab roller na kolanach z przedramionami na piłce', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/ab-roller-na-kolanach-z-przedramionami-na-pilce'],
  ['Unoszenie prostych nóg do drążka (Hanging leg raise)', 'core', 'bodyweight', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/unoszenie-prostych-nog-do-drazka'],
  ['Mountain climbers na TRX', 'core', 'bodyweight', 'isolation', 20, 40, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/mountain-climbers-na-trx'],
  ['Pike TRX', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/pike-trx'],
  ['Superman na TRX', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/superman-na-na-trx'],
  ['Deska bokiem na TRX', 'core', 'bodyweight', 'isolation', 30, 45, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/deska-bokiem-na-trx'],
  ['Rewersy (Reverse crunch)', 'core', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/rewersy'],
  ['Scyzoryk (Jackknife sit up)', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/scyzoryk'],
  ['Dead bug – nogi proste', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/dead-bug-nogi-proste'],
  ['Dead bug – nogi ugięte', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/dead-bug-nogi-ugiete'],
  ['Hollow body', 'core', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/hollow-body'],
  ['Semi hollow body', 'core', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/semi-hollow-body'],
  ['Przyciąganie kolan pod klatkę na piłce', 'core', 'bodyweight', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/przyciaganie-kolan-pod-klatke-na-pilce'],
  ['Przyciąganie kolan pod klatkę na TRX', 'core', 'bodyweight', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/przyciaganie-kolan-pod-klatke-na-trx'],
  ['Ab roller na kolanach', 'core', 'bodyweight', 'isolation', 8, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/ab-roller-na-kolanach'],
  ['Ab roller na kolanach z piłką (Ball rollout)', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/ab-roller-na-kolanach-z-pilka'],
  ['Rotacje z gumą', 'core', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/rotacje-z-guma'],
  ['Pallof press (Banded)', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/pallof-press'],
  ['Rotacja boczna na wyciągu', 'core', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/rotacja-boczna-na-wyciagu'],
  ['Rotacje boczne po skosie – woodchoper', 'core', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/brzuch/rotacje-boczne-po-skosie-woodchoper'],
  ['Deska / Plank (izometryczny skurcz w podporze przodem)', 'core', 'bodyweight', 'isolation', 30, 60, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/izometryczny-skurcz-miesni-brzucha-w-podporze'],
  ['Naprzemienne przyciąganie łokci do kolan leżąc', 'core', 'bodyweight', 'isolation', 20, 40, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/naprzemienne-przyciaganie-lokci-do-kolan-lezac'],
  ['Naprzemienne sięganie do kostek leżąc', 'core', 'bodyweight', 'isolation', 20, 40, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/naprzemienne-sieganie-do-kostek-lezac-alternate'],
  ['Przyciąganie kolan do klatki w zwisie na drążku', 'core', 'bodyweight', 'isolation', 10, 20, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/przyciaganie-kolan-do-klatki-w-zwisie-2'],
  ['Rowerek (Bicycle crunch)', 'core', 'bodyweight', 'isolation', 20, 40, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/rowerek-air-bike'],
  ['Spięcia brzucha leżąc na macie ze złączonymi stopami (Frog crunch)', 'core', 'bodyweight', 'isolation', 15, 25, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/spiecia-brzucha-lezac-macie-ze-zlaczonymi'],
  ['Spięcia brzucha z nogami na piłce gimnastycznej', 'core', 'bodyweight', 'isolation', 15, 25, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/spiecia-brzucha-z-nogami-opartymi'],
  ['Świeca z prostowaniem nóg leżąc', 'core', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/swieca-z-prostowaniem-nog-lezac-bottoms'],
  ['Zginanie tułowia na maszynie siedząc (AB crunch machine)', 'core', 'machine', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/zginanie-tulowia-na-maszynie-siedzac-spiecia'],
  ['Unoszenie tułowia z podłoża (AB crunch)', 'core', 'bodyweight', 'isolation', 15, 25, 'https://www.fabrykasily.pl/cwiczenia/na-brzuch/unoszenie-tulowia-z-podloza-spiecia-brzucha'],

  // ============ TRICEPS ============
  ['Prostowanie ramienia jednorącz w klęku podpartym na ławce płaskiej', 'triceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/prostowanie-ramienia-jednoracz-w-kleku-podpartym-na-lawce-plaskiej'],
  ['Prostowanie ramion z gumą pod stopami', 'triceps', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/prostowanie-ramion-z-guma-pod-stopami'],
  ['Prostowanie ramion w oparciu o ławeczkę', 'triceps', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/prostowanie-ramion-w-oparciu-o-laweczke'],
  ['Wyciskanie francuskie w leżeniu na podłodze', 'triceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/wyciskanie-francuskie-w-lezeniu-na-podlodze'],
  ['Pompki w podporze tyłem z ugiętymi nogami', 'triceps', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/pompki-w-podporze-tylem-z-ugietymi-nogami'],
  ['Pompki w podporze tyłem z nogami na podwyższeniu', 'triceps', 'bodyweight', 'compound', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/pompki-w-podporze-tylem-z-nogami-na-podwyzszeniu'],
  ['Pompki na poręczach – samo opuszczanie', 'triceps', 'bodyweight', 'compound', 5, 8, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/pompki-na-poreczach-samo-opuszczanie'],
  ['Triceps rollback extension', 'triceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/tricpes-rollback-extension'],
  ['Prostowanie ramion z gumą', 'triceps', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/prostowanie-ramion-z-guma'],
  ['Prostowanie ramion na TRX', 'triceps', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/prostowanie-ramion-na-trx'],
  ['Prostowanie ramion z linką wyciągu dolnego w opadzie tułowia', 'triceps', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/prostowanie-ramion-z-linka-wyciagu-dolnego-w-opadzie-tulowia'],
  ['Prostowanie ramion z linkami wyciągu górnego', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/prostowanie-ramion-z-linkami-wyciagu-gornego'],
  ['Wyciskanie francuskie z przenoszeniem ramion za głowę', 'triceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/wyciskanie-francuskie-z-przenoszeniem-ramion-za-glowe'],
  ['Wyciskanie sztangi wąskim chwytem', 'triceps', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/wyciskanie-sztangi-waskim-chwytem'],
  ['Wyciskanie francuskie hantlami z przenoszeniem ramion za głowę', 'triceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/wyciskanie-francuskie-hantlami-z-przenoszeniem-ramion-za-glowe'],
  ['Wyciskanie francuskie hantlami (Dumbbell skull crusher)', 'triceps', 'dumbbell', 'isolation', 10, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/wyciskanie-francuskie-hantlami'],
  ['Wąskie pompki', 'triceps', 'bodyweight', 'compound', 8, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/waskie-pompki'],
  ['Pompki na poręczach z gumą', 'triceps', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/triceps/pompki-na-poreczach-z-guma'],
  ['Prostowanie ramion z hantlami za siebie w opadzie tułowia', 'triceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-ramion-z-hantlami-za-siebie'],
  ['Prostowanie ramion leżąc na ławce z użyciem wyciągu górnego', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-ramion-lezac-na-lawce'],
  ['Pompki w podporze tyłem na ławeczce (Bench dips)', 'triceps', 'bodyweight', 'compound', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/pompki-w-podporze-tylem-na-laweczce-bench'],
  ['Pompki na triceps na poręczach (Dips – triceps version)', 'triceps', 'bodyweight', 'compound', 6, 12, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/pompki-na-triceps-na-poreczach-dips'],
  ['Pompki w oparciu o sztangę wąskim chwytem', 'triceps', 'barbell', 'compound', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/pompki-w-oparciu-o-sztange-waskim'],
  ['Prostowanie przedramienia w pionie ze sztangielką', 'triceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramienia-w-pionie-ze-sztangielka'],
  ['Prostowanie przedramion w pionie ze sztangą oburącz', 'triceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-w-pionie-ze-sztanga'],
  ['Prostowanie przedramion w pionie ze sztangielką oburącz', 'triceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-w-pionie-ze-sztangielka'],
  ['Prostowanie przedramion z gryfem łamanym nachwytem z wyciągu', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-z-gryfem-lamanym-trzymanym'],
  ['Prostowanie przedramion z gryfem prostym nachwytem z wyciągu', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-z-gryfem-prostym-trzymanym'],
  ['Prostowanie przedramion z liną z wyciągu dolnego stojąc', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-z-lina-z-wyciagu'],
  ['Prostowanie przedramion ze sztangą łamaną leżąc (Skull crusher)', 'triceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-ze-sztanga-lamana-lezac'],
  ['Prostowanie przedramion ze sztangielką oburącz siedząc', 'triceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-przedramion-ze-sztangielka-trzymana-oburacz'],
  ['Prostowanie ramienia jednorącz z wyciągu dolnego stojąc', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-ramienia-jednoracz-z-wyciagu-dolnego'],
  ['Prostowanie ramienia z wyciągu górnego', 'triceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-ramienia-z-wykorzystaniem-wyciagu-gornego'],
  ['Prostowanie ramion na maszynie triceps', 'triceps', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-ramion-na-maszynie-triceps-machine'],
  ['Prostowanie ramion z gryfem podchwytem z wyciągu górnego', 'triceps', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/prostowanie-ramion-z-gryfem-trzymanym-podchwytem'],
  ['Wąskie pompki na triceps (Diamentowe pompki)', 'triceps', 'bodyweight', 'compound', 8, 15, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/waskie-pompki-na-triceps-diamentowe-pompki'],
  ['Wyciskanie sztangi łamanej wąskim chwytem na ławce płaskiej', 'triceps', 'barbell', 'compound', 6, 10, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/wyciskanie-sztangi-lamanej-waskim-chwytem'],
  ['Wyciskanie sztangi na suwnicy Smitha wąskim chwytem na triceps', 'triceps', 'machine', 'compound', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-triceps/wyciskanie-sztangi-na-suwnicy-smitha-waskim'],

  // ============ BICEPS ============
  ['Uginanie ramion z gumą', 'biceps', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/uginanie-ramion-z-guma'],
  ['Zginanie ramion ze sztangą nachwytem', 'biceps', 'barbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/zginanie-ramion-ze-sztanga-nachwytem'],
  ['Uginanie ramion na TRX', 'biceps', 'bodyweight', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/uginanie-ramion-na-trx'],
  ['Uginanie ramion z hantlami nachwytem', 'biceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/uginanie-ramion-z-hantlami-nachwytem'],
  ['Uginanie ramion z hantlami w oparciu o ławeczkę (Spider curl)', 'biceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/uginanie-ramion-z-hantlami-w-oparciu-o-laweczke'],
  ['Uginanie ramion ze sztangą w oparciu o ławeczkę', 'biceps', 'barbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/uginanie-ramion-ze-sztanga-w-oparciu-o-laweczke'],
  ['Zginanie ramion z hantlami na modlitewniku chwytem młotkowym', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/zginanie-ramion-z-hantlami-na-modlitewniku-chwytem-mlotkowym'],
  ['Uginanie ramienia z linką wyciągu dolnego stojąc', 'biceps', 'cable', 'isolation', 12, 15, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/uginanie-ramienia-z-linka-wyciagu-dolnego-stojac'],
  ['Zginanie ramion z hantlami na modlitewniku', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/zginanie-ramion-z-hantlami-na-modlitewniku'],
  ['Zottman curl', 'biceps', 'dumbbell', 'isolation', 10, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/zottman-curl'],
  ['Uginanie ramion z hantlami z rotacją (Supinated biceps curl)', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/atlas-cwiczen/biceps/uginanie-ramion-z-hantlami-z-rotacja'],
  ['Zginanie przedramienia z hantlem na modlitewniku', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramienia-z-hantlem-na-modlitewniku'],
  ['Zginanie przedramion w wąskim chwycie ze sztangą stojąc', 'biceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-w-waskim-chwycie'],
  ['Jednoczesne zginanie przedramion stojąc z wyciągów górnych', 'biceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/jednoczesne-zginanie-przedramion-stojac-z-wykorzystaniem'],
  ['Zginanie przedramion z drążkiem wyciągu dolnego na modlitewniku', 'biceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-drazkiem-wyciagu-dolnego'],
  ['Zginanie przedramion z gryfem wyciągu górnego leżąc', 'biceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-gryfem-wyciagu-gornego'],
  ['Zginanie przedramion z hantlami w chwycie młotkowym (Hammer curl)', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-hantlami-w-chwycie'],
  ['Zginanie przedramion w chwycie młotkowym siedząc na ławce', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-w-chwycie-mlotkowym-siedzac'],
  ['Zginanie przedramion z gryfem łamanym na modlitewniku', 'biceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-gryfem-lamanym'],
  ['Zginanie przedramion na zewnątrz siedząc na ławce 75 stopni', 'biceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-na-zewnatrz-siedzac'],
  ['Zginanie przedramion z liną z wyciągu dolnego stojąc', 'biceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-lina-z-wyciagu'],
  ['Zginanie przedramion ze sztangą łamaną stojąc', 'biceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-ze-sztanga-lamana-stojac'],
  ['Zginanie przedramion z hantlem w opadzie tułowia', 'biceps', 'dumbbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-hantlem-w-opadzie'],
  ['Zginanie przedramienia z hantlem – łokieć oparty na udzie (Concentration curl)', 'biceps', 'dumbbell', 'isolation', 10, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramienia-z-hantlem-lokiec'],
  ['Zginanie przedramion z hantlami z rotacją siedząc na ławce 90 stopni', 'biceps', 'dumbbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-hantlami-z-rotacja'],
  ['Zginanie przedramion z drążkiem wyciągu dolnego stojąc', 'biceps', 'cable', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-z-drazkiem-wyciagu-dolnego-2'],
  ['Zginanie przedramion ze sztangą stojąc (Barbell biceps curl)', 'biceps', 'barbell', 'isolation', 8, 12, 'https://www.fabrykasily.pl/cwiczenia/na-biceps/zginanie-przedramion-ze-sztanga-stojac-barbell'],

  // ============ ŁYDKI ============
  ['Wspięcia na palce jednonóż', 'łydki', 'bodyweight', 'isolation', 15, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/lydki/wspiecia-na-palce-jednonoz'],
  ['Wspięcia na palce jednonóż z hantlami', 'łydki', 'dumbbell', 'isolation', 12, 20, 'https://www.fabrykasily.pl/atlas-cwiczen/lydki/wspiecia-na-palce-jednonoz-z-hantlami'],
  ['Wspięcia na palcach siedząc ze sztangą na kolanach', 'łydki', 'barbell', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-w-pozycji-siedzacej'],
  ['Wspięcia na palcach na suwnicy (Leg press calf raise)', 'łydki', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-na-suwnicy-calf'],
  ['Wspięcia na palcach siedząc z użyciem sztangielki', 'łydki', 'dumbbell', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-siedzac-z-uzyciem'],
  ['Wspięcia na palcach stojąc z hantlą (Dumbbell calf raise)', 'łydki', 'dumbbell', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-stojac-z-hantlami'],
  ['Wspięcia na palcach stojąc na suwnicy Smitha', 'łydki', 'machine', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-stojac-z-wykorzystaniem-2'],
  ['Wspięcia na palcach stojąc ze sztangą na plecach (Standing barbell calf raise)', 'łydki', 'barbell', 'isolation', 10, 15, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-stojac-ze-sztanga'],
  ['Wspięcia na palcach siedząc na maszynie (Seated calf raise machine)', 'łydki', 'machine', 'isolation', 12, 20, 'https://www.fabrykasily.pl/cwiczenia/na-lydki/wspiecia-na-palcach-siedzac-na-maszynie']
];

const EX = fsRaw.map((d, i) => ({
  id: 'fs-' + i,
  name: d[0],
  m: d[1],
  eq: d[2],
  t: d[3],
  rr: [d[4], d[5]],
  unit: d[4] >= 30 && d[1] === 'core' && d[0].toLowerCase().includes('deska') || d[0].toLowerCase().includes('spacer') || d[0].toLowerCase().includes('zwis') ? 's' : 'powt',
  url: d[6]
}));

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
          <a href={exercise.url} target="_blank" rel="noopener noreferrer" className="bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between hover:border-red-500 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-red-600 flex items-center justify-center rounded-sm"><Play size={14} fill="white" stroke="white"/></div>
              <div>
                <div className="font-display uppercase text-base">Zobacz instruktaż</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Wideo z Fabryki Siły</div>
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

// ============================================================
// WORKOUT VIEW
// ============================================================
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

  if (!workout.exercises || workout.exercises.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-5 flex flex-col items-center justify-center text-center">
        <h2 className="font-display text-2xl mb-4 text-red-500">Pusty trening!</h2>
        <p className="text-neutral-500 mb-8">Generator nie znalazł odpowiednich ćwiczeń dla Twojego dostępnego sprzętu (np. masz wybrane tylko "Masa ciała").</p>
        <Btn onClick={onCancel}>Wróć do menu</Btn>
      </div>
    );
  }

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
      {/* GÓRNY PASEK POSTĘPU */}
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

      {/* WIDOK KÓŁEK Z ĆWICZENIAMI U GÓRY */}
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
          return (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className="w-full text-left border border-neutral-800 p-3 hover:border-[#d4ff00]/40 active:scale-[0.99] transition-all"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-body text-sm text-white truncate flex-1">{e.name}</h3>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[9px] font-mono text-[#d4ff00] uppercase">WIDEO</span>
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

  const handleSwapExercise = (exIdx, newEx) => {
    if (!active || !plan) return;
    
    const workoutIdx = active.workoutIdx;
    
    const updatedPlan = [...plan];
    const updatedWorkout = { ...updatedPlan[workoutIdx] };
    const updatedExercises = [...updatedWorkout.exercises];
    
    const oldSetsCount = updatedExercises[exIdx]?.sets || 3;
    updatedExercises[exIdx] = { ...newEx, sets: oldSetsCount };
    
    updatedWorkout.exercises = updatedExercises;
    updatedPlan[workoutIdx] = updatedWorkout;
    
    setPlan(updatedPlan);
    saveOne(KEY_PLAN, updatedPlan);
  };

  const finishWorkout = () => {
    if (!active) return;
    const session = {
      sessionId: active.sessionId,
      workoutName: active.workoutName,
      date: active.date,
      exercises: active.exercises,
    };
    
    const newHistory = { ...history };
    active.exercises.forEach((e) => {
      if (!newHistory[e.exerciseId]) newHistory[e.exerciseId] = [];
      newHistory[e.exerciseId] = [...newHistory[e.exerciseId], { date: session.date, sessionId: session.sessionId, workoutName: session.workoutName, sets: e.sets }];
    });
    
    setHistory(newHistory);
    saveOne(KEY_HISTORY, newHistory);
    setActive(null);
    saveOne(KEY_ACTIVE, null);
    
    // Zmiana: Powrót do ekranu głównego
    setView('home');
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
          onSwapExercise={handleSwapExercise}
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
