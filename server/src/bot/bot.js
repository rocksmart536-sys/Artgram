import { Bot } from 'grammy'

export function startBot() {
  if (!process.env.BOT_TOKEN) return console.warn('BOT_TOKEN absent : bot désactivé')
  const bot = new Bot(process.env.BOT_TOKEN)
  bot.command('start', ctx =>
    ctx.reply('Bienvenue sur Artgram 🎨', {
      reply_markup: { inline_keyboard: [[{ text: 'Ouvrir Artgram', web_app: { url: process.env.WEBAPP_URL } }]] },
    }))
  bot.start()
}
