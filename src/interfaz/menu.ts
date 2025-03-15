import inquirer from "inquirer"; // Importa la librería inquirer para interactuar con el usuario a través de la consola
import { initDB } from "../base_datos/database.js"; // Importa la función para inicializar la base de datos
import { añadirBien, listarBienes } from "../services/Inventario.js"; // Importa las funciones para añadir y listar bienes del inventario
import { Bien } from "../models/Bien.js"; // Importa la clase Bien que representa un bien en el inventario

async function main() {
    await initDB(); // Inicializa la base de datos

    // Pregunta al usuario qué acción desea realizar
    const respuesta = await inquirer.prompt([
        { type: "list", name: "opcion", message: "¿Qué deseas hacer?", choices: ["Agregar bien", "Ver bienes", "Salir"] }
    ]);

    if (respuesta.opcion === "Añadir bien") {
        // Si el usuario elige "Añadir bien", se le pide que ingrese los detalles del nuevo bien
        const nuevoBien = await inquirer.prompt([
            { type: "input", name: "id", message: "ID del bien:" },
            { type: "input", name: "nombre", message: "Nombre del bien:" },
            { type: "input", name: "descripcion", message: "Descripción del bien:" },
            { type: "input", name: "material", message: "Material:" },
            { type: "number", name: "peso", message: "Peso (kg):" },
            { type: "number", name: "valor", message: "Valor en coronas:" }
        ]);
        
        // Crea una nueva instancia de Bien con los datos ingresados y la añade al inventario
        await añadirBien(new Bien(nuevoBien.id, nuevoBien.nombre, nuevoBien.descripcion, nuevoBien.material, nuevoBien.peso, nuevoBien.valor));
        console.log("Bien agregado exitosamente.");
    } else if (respuesta.opcion === "Ver bienes") {
        // Si el usuario elige "Ver bienes", se obtiene la lista de bienes del inventario y se muestra en la consola
        const bienes = await listarBienes();
        console.log("Lista de bienes disponibles:");
        bienes.forEach((bien) => console.log(bien.mostrarInfo()));
    }

    // Si el usuario no elige "Salir", se vuelve a ejecutar la función main para permitir más acciones
    if (respuesta.opcion !== "Salir") main();
}

main(); // Ejecuta la función principal