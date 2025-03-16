export class Mercader {
    id;
    nombre;
    tipo;
    ubicacion;
    dinero;
    constructor(id, nombre, tipo, ubicacion, dinero) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
        this.dinero = dinero;
    }
    mostrarInfo() {
        return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion}`;
    }
    getDinero() {
        return this.dinero;
    }
    setDinero(dinero) {
        this.dinero = dinero;
    }
}
