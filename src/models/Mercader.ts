export class Mercader {
  constructor(
    public id: string,
    public nombre: string,
    public tipo: string,
    public ubicacion: string,
    public dinero: number
  ) {}

  mostrarInfo(): string {
    return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion}`;
  }

  getDinero(): number {
    return this.dinero;
  }

  setDinero(dinero: number): void {
    this.dinero = dinero;
  }
}

