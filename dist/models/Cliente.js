// File: Cliente.ts
// Importamos la clase Bien
import { Bien } from "./Bien.js";
/**
 * Clase Cliente
*/
export class Cliente {
    id;
    nombre;
    raza;
    ubicacion;
    dinero;
    bienes;
    /**
     * Constructor de la clase Cliente
     * @param id - Identificador del cliente
     * @param nombre - Nombre del cliente
     * @param raza - Raza del cliente
     * @param ubicacion - Ubicación del cliente
     * @param dinero - Dinero del cliente
     * @param bienes - Bienes del cliente
     */
    constructor(id, nombre, raza, ubicacion, dinero, bienes) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.ubicacion = ubicacion;
        this.dinero = dinero;
        this.bienes = bienes;
    }
    /**
     * Muestra la información del cliente
     * @returns - Información del cliente
     */
    mostrarInfo() {
        const bienesInfo = this.bienes.map(bien => bien.toString()).join(", ");
        return `${this.nombre} (${this.raza}) - Ubicación: ${this.ubicacion} - Bienes: [${bienesInfo}]`;
    }
    /**
     * FromObject convierte un objeto en un objeto de la clase Cliente
     * @param clienteData - Objeto con los datos del cliente
     * @returns - Objeto Cliente
     */
    static fromObject(clienteData) {
        return new Cliente(clienteData.id, clienteData.nombre, clienteData.raza, clienteData.ubicacion, clienteData.dinero, clienteData.bienes.map((bien) => Bien.fromObject(bien)) // Usamos fromObject para los bienes
        );
    }
}
