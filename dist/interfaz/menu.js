import inquirer from "inquirer";
import { addBien, getBienes, initDB } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
async function main() {
    await initDB();
    const respuesta = await inquirer.prompt([
        { type: "list", name: "opcion", message: "¿Qué deseas hacer?", choices: ["Agregar bien", "Ver bienes", "Salir"] }
    ]);
    if (respuesta.opcion === "Agregar bien") {
        const nuevoBien = await inquirer.prompt([
            { type: "input", name: "id", message: "ID del bien:" },
            { type: "input", name: "nombre", message: "Nombre del bien:" },
            { type: "input", name: "descripcion", message: "Descripción del bien:" },
            { type: "input", name: "material", message: "Material:" },
            { type: "number", name: "peso", message: "Peso (kg):" },
            { type: "number", name: "valor", message: "Valor en coronas:" }
        ]);
        await addBien(new Bien(nuevoBien.id, nuevoBien.nombre, nuevoBien.descripcion, nuevoBien.material, nuevoBien.peso, nuevoBien.valor));
        console.log("Bien agregado exitosamente.");
    }
    else if (respuesta.opcion === "Ver bienes") {
        const bienes = await getBienes();
        console.log("Lista de bienes disponibles:");
        bienes.forEach((bien) => console.log(bien.mostrarInfo()));
    }
    if (respuesta.opcion !== "Salir")
        main();
}
main();
