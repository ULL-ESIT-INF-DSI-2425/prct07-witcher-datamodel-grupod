import { Bien } from "./Bien.js";
/**
 * Clase Cliente
*/
export declare class Cliente {
    id: string;
    nombre: string;
    raza: string;
    ubicacion: string;
    dinero: number;
    bienes: Bien[];
    /**
     * Constructor de la clase Cliente
     * @param id - Identificador del cliente
     * @param nombre - Nombre del cliente
     * @param raza - Raza del cliente
     * @param ubicacion - Ubicación del cliente
     * @param dinero - Dinero del cliente
     * @param bienes - Bienes del cliente
     */
    constructor(id: string, nombre: string, raza: string, ubicacion: string, dinero: number, bienes: Bien[]);
    /**
     * Muestra la información del cliente
     * @returns - Información del cliente
     */
    mostrarInfo(): string;
    /**
     * FromObject convierte un objeto en un objeto de la clase Cliente
     * @param clienteData - Objeto con los datos del cliente
     * @returns - Objeto Cliente
     */
    static fromObject(clienteData: any): Cliente;
}
