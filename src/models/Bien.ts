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
}