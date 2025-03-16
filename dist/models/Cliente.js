export class Cliente {
    id;
    nombre;
    raza;
    ubicacion;
    constructor(id, nombre, raza, ubicacion) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.ubicacion = ubicacion;
    }
    mostrarInfo() {
        return `${this.nombre} (${this.raza}) - Ubicación: ${this.ubicacion}`;
    }
}
