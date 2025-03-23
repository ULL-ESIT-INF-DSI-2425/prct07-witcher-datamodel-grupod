// File: Bien.ts
/**
 * Clase Bien
 * 
 */
import { Identificable } from "./Identificable.js";

export class Bien implements Identificable {
  /**
   * Constructor de la clase Bien
   * @param id - Identificador del bien
   * @param nombre - Nombre del bien
   * @param descripcion - Descripción del bien
   * @param material - Material del bien
   * @param peso - Peso del bien
   * @param valor - Valor del bien 
   */
  constructor(
    public id: string,
    public nombre: string,
    public descripcion: string,
    public material: string,
    public peso: number,
    public valor: number
  ) {}

  /**
   * Muestra la información del bien
   * @returns - Información del bien
   */
  mostrarInfo(): string {
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
  toString(): string {
    return `${this.nombre} (${this.material}, ${this.peso}kg, ${this.valor} coronas)`; // Formato legible
  }

  /**
   * Método estático que crea un objeto Bien a partir de un objeto
   * @param bienData - Objeto con los datos del bien
   * @returns - Objeto Bien
   */
  static fromObject(bienData: any): Bien {
    return new Bien(
      bienData.id,
      bienData.nombre,
      bienData.descripcion,
      bienData.material,
      bienData.peso,
      bienData.valor
    );
  }

  /**
   * Identificarse muestra un mensaje con el nombre del bien
   */
  Identificarse(): void {
    console.log(`Hola!, soy un ${this.nombre}`);
  }
}
