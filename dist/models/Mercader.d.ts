import { Bien } from "./Bien.js";
import { Identificable } from "./Identificable.js";
import { Clasismo } from "./Clasismo.js";
/**
 * Clase Mercader
*/
export declare class Mercader implements Identificable, Clasismo {
    id: string;
    nombre: string;
    tipo: string;
    ubicacion: string;
    dinero: number;
    bienes: Bien[];
    /**
     * Constructor de la clase Mercader
     * @param id - Identificador del mercader
     * @param nombre - Nombre del mercader
     * @param tipo - Tipo de mercader
     * @param ubicacion - Ubicación del mercader
     * @param dinero - Dinero del mercader
     * @param bienes - Bienes del mercader
    */
    constructor(id: string, nombre: string, tipo: string, ubicacion: string, dinero: number, bienes: Bien[]);
    /**
     * Muestra la información del mercader
     * @returns - Información del mercader
     */
    mostrarInfo(): string;
    /**
     * Obtiene el dinero del mercader
     * @returns - Dinero del mercader
     */
    getDinero(): number;
    /**
     * Muestra el dinero del mercader
     */
    MuestraDinero(): void;
    /**
     * Método estático que crea un objeto Mercader a partir de un objeto
     * @param mercaderData - Objeto con los datos del mercader
     * @returns - Objeto Mercader
     */
    static fromObject(mercaderData: any): Mercader;
    /**
     * Identificarse muestra un mensaje con el nombre del mercader
     */
    Identificarse(): void;
}
