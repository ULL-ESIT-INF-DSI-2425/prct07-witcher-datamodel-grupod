export class Cliente {
    id;
    nombre;
    raza;
    ubicacion;
    dinero;
    constructor(id, nombre, raza, ubicacion, dinero) {
        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.ubicacion = ubicacion;
        this.dinero = dinero;
    }
    mostrarInfo() {
        return `${this.nombre} (${this.raza}) - Ubicación: ${this.ubicacion}`;
    }
}
