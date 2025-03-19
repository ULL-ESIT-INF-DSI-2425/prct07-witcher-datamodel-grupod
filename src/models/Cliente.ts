import { Bien } from './Bien.js';

export class Cliente {
  constructor(
    public id: string,
    public nombre: string,
    public raza: string,
    public ubicacion: string,
    public dinero: number,
    public bienes: Bien[],
  ) {}

  mostrarInfo(): string {
    return `${this.nombre} (${this.raza}) - Ubicación: ${this.ubicacion} - Bienes: ${this.bienes}`;
  }
}
