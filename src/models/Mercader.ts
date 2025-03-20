// File: Mercader.ts

// Importamos la clase Bien
import { Bien } from "./Bien.js";

/**
 * Clase Mercader
*/
export class Mercader {
  /**
   * Constructor de la clase Mercader
   * @param id - Identificador del mercader
   * @param nombre - Nombre del mercader
   * @param tipo - Tipo de mercader
   * @param ubicacion - Ubicación del mercader
   * @param dinero - Dinero del mercader
   * @param bienes - Bienes del mercader
  */
  constructor(
    public id: string,
    public nombre: string,
    public tipo: string,
    public ubicacion: string,
    public dinero: number,
    public bienes: Bien[]
  ) {}

  /**
   * Muestra la información del mercader
   * @returns - Información del mercader
   */
  mostrarInfo(): string {
    const bienesInfo = this.bienes.map(bien => bien.toString()).join(", ");
    return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion} - Bienes: [${bienesInfo}]`;
  }

  /**
   * Obtiene el dinero del mercader
   * @returns - Dinero del mercader
   */
  getDinero() : number {
    return this.dinero
  }

  /**
   * Método estático que crea un objeto Mercader a partir de un objeto
   * @param mercaderData - Objeto con los datos del mercader
   * @returns - Objeto Mercader
   */
  static fromObject(mercaderData: any): Mercader {
    return new Mercader(
      mercaderData.id,
      mercaderData.nombre,
      mercaderData.tipo,
      mercaderData.ubicacion,
      mercaderData.dinero,
      mercaderData.bienes.map((bien: any) => Bien.fromObject(bien)) // Usamos fromObject para los bienes
    );
  }
}


