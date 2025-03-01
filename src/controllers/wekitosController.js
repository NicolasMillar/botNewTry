const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/wekitos.json');

const generarTabla = () => {

    const rawData = fs.readFileSync(dataPath);
    const datos = JSON.parse(rawData);

    let tabla = "```\n";
    tabla += "| Nombre     | Conteo Total |\n";
    tabla += "| ---------- | ------------ |\n";

    Object.entries(datos).forEach(([nombre, conteoTotal]) => {
        tabla += `| ${nombre.padEnd(10)} | ${conteoTotal.toString().padStart(12)} |\n`;
    });

    tabla += "```";

    return tabla;
};

module.exports = {
    generarTabla,
};