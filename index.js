const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_API_TOKEN';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const document = msg.document;

  if (document) {
    const fileId = document.file_id;
    bot.getFileLink(fileId).then((link) => {
      bot.sendMessage(chatId, Direct download link: ${link});
    });
  } else {
    bot.sendMessage(chatId, 'Please send a document to get a direct download link.');
  }
});
