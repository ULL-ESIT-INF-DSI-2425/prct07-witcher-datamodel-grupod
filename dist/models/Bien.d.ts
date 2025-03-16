export declare class Bien {
    id: string;
    nombre: string;
    descripcion: string;
    material: string;
    peso: number;
    valor: number;
    constructor(id: string, nombre: string, descripcion: string, material: string, peso: number, valor: number);
    mostrarInfo(): string;
}
