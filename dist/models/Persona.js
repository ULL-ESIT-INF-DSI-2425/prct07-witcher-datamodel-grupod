export class Persona {
    id;
    nombre;
    ubicacion;
    dinero;
    constructor(id, nombre, ubicacion, dinero) {
        this.id = id;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.dinero = dinero;
    }
    // Métodos de la interfaz Identificable
    getId() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
}
