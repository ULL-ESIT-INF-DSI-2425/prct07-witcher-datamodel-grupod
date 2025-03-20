// File: Informes.ts

// Importamos la clase Transaccion
// Importamos la base de datos
// Importamos la clase Bien
import { db } from "../base_datos/database.js";
import { Transaccion } from "./Transacciones.js";
import { Bien } from "../models/Bien.js";

/**
 * Clase InformeTransacciones
 */
export class InformeTransacciones {
  /**
   * Método asincrónico que muestra el estado del stock
   * @param bienId - Identificador del bien
   * @param tipoBien - Tipo de bien
   */
  async estadoStock(bienId?: string, tipoBien?: string): Promise<void> {  
    await db.read();  // El await es necesario para que la función espere a que se lea la base de datos
    
    let bienes: Bien[] = db.data.bienes; // Obtenemos los bienes de la base de datos

    if (bienId) {
      bienes = bienes.filter(b => b.id === bienId); // Filtramos por ID
    } 

    if (tipoBien) {
      bienes = bienes.filter(b => b.material === tipoBien); // Filtramos por tipo de bien
    }

    // Imprimimos los bienes
    // console.log("📦 Estado del Stock 📦" + (bienId ? ` (ID: ${bienId})` : "") + (tipoBien ? ` (Tipo: ${tipoBien})` : ""));
    // if (bienes.length === 0) {
    //   console.log("No hay bienes disponibles con los filtros aplicados.");
    // } else {
    //   bienes.forEach(b => console.log(b.mostrarInfo()));
    // }

    console.log("📦 Estado del Stock 📦");
    if (bienes.length === 0) {
      console.log("No hay bienes disponibles con los filtros aplicados.");
    } else {
      bienes.forEach(b => console.log(b.mostrarInfo()));
    }
  }

  /**
   * Método asincrónico que muestra los bienes más vendidos
   * @param top - Número de bienes a mostrar
   */
  async bienesMasVendidos(top: number = 5): Promise<void> {
    await db.read();
    
    const ventas = db.data.transacciones.filter((t: Transaccion) => t.tipo === 'venta');  // Filtramos las ventas
    
    const conteo: Record<string, number> = {};  // Creamos un objeto para contar las ventas de cada bien
    ventas.forEach(t => {   // Recorremos las ventas
      conteo[t.bienId] = (conteo[t.bienId] || 0) + 1; // Incrementamos el contador de ventas
    });

    const bienesOrdenados = Object.entries(conteo)  // Convertimos el objeto en un array de pares [bienId, cantidad]
      .sort((a, b) => b[1] - a[1])  // Ordenamos por cantidad de ventas
      .slice(0, top); 

    // Imprimimos los bienes más vendidos
    console.log(`🔥 Bienes más vendidos (Top ${top}) 🔥`);
    bienesOrdenados.forEach(([bienId, cantidad], index) => {
      const bien = db.data.bienes.find((b: Bien) => b.id === bienId);
      console.log(`${index + 1}. ${bien ? bien.getNombre() : "Desconocido"} - ${cantidad} ventas`);
    });
  }

  /**
   * Método asincrónico que muestra el resumen financiero
   */
  async resumenFinanciero(): Promise<void> {
    const totalVentas = await this.calcularTotalCoronas('venta');
    const totalCompras = await this.calcularTotalCoronas('compra');
    
    console.log("💰 Resumen Financiero 💰");
    console.log(`Ingresos por ventas: ${totalVentas} coronas`);
    console.log(`Gastos en adquisiciones: ${totalCompras} coronas`);
    console.log(`Balance neto: ${totalVentas - totalCompras} coronas`);
  }
  
  /**
   * Método asincrónico que muestra el histórico de transacciones de una persona
   * @param personaId - Identificador de la persona
   */
  async historicoTransacciones(personaId: string): Promise<void> {
    await db.read();  
    
    const transacciones = db.data.transacciones.filter((t: Transaccion) => t.IdPersona === personaId);  // Filtramos las transacciones de la persona

    // Imprimimos el histórico de transacciones
    console.log(`📜 Histórico de transacciones de ${personaId} 📜`);  
    if (transacciones.length === 0) {
      console.log("No hay transacciones registradas para esta persona.");
    } else {
      transacciones.forEach(t => {  // Recorremos las transacciones
        const bien = db.data.bienes.find((b: Bien) => b.id === t.bienId); // Buscamos el bien de la transacción
        console.log(`${t.fecha.toISOString()} - ${t.tipo.toUpperCase()} - ${bien ? bien.getNombre() : "Bien desconocido"} - ${t.coronas} coronas`); 
      });
    }
  }

  /**
   * Método asincrónico que calcula el total de coronas
   * @param tipo - Tipo de transacción
   */
  private async calcularTotalCoronas(tipo: 'venta' | 'compra'): Promise<number> {
    await db.read();
    return db.data.transacciones
      .filter((t: Transaccion) => t.tipo === tipo)
      .reduce((total, t) => total + t.coronas, 0);
  }
}
