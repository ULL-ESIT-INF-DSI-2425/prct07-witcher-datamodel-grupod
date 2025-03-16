import { Bien } from "../models/Bien.js";
export declare class Transaccion {
    id: string;
    tipo: 'venta' | 'compra' | 'devolucion';
    fecha: Date;
    bienId: string;
    clienteId?: string;
    mercaderId?: string;
    coronas: number;
    constructor(tipo: 'venta' | 'compra' | 'devolucion', bienId: string, coronas: number, clienteId?: string, mercaderId?: string);
}
export declare function registrarVenta(bienId: string, clienteId: string, mercaderId: string): Promise<void>;
export declare function registrarCompra(bien: Bien, mercaderId: string, coronas: number): Promise<void>;
export declare function procesarDevolucion(bienId: string, origen: "cliente" | "mercader", coronas: number): Promise<void>;
