export declare class InformeTransacciones {
    estadoStock(bienId?: string, tipoBien?: string): Promise<void>;
    bienesMasVendidos(top?: number): Promise<void>;
    resumenFinanciero(): Promise<void>;
    historicoTransacciones(personaId: string): Promise<void>;
    private calcularTotalCoronas;
}
