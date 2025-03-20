import { Bien } from "./Bien.js";
export class Cliente {
    id;
    nombre;
    raza;
    ubicacion;
    dinero;
    bienes;
    constructor(id, nombre, raza, ubicacion, dinero, bienes) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.ubicacion = ubicacion;
        this.dinero = dinero;
        this.bienes = bienes;
    }
    mostrarInfo() {
        const bienesInfo = this.bienes.map(bien => bien.toString()).join(", ");
        return `${this.nombre} (${this.raza}) - Ubicación: ${this.ubicacion} - Bienes: [${bienesInfo}]`;
    }
    static fromObject(clienteData) {
        return new Cliente(clienteData.id, clienteData.nombre, clienteData.raza, clienteData.ubicacion, clienteData.dinero, clienteData.bienes.map((bien) => Bien.fromObject(bien)) // Usamos fromObject para los bienes
        );
    }
}
