export class Bien {
  constructor(
    public id: string,
    public nombre: string,
    public descripcion: string,
    public material: string,
    public peso: number,
    public valor: number
  ) {}

  mostrarInfo(): string {
    return `${this.nombre} - ${this.descripcion} (Material: ${this.material}, Peso: ${this.peso}kg, Valor: ${this.valor} coronas)`;
  }

  getNombre() {
    return this.nombre;
  }

  toString(): string {
    return `${this.nombre} (${this.material}, ${this.peso}kg, ${this.valor} coronas)`; // Formato legible
  }

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
}
