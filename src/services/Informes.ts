import { db } from "../base_datos/database.js";
import { Transaccion } from "./Transacciones.js";
import { Bien } from "../models/Bien.js";

export class InformeTransacciones {
  
  async estadoStock(bienId?: string, tipoBien?: string): Promise<void> {
    await db.read();
    
    let bienes: Bien[] = db.data.bienes;

    if (bienId) {
      bienes = bienes.filter(b => b.id === bienId);
    } 

    console.log("📦 Estado del Stock 📦");
    if (bienes.length === 0) {
      console.log("No hay bienes disponibles con los filtros aplicados.");
    } else {
      bienes.forEach(b => console.log(b.mostrarInfo()));
    }
  }

  async bienesMasVendidos(top: number = 5): Promise<void> {
    await db.read();
    
    const ventas = db.data.transacciones.filter((t: Transaccion) => t.tipo === 'venta');
    
    const conteo: Record<string, number> = {};
    ventas.forEach(t => {
      conteo[t.bienId] = (conteo[t.bienId] || 0) + 1;
    });

    const bienesOrdenados = Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, top);

    console.log(`🔥 Bienes más vendidos (Top ${top}) 🔥`);
    bienesOrdenados.forEach(([bienId, cantidad], index) => {
      const bien = db.data.bienes.find((b: Bien) => b.id === bienId);
      console.log(`${index + 1}. ${bien ? bien.getNombre() : "Desconocido"} - ${cantidad} ventas`);
    });
  }

  async resumenFinanciero(): Promise<void> {
    const totalVentas = await this.calcularTotalCoronas('venta');
    const totalCompras = await this.calcularTotalCoronas('compra');
    
    console.log("💰 Resumen Financiero 💰");
    console.log(`Ingresos por ventas: ${totalVentas} coronas`);
    console.log(`Gastos en adquisiciones: ${totalCompras} coronas`);
    console.log(`Balance neto: ${totalVentas - totalCompras} coronas`);
  }

  async historicoTransacciones(personaId: string): Promise<void> {
    await db.read();
    
    const transacciones = db.data.transacciones.filter((t: Transaccion) => t.IdPersona === personaId);

    console.log(`📜 Histórico de transacciones de ${personaId} 📜`);
    if (transacciones.length === 0) {
      console.log("No hay transacciones registradas para esta persona.");
    } else {
      transacciones.forEach(t => {
        const bien = db.data.bienes.find((b: Bien) => b.id === t.bienId);
        console.log(`${t.fecha.toISOString()} - ${t.tipo.toUpperCase()} - ${bien ? bien.getNombre() : "Bien desconocido"} - ${t.coronas} coronas`);
      });
    }
  }

  private async calcularTotalCoronas(tipo: 'venta' | 'compra'): Promise<number> {
    await db.read();
    return db.data.transacciones
      .filter((t: Transaccion) => t.tipo === tipo)
      .reduce((total, t) => total + t.coronas, 0);
  }
}
