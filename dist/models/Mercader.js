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
        return `${this.nombre} (${this.tipo}) - Ubicación: ${this.ubicacion} - Bienes: ${this.bienes}`;
    }
    getDinero() {
        return this.dinero;
    }
    setDinero(dinero) {
        this.dinero = dinero;
    }
}
