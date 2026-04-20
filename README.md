# PROGRES

Tracker treningowy z bazą 224 ćwiczeń, generatorem planu, edytorem custom planów i auto-regulacją ciężaru opartą o RIR.

## Wymagania

- [Node.js](https://nodejs.org) wersja 18 lub nowsza
- [Git](https://git-scm.com)
- Konto na [GitHub](https://github.com)

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod `http://localhost:5173`.

Build produkcyjny:

```bash
npm run build
npm run preview
```

## Deploy na GitHub Pages

### Krok 1 — Utwórz repozytorium na GitHubie

1. Wejdź na https://github.com/new
2. Nazwij repo np. `progres` (zapamiętaj nazwę)
3. Zostaw **Public** (GitHub Pages za darmo działa tylko dla publicznych repo na darmowym koncie)
4. **Nie** dodawaj README, .gitignore ani licencji (mamy już swoje)
5. Kliknij **Create repository**

### Krok 2 — Wgraj kod

W terminalu, w folderze tego projektu:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TWOJA_NAZWA/progres.git
git push -u origin main
```

(Zamień `TWOJA_NAZWA` na swój login GitHub.)

### Krok 3 — Włącz GitHub Pages

1. Na GitHubie wejdź w swoje repo → **Settings** → **Pages** (lewe menu)
2. W sekcji **Build and deployment** → **Source**: wybierz **GitHub Actions**
3. Nic więcej nie klikaj — workflow z `.github/workflows/deploy.yml` zrobi resztę

### Krok 4 — Poczekaj na deploy

1. Wejdź w zakładkę **Actions** w repo
2. Zobacz workflow "Deploy to GitHub Pages" — pierwszy build trwa ~2 minuty
3. Gdy się skończy (zielony ✓), aplikacja będzie pod adresem:

```
https://TWOJA_NAZWA.github.io/progres/
```

Każdy kolejny `git push` na branch `main` automatycznie odpali deploy.

## Alternatywa — Vercel / Netlify

Jeśli wolisz prostszy deploy:

- **Vercel**: wejdź na https://vercel.com → Import Git Repository → wybierz repo → Deploy. Wszystko wykryje samo.
- **Netlify**: https://app.netlify.com → Add new site → Import existing project → wybierz repo → Deploy.

## Dane

Wszystkie dane (profil, plan, historia treningów) zapisywane są **lokalnie** w `localStorage` przeglądarki. Nic nie idzie na żaden serwer.

Czyszczenie danych: w aplikacji → Ustawienia → Resetuj aplikację.

## Struktura

```
src/
  App.jsx        — cała aplikacja (komponenty, logika, baza ćwiczeń)
  main.jsx       — entry point
  index.css      — Tailwind + style globalne
index.html       — HTML root
vite.config.js   — konfiguracja buildu
.github/workflows/deploy.yml  — auto-deploy na GH Pages
```

## Customizacja

- **Baza ćwiczeń**: edytuj tablicę `EX` na początku `src/App.jsx`
- **Opisy techniczne**: `DESC` (mapa `id ćwiczenia → opis`)
- **Algorytm progresji**: funkcja `getRecommendation`
- **Schematy splitów**: stała `splits` wewnątrz `generatePlan`
- **Kolor akcentu**: szukaj `#d4ff00` (limonkowo-żółty) w kodzie
