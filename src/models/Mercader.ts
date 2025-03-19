import { Bien } from './Bien.js';

export class Mercader {
  constructor(
    public id: string,
    public nombre: string,
    public tipo: string,
    public ubicacion: string,
    public dinero: number,
    public bienes: Bien[],
  ) {}

  mostrarInfo(): string {
    return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion} - Bienes: ${this.bienes}`;
  }

  getDinero(): number {
    return this.dinero;
  }

  setDinero(dinero: number): void {
    this.dinero = dinero;
  }
}

