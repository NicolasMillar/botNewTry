require('dotenv').config();
const { Client, Intents } = require('discord.js');
const wekitosController = require('./wekitosController');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN) {
    console.error('No se ha proporcionado un token de Discord. Asegúrate de configurar el archivo .env.');
    process.exit(1);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!tabla')) {
        const tabla = wekitosController.generarTabla();
        message.channel.send(tabla);
    }
});

client.login(TOKEN);