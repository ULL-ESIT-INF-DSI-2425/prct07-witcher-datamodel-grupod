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
        return `${this.nombre} (${this.raza}) - Ubicación: ${this.ubicacion} - Bienes: ${this.bienes}`;
    }
}
