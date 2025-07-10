const TelegramBot = require('node-telegram-bot-api');

const token = '8188319392:AAEQmB_Dhu-x4GQAay-4Ar3XCke4G78_GnY'; 

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const document = msg.document;

  if (document) {
    const fileId = document.file_id;
    bot.getFileLink(fileId).then((link) => {
     
      bot.sendMessage(chatId, `Direct download link: ${link}`); 
    }).catch((error) => {
      console.error("Error getting file link:", error);
      bot.sendMessage(chatId, "Sorry, I couldn't get the file link. Please try again later.");
    });
  } else {
    bot.sendMessage(chatId, 'Please send a document to get a direct download link.');
  }
});


console.log('Bot is running...');
