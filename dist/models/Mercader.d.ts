export declare class Mercader {
    id: string;
    nombre: string;
    tipo: string;
    ubicacion: string;
    dinero: number;
    constructor(id: string, nombre: string, tipo: string, ubicacion: string, dinero: number);
    mostrarInfo(): string;
    getDinero(): number;
    setDinero(dinero: number): void;
}
