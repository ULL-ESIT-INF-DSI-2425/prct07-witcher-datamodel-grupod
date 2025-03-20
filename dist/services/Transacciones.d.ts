/**
 * Clase Transaccion
 */
export declare class Transaccion {
    id: string;
    tipo: 'venta' | 'compra' | 'devolucion';
    fecha: Date;
    bienId: string;
    IdPersona?: string;
    coronas: number;
    /**
     * Constructor de la clase Transaccion
     * @param tipo - Tipo de transacción
     * @param bienId - Identificador del bien
     * @param coronas - Cantidad de coronas
     * @param IdPersona - Identificador de la persona
     */
    constructor(tipo: 'venta' | 'compra' | 'devolucion', bienId: string, coronas: number, IdPersona: string);
    static fromObject(transaccionData: any): Transaccion;
    mostrarInfo(): void;
}
/**
 * Método asincrónico que registra una venta
 * @param bienId - Identificador del bien
 * @param clienteId - Identificador del cliente
 */
export declare function registrarVenta(bienId: string, clienteId: string): Promise<void>;
/**
 * Método asincrónico que registra una compra
 * @param bienId - Identificador del bien
 * @param mercaderId - Identificador del mercader
 */
export declare function registrarCompra(bienId: string, mercaderId: string): Promise<void>;
/**
 * Método asincrónico que procesa una devolución
 * @param bienId - Identificador del bien
 * @param IdPersona - Identificador de la persona
 * @param tipo - Tipo de transacción
 */
export declare function procesarDevolucion(bienId: string, IdPersona: string, tipo: 'venta' | 'compra'): Promise<void>;
