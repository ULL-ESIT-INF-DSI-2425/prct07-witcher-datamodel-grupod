/**
 * Clase Bien
 *
 */
export declare class Bien {
    id: string;
    nombre: string;
    descripcion: string;
    material: string;
    peso: number;
    valor: number;
    /**
     * Constructor de la clase Bien
     * @param id - Identificador del bien
     * @param nombre - Nombre del bien
     * @param descripcion - Descripción del bien
     * @param material - Material del bien
     * @param peso - Peso del bien
     * @param valor - Valor del bien
     */
    constructor(id: string, nombre: string, descripcion: string, material: string, peso: number, valor: number);
    /**
     * Muestra la información del bien
     * @returns - Información del bien
     */
    mostrarInfo(): string;
    /**
     * Obtiene el nombre del bien
     * @returns - Nombre del bien
     */
    getNombre(): string;
    /**
     * Obtiene el material del bien
     * @returns - Material del bien
     */
    toString(): string;
    /**
     * Método estático que crea un objeto Bien a partir de un objeto
     * @param bienData - Objeto con los datos del bien
     * @returns - Objeto Bien
     */
    static fromObject(bienData: any): Bien;
}
