# Artrgram

Mini-application Telegram pour artistes, dessinateurs et illustrateurs : publier ses oeuvres, recevoir des likes et des commentaires, s'abonner aux pages des artistes.

**Stack prevue** : Node.js + Express, grammY (bot Telegram), PostgreSQL sur Railway, React + Vite (Telegram Mini App), stockage d'images (Cloudinary ou S3/R2).

## Structure

```
artrgram/
├── server/            API Express + bot Telegram
│   └── src/
│       ├── config/        variables d'environnement, constantes
│       ├── db/            pool pg, migrations SQL, seed
│       ├── routes/        routes /api/*
│       ├── controllers/   logique des handlers
│       ├── middleware/    auth, upload, rate-limit, erreurs
│       ├── services/      stockage, fil, notifications, moderation
│       ├── bot/           commandes et menu du bot
│       └── utils/
├── web/               Mini App (React + Vite)
│   └── src/ pages, components, hooks, api, styles
├── docs/              architecture, base de donnees, API, roadmap
├── .env.example
├── railway.json
└── package.json
```

Chaque fichier contient pour l'instant un commentaire `TODO` : il n'y a pas de code de fonctionnalite, tu les remplis un par un.

## Ce que tu dois faire

### 1. Creer le bot Telegram
1. Ouvre [@BotFather](https://t.me/BotFather) -> `/newbot` -> recupere le **BOT_TOKEN**.
2. `/setdescription`, `/setuserpic`, `/setcommands` (start, help, profil).
3. Plus tard (apres le deploiement) : `/newapp` ou `/setmenubutton` avec l'URL Railway pour ouvrir la Mini App.

### 2. Creer le projet sur Railway
1. Nouveau projet -> **Deploy from GitHub repo** (apres le push).
2. Ajouter le service **PostgreSQL** et copier `DATABASE_URL`.
3. Dans les variables du service web, renseigner toutes les variables de `.env.example`.
4. Generer un domaine public (Settings -> Networking) et le mettre dans `APP_URL`.

### 3. Choisir le stockage des images
Railway n'a pas de disque persistant fiable pour des images : utilise Cloudinary, ou un bucket S3 / Cloudflare R2, et remplis les variables `STORAGE_PROVIDER` et associees.

### 4. Lancer en local
```bash
cp .env.example .env      # puis remplir
npm run install:all
npm run migrate
npm run dev:server        # terminal 1
npm run dev:web           # terminal 2
```
Pour tester dans Telegram en local, expose le front avec un tunnel HTTPS (ngrok, cloudflared) car les Mini Apps exigent HTTPS.

### 5. Pousser sur GitHub
```bash
git init
git add .
git commit -m "Initial skeleton"
git branch -M main
git remote add origin https://github.com/TON_USER/artrgram.git
git push -u origin main
```

### 6. Ordre de dev conseille
1. `server/src/config/env.js`, `db/pool.js`, `db/migrate.js`, `migrations/001_init.sql`
2. `index.js`, `app.js` -> route de test `/api/health`
3. `middleware/telegramAuth.js` + `routes/auth` (connexion par initData)
4. `bot/*` (commande /start + bouton Web App)
5. `services/storage.service.js` + `routes/artworks` (publier)
6. `routes/feed`, `likes`, `comments`, `follows`
7. Front : `useTelegram`, `useAuth`, puis pages Home, Upload, Profile, ArtworkDetail
8. Notifications, recherche, moderation (voir `docs/ROADMAP.md`)

## Securite (a ne pas oublier)
- Toujours valider `initData` cote serveur, ne jamais faire confiance a l'ID envoye par le client.
- Ne jamais commiter `.env`.
- Limiter la taille/type des images et le debit des publications.
- Prevoir un signalement de contenu et la possibilite de supprimer une oeuvre.

## Licence
A definir.
