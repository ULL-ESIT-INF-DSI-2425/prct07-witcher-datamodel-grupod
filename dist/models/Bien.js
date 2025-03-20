export class Bien {
    id;
    nombre;
    descripcion;
    material;
    peso;
    valor;
    constructor(id, nombre, descripcion, material, peso, valor) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.material = material;
        this.peso = peso;
        this.valor = valor;
    }
    mostrarInfo() {
        return `${this.nombre} - ${this.descripcion} (Material: ${this.material}, Peso: ${this.peso}kg, Valor: ${this.valor} coronas)`;
    }
    getNombre() {
        return this.nombre;
    }
    toString() {
        return `${this.nombre} (${this.material}, ${this.peso}kg, ${this.valor} coronas)`; // Formato legible
    }
    static fromObject(bienData) {
        return new Bien(bienData.id, bienData.nombre, bienData.descripcion, bienData.material, bienData.peso, bienData.valor);
    }
}
