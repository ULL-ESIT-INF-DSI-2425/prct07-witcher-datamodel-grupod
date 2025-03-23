/**
 * Clase InformeTransacciones
 */
export declare class InformeTransacciones {
    /**
     * Método asincrónico que muestra el estado del stock
     * @param bienId - Identificador del bien
     * @param tipoBien - Tipo de bien
     */
    estadoStock(bienId?: string, tipoBien?: string): Promise<void>;
    /**
     * Método asincrónico que muestra los bienes más vendidos
     * @param top - Número de bienes a mostrar
     */
    bienesMasVendidos(): Promise<void>;
    bienesMasDemandados(top?: number): Promise<void>;
    /**
     * Método asincrónico que muestra el resumen financiero
     */
    resumenFinanciero(): Promise<void>;
    /**
     * Método asincrónico que muestra el histórico de transacciones de una persona
     * @param personaId - Identificador de la persona
     */
    transaccionesCliente(personaId: string): Promise<void>;
    /**
     * Método asincrónico que muestra el histórico de transacciones de un mercader
     * @param personaId - Identificador de la persona
     */
    transaccionesMercader(personaId: string): Promise<void>;
    /**
     * Método asincrónico que calcula el total de coronas
     * @param tipo - Tipo de transacción
     */
    private calcularTotalCoronas;
}
