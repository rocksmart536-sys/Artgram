# Artrgram

Mini-application Telegram pour artistes, dessinateurs et illustrateurs : publier ses oeuvres, recevoir des likes et des commentaires, s'abonner aux pages des artistes.

Stack prevue : Node.js + Express, grammY (bot Telegram), PostgreSQL sur Railway, React + Vite (Telegram Mini App), stockage d'images (Cloudinary ou S3/R2).

## Structure

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
