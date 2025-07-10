const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8188319392:AAEQmB_Dhu-x4GQAay-4Ar3XCke4G78_GnY'; 

const bot = new TelegramBot(TOKEN);

module.exports = async (req, res) => {
  try {
    if (req.body) {
      bot.processUpdate(req.body); 
    }
    res.status(200).send('OK'); 
  } catch (error) {
    console.error('Error while processing update:', error);
    res.status(500).send('Error');
  }
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! I'm your bot. Please send me a document to get a direct download link.");
});


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const document = msg.document;
  const text = msg.text; 
 
  if (document) {
    const fileId = document.file_id;
    bot.getFileLink(fileId).then((link) => {
      bot.sendMessage(chatId, `Direct download link: ${link}`); 
    }).catch((error) => {
      console.error("Error while retrieving file link:", error);
      bot.sendMessage(chatId, "Sorry, I couldn't get the file link. Please try again later.");
    });
  } else if (text && text.startsWith('/')) {
   
    console.log(`Received a command: ${text}`);
  } else if (text) {
   
    console.log(`Received text message from chat ${chatId}: ${text}`);
    bot.sendMessage(chatId, 'I only process documents. Please send a document to get a direct download link.');
  } else {
 
    console.log(`Received non-text/non-document message from chat ${chatId}`);
    bot.sendMessage(chatId, 'Please send a document to get a direct download link.');
  }
});

console.log('Bot is running...');
