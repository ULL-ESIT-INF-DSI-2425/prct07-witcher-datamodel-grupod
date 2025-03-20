import { Bien } from "./Bien.js";
export class Mercader {
  constructor(
    public id: string,
    public nombre: string,
    public tipo: string,
    public ubicacion: string,
    public dinero: number,
    public bienes: Bien[]
  ) {}

  mostrarInfo(): string {
    const bienesInfo = this.bienes.map(bien => bien.toString()).join(", ");
    return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion} - Bienes: [${bienesInfo}]`;
  }
  getDinero() : number {
    return this.dinero
  }

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


