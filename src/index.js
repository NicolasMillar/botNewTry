const { Client, GatewayIntentBits } = require('discord.js');
const { getTable, incrementCount } = require('./controllers/table.controller');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!table') {
        try {
            const tableMessage = await getTable();
            message.channel.send(tableMessage);
        } catch (error) {
            message.channel.send('Hubo un error al obtener la tabla.');
        }
    } else if (message.content.startsWith('!wekitoDelDia')) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.channel.send('Debes proporcionar un nombre.');
        }
        const name = args[1];
        try {
            await incrementCount(name);
            message.channel.send(`Se ha actualizado el contador de ${name}.`);
        } catch (error) {
            message.channel.send(error);
        }
    }
});

client.login(process.env.TOKEN);
