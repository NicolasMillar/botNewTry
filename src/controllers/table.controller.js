const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/database.txt');

function parseTableData(content) {
    const lines = content.split('\n').slice(3); // Omitir las primeras 3 líneas (encabezado)
    const table = [];

    for (const line of lines) {
        const match = line.match(/\|\s*(\w+)\s*\|\s*(\d+)\s*\|/);
        if (match) {
            table.push({ name: match[1], count: parseInt(match[2], 10) });
        }
    }

    return table;
}

function getTable() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error al leer la base de datos.');
                return;
            }

            const table = parseTableData(data);
            if (table.length === 0) {
                resolve('No hay datos disponibles.');
                return;
            }

            let formattedTable = '```\nNombre      | Conteo Total\n' + 
                                 '------------|--------------\n';
            formattedTable += table.map(row => `${row.name.padEnd(12)} | ${row.count}`).join('\n');
            formattedTable += '\n```';

            resolve(formattedTable);
        });
    });
}

function incrementCount(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error al leer la base de datos.');
                return;
            }

            let table = parseTableData(data);
            let updated = false;
            
            table = table.map(row => {
                if (row.name.toLowerCase() === name.toLowerCase()) {
                    row.count += 1;
                    updated = true;
                }
                return row;
            });

            if (!updated) {
                reject('Nombre no encontrado en la base de datos.');
                return;
            }

            let newContent = '| Nombre     | Conteo Total |\n| ---------- | ------------ |\n';
            newContent += table.map(row => `| ${row.name.padEnd(10)} | ${String(row.count).padStart(10)} |`).join('\n');
            newContent += '\n';

            fs.writeFile(filePath, newContent, 'utf8', (err) => {
                if (err) {
                    reject('Error al escribir en la base de datos.');
                    return;
                }
                resolve(`Se ha incrementado el conteo de ${name}.`);
            });
        });
    });
}

module.exports = { getTable, incrementCount };

