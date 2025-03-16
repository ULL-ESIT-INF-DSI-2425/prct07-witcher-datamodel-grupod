export declare class Cliente {
    id: string;
    nombre: string;
    raza: string;
    ubicacion: string;
    dinero: number;
    constructor(id: string, nombre: string, raza: string, ubicacion: string, dinero: number);
    mostrarInfo(): string;
}
