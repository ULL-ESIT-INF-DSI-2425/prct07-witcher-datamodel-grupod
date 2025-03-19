export declare class Transaccion {
    id: string;
    tipo: 'venta' | 'compra' | 'devolucion';
    fecha: Date;
    bienId: string;
    IdPersona?: string;
    coronas: number;
    constructor(tipo: 'venta' | 'compra' | 'devolucion', bienId: string, coronas: number, IdPersona: string);
}
export declare function registrarVenta(bienId: string, clienteId: string): Promise<void>;
export declare function registrarCompra(bienId: string, mercaderId: string): Promise<void>;
export declare function procesarDevolucion(bienId: string, origen: "cliente" | "mercader", coronas: number): Promise<void>;
