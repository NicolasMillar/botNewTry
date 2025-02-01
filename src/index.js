const { Client, GatewayIntentBits } = require('discord.js');
const { getTable, incrementCount } = require('./controllers/tableController');
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
    }

    else if(message.content === '!wekitoDelDia'){
        
    }
});

client.login(process.env.TOKEN);
