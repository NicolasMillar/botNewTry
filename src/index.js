// index.js
require('dotenv').config(); // Cargar variables de entorno desde .env
const { Client, Intents } = require('discord.js');
const wekitosController = require('./controllers/wekitosController');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const TOKEN = process.env.DISCORD_TOKEN; // Leer el token desde .env

if (!TOKEN) {
    console.error('No se ha proporcionado un token de Discord. Asegúrate de configurar el archivo .env.');
    process.exit(1); // Detener la ejecución si no hay token
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

    if (message.content.startsWith('!add')) {
        const nombre = message.content.match(/!add\("([^"]+)"\)/)?.[1]; // Extraer el nombre del comando
        if (!nombre) {
            message.channel.send('Formato incorrecto. Usa: !add("nombre")');
            return;
        }

        const resultado = wekitosController.aumentarConteo(nombre);
        if (resultado.exito) {
            message.channel.send(`El conteo de ${nombre} ha sido aumentado a ${resultado.nuevoConteo}.`);
        } else {
            message.channel.send(resultado.mensaje);
        }
    }
});

client.login(TOKEN);