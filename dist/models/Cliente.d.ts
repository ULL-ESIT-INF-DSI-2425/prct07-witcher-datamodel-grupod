import { Bien } from './Bien.js';
export declare class Cliente {
    id: string;
    nombre: string;
    raza: string;
    ubicacion: string;
    dinero: number;
    bienes: Bien[];
    constructor(id: string, nombre: string, raza: string, ubicacion: string, dinero: number, bienes: Bien[]);
    mostrarInfo(): string;
}
