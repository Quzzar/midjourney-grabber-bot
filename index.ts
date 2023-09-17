import { Client, Events, GatewayIntentBits, Interaction, MessagePayload, TextChannel } from 'discord.js';
const { token, midjourney_bot_id, interaction_channel_id } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let mockInteraction: Interaction | null = null;

client.once(Events.ClientReady, c => {
  sendImagineCommand();
  setInterval(sendImagineCommand, 3600);
});

client.on(Events.MessageCreate, m => {
  if(m.author.id !== midjourney_bot_id) return;
  console.log(m.attachments.map(a => a.proxyURL));
	// for(const c_1 of m.components) {
  //   for(const c_2 of c_1.components) {
  //     //@
  //     console.log(c_2.url);
  //   }
  // }
  // client.emit(Events.InteractionCreate, );
});

// Log in to Discord with your client's token
client.login(token);

function sendImagineCommand() {
  const findValidTextChannel = () => {
    const channel = client.channels.cache.find(c => c.isTextBased() && c.id === interaction_channel_id);
    if(!channel) throw new Error('No valid text channel found');
    return channel as TextChannel;
  }

  const channel = findValidTextChannel();
  channel.send(MessagePayload.create(channel, '/imagine testing'));
}
