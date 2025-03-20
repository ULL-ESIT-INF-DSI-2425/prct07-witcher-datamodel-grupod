// File: Bien.ts
/**
 * Clase Bien
 *
 */
export class Bien {
    id;
    nombre;
    descripcion;
    material;
    peso;
    valor;
    /**
     * Constructor de la clase Bien
     * @param id - Identificador del bien
     * @param nombre - Nombre del bien
     * @param descripcion - Descripción del bien
     * @param material - Material del bien
     * @param peso - Peso del bien
     * @param valor - Valor del bien
     */
    constructor(id, nombre, descripcion, material, peso, valor) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.material = material;
        this.peso = peso;
        this.valor = valor;
    }
    /**
     * Muestra la información del bien
     * @returns - Información del bien
     */
    mostrarInfo() {
        return `${this.nombre} - ${this.descripcion} (Material: ${this.material}, Peso: ${this.peso}kg, Valor: ${this.valor} coronas)`;
    }
    /**
     * Obtiene el nombre del bien
     * @returns - Nombre del bien
     */
    getNombre() {
        return this.nombre;
    }
    /**
     * Obtiene el material del bien
     * @returns - Material del bien
     */
    toString() {
        return `${this.nombre} (${this.material}, ${this.peso}kg, ${this.valor} coronas)`; // Formato legible
    }
    /**
     * Método estático que crea un objeto Bien a partir de un objeto
     * @param bienData - Objeto con los datos del bien
     * @returns - Objeto Bien
     */
    static fromObject(bienData) {
        return new Bien(bienData.id, bienData.nombre, bienData.descripcion, bienData.material, bienData.peso, bienData.valor);
    }
}
