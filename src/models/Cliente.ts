import { Bien } from "./Bien.js";
export class Cliente {
  constructor(
    public id: string,
    public nombre: string,
    public raza: string,
    public ubicacion: string,
    public dinero: number,
    public bienes: Bien[]
  ) {}

  mostrarInfo(): string {
    const bienesInfo = this.bienes.map(bien => bien.toString()).join(", ");
    return `${this.nombre} (${this.raza}) - Ubicación: ${this.ubicacion} - Bienes: [${bienesInfo}]`;
  }

  static fromObject(clienteData: any): Cliente {
    return new Cliente(
      clienteData.id,
      clienteData.nombre,
      clienteData.raza,
      clienteData.ubicacion,
      clienteData.dinero,
      clienteData.bienes.map((bien: any) => Bien.fromObject(bien)) // Usamos fromObject para los bienes
    );
  }
}
