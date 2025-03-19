import { Bien } from './Bien.js';
export declare class Mercader {
    id: string;
    nombre: string;
    tipo: string;
    ubicacion: string;
    dinero: number;
    bienes: Bien[];
    constructor(id: string, nombre: string, tipo: string, ubicacion: string, dinero: number, bienes: Bien[]);
    mostrarInfo(): string;
    getDinero(): number;
    setDinero(dinero: number): void;
}
