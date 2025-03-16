export class Mercader {
    id;
    nombre;
    tipo;
    ubicacion;
    constructor(id, nombre, tipo, ubicacion) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.ubicacion = ubicacion;
    }
    mostrarInfo() {
        return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion}`;
    }
}
