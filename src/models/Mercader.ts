export class Mercader {
  constructor(
    public id: string,
    public nombre: string,
    public tipo: string,
    public ubicacion: string
  ) {}

  mostrarInfo(): string {
    return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion}`;
  }
}

