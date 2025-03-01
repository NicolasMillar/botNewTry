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

const aumentarConteo = (nombre) => {
    const rawData = fs.readFileSync(dataPath);
    const datos = JSON.parse(rawData);

    if (datos.hasOwnProperty(nombre)) {
        datos[nombre] += 1;
        fs.writeFileSync(dataPath, JSON.stringify(datos, null, 2));
        return {
            exito: true,
            nuevoConteo: datos[nombre],
        };
    } else {
        return {
            exito: false,
            mensaje: `El nombre "${nombre}" no existe en la lista.`,
        };
    }
};

module.exports = {
    generarTabla,
    aumentarConteo,
};