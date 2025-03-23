// File: Mercader.ts
// Importamos la clase Bien
import { Bien } from "./Bien.js";
/**
 * Clase Mercader
*/
export class Mercader {
    id;
    nombre;
    tipo;
    ubicacion;
    dinero;
    bienes;
    /**
     * Constructor de la clase Mercader
     * @param id - Identificador del mercader
     * @param nombre - Nombre del mercader
     * @param tipo - Tipo de mercader
     * @param ubicacion - Ubicación del mercader
     * @param dinero - Dinero del mercader
     * @param bienes - Bienes del mercader
    */
    constructor(id, nombre, tipo, ubicacion, dinero, bienes) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
        this.dinero = dinero;
        this.bienes = bienes;
    }
    /**
     * Muestra la información del mercader
     * @returns - Información del mercader
     */
    mostrarInfo() {
        const bienesInfo = this.bienes.map(bien => bien.toString()).join(", ");
        return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion} - Bienes: [${bienesInfo}]`;
    }
    /**
     * Obtiene el dinero del mercader
     * @returns - Dinero del mercader
     */
    getDinero() {
        return this.dinero;
    }
    /**
     * Muestra el dinero del mercader
     */
    MuestraDinero() {
        if (this.dinero > 10) {
            console.log(`Tengo suficiente dinero: ${this.dinero} coronas`);
        }
        else {
            console.log(`Estoy pobre! Por favor, comprad mis bienes!`);
        }
    }
    /**
     * Método estático que crea un objeto Mercader a partir de un objeto
     * @param mercaderData - Objeto con los datos del mercader
     * @returns - Objeto Mercader
     */
    static fromObject(mercaderData) {
        return new Mercader(mercaderData.id, mercaderData.nombre, mercaderData.tipo, mercaderData.ubicacion, mercaderData.dinero, mercaderData.bienes.map((bien) => Bien.fromObject(bien)) // Usamos fromObject para los bienes
        );
    }
    /**
     * Identificarse muestra un mensaje con el nombre del mercader
     */
    Identificarse() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}
