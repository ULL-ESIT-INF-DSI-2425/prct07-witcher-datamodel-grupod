import { Identificable } from "./Identificable.js";
export declare abstract class Persona implements Identificable {
    id: string;
    nombre: string;
    ubicacion: string;
    dinero: number;
    constructor(id: string, nombre: string, ubicacion: string, dinero: number);
    getId(): string;
    getNombre(): string;
    abstract mostrarInfo(): string;
}
