import { Bien } from "./Bien.js";
export class Mercader {
    id;
    nombre;
    tipo;
    ubicacion;
    dinero;
    bienes;
    constructor(id, nombre, tipo, ubicacion, dinero, bienes) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
        this.dinero = dinero;
        this.bienes = bienes;
    }
    mostrarInfo() {
        const bienesInfo = this.bienes.map(bien => bien.toString()).join(", ");
        return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion} - Bienes: [${bienesInfo}]`;
    }
    getDinero() {
        return this.dinero;
    }
    static fromObject(mercaderData) {
        return new Mercader(mercaderData.id, mercaderData.nombre, mercaderData.tipo, mercaderData.ubicacion, mercaderData.dinero, mercaderData.bienes.map((bien) => Bien.fromObject(bien)) // Usamos fromObject para los bienes
        );
    }
}
