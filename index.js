const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const puns = {
  cat: 'I’m feline good!',
  fish: 'You’ve got to be squidding me!',
  ghost: 'That’s a little bit spooky!',
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  console.log('Message content:', message.content); // Log only the content
  if (message.author.bot) return;

  const messageContent = message.content.toLowerCase();
  const foundKey = Object.keys(puns).find((key) =>
    messageContent.includes(key)
  );

  if (foundKey) {
    message
      .reply(puns[foundKey])
      .catch((error) => console.error('Error sending reply:', error));
  }
});

client.login(process.env.BOT_TOKEN);
