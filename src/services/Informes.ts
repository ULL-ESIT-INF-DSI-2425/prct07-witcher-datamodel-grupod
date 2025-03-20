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
    
    let bienes = db.data.bienes.map(
      bien => Bien.fromObject(bien) // Usamos el método fromObject
    );

    if (bienId) {
      bienes = bienes.filter(b => b.id === bienId); // Filtramos por ID
    } 
    if (tipoBien) {
      bienes = bienes.filter(b => b.material === tipoBien); // Filtramos por tipo de bien
    }
    console.log("🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦Estado del Stock📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦")
    if (bienes.length === 0) {
      console.log("No hay bienes disponibles con los filtros aplicados.");
    } else {
      bienes.forEach(b => console.log(b.mostrarInfo()));
    }
    console.log("🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷📦🔷")
  }

  /**
   * Método asincrónico que muestra los bienes más vendidos
   * @param top - Número de bienes a mostrar
   */
  async bienesMasVendidos(top: number = 5): Promise<void> {
    await db.read();
    
    const ventas = db.data.transacciones.filter((t: Transaccion) => t.tipo === 'venta');  // Filtramos las ventas
    
    // Obtenemos el bien más vendido
    const bienesMasVendidos = [];
    for (const t of ventas) {
      let bien = bienesMasVendidos.find(b => b.bienId === t.bienId);
      if (bien) {
      bien.cantidad++;
      } else {
      bienesMasVendidos.push({ bienId: t.bienId, cantidad: 1 });
      }
    }
    bienesMasVendidos.sort((a, b) => b.cantidad - a.cantidad);
    bienesMasVendidos.splice(top);

    // Imprimimos los bienes más vendidos
    console.log(`🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦 Top ${top} de bienes más vendidos 🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦`);
    if (bienesMasVendidos.length === 0) {
      console.log("No hay bienes vendidos.");
    } 
    else {
      let bienes = db.data.bienes.map(
        bien => Bien.fromObject(bien) // Usamos el método fromObject
      );
      bienesMasVendidos.forEach(b => {
        const bien = bienes.find(bien => bien.id === b.bienId);
        console.log(`${bien ? bien.getNombre() : "Bien desconocido"} - ${b.cantidad} unidades`);
      });
    }
    console.log(`🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦`);
  }

  async bienesMasDemandados(top: number = 5): Promise<void> {
    await db.read();
    
    const ventas = db.data.transacciones.filter((t: Transaccion) => t.tipo === 'compra');  // Filtramos las ventas
    
    // Obtenemos el bien más vendido
    const bienesMasDemandados = [];
    for (const t of ventas) {
      let bien = bienesMasDemandados.find(b => b.bienId === t.bienId);
      if (bien) {
      bien.cantidad++;
      } else {
        bienesMasDemandados.push({ bienId: t.bienId, cantidad: 1 });
      }
    }
    bienesMasDemandados.sort((a, b) => b.cantidad - a.cantidad);
    bienesMasDemandados.splice(top);

    // Imprimimos los bienes más vendidos
    console.log(`🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦 Top ${top} de bienes más demandados 🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦`);
    if (bienesMasDemandados.length === 0) {
      console.log("No hay bienes demandados.");
    } 
    else {
      let bienes = db.data.bienes.map(
        bien => Bien.fromObject(bien) // Usamos el método fromObject
      );
      bienesMasDemandados.forEach(b => {
        const bien = bienes.find(bien => bien.id === b.bienId);
        console.log(`${bien ? bien.getNombre() : "Bien desconocido"} - ${b.cantidad} unidades`);
      });
    }
    console.log(`🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦🪙📦`);
  }

  /**
   * Método asincrónico que muestra el resumen financiero
   */
  async resumenFinanciero(): Promise<void> {
    const totalVentas = await this.calcularTotalCoronas('venta');
    const totalCompras = await this.calcularTotalCoronas('compra');
    
    console.log("📈​📉📈​📉🪙 ​📈​📉​📈​📉​🪙 📈​📉​📈​📉📈​🪙 📉​📈​📉​📈​🪙 📉​📈​📉​📈​📉​​​ Resumen Financiero 📉​📈​📉📈​🪙 📉​📈​📉​📈​🪙 📉​📈​📉​📈​🪙 📉​📈​📉​📈🪙 ​📉​📈​📉​📈​​​");
    console.log(`Ingresos por ventas: ${totalVentas} coronas`);
    console.log(`Gastos en adquisiciones: ${totalCompras} coronas`);
    console.log(`Balance neto: ${totalVentas - totalCompras} coronas`);
    console.log("📈​📉📈​📉🪙 ​📈​📉📈​📉🪙​ 📈​📉📈​📉🪙​ 📈​📉📈​📉🪙​ 📈​📉📈​📉🪙​ 📈​📉📈​📉🪙 ​📈​📉📈​📉🪙​ 📈​📉📈​📉🪙 ​📈​📉📈​📉🪙 ​📈​📉📈​📉🪙 ​📈​📉📈​📉🪙 ​📈​📉📈​📉​")
  }
  
  /**
   * Método asincrónico que muestra el histórico de transacciones de una persona
   * @param personaId - Identificador de la persona
   */
  async transaccionesCliente(personaId: string): Promise<void> {
    await db.read();
    let transacciones = db.data.transacciones.map(
      transaccion => Transaccion.fromObject(transaccion) // Usamos el método fromObject
    );
    transacciones = transacciones.filter(t => t.IdPersona === personaId && t.tipo === 'venta');
    console.log("➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​")
    if (transacciones.length === 0) {
      console.log(`El cliente con ID ${personaId} no ha realizado compras.`);
    }
    else {
      console.log(`El histórico de transacciones del cliente es el siguiente:`);
      transacciones.forEach(t => t.mostrarInfo()); 
    }
    console.log("〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​​")
  }

  async transaccionesMercader(personaId: string): Promise<void> {
    await db.read();
    let transacciones = db.data.transacciones.map(
      transaccion => Transaccion.fromObject(transaccion) // Usamos el método fromObject
    );
    transacciones = transacciones.filter(t => t.IdPersona === personaId && t.tipo === 'compra');
    console.log("➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​➿​")
    if (transacciones.length === 0) {
      console.log(`El mercader con ID ${personaId} no ha realizado compras.`);
    } else {
      console.log(`El histórico de transacciones del mercader es el siguiente:`);
      transacciones.forEach(t => t.mostrarInfo());
    }
    console.log("〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​〰️​​")
  }

  /**
   * Método asincrónico que calcula el total de coronas
   * @param tipo - Tipo de transacción
   */
  private async calcularTotalCoronas(tipo: 'venta' | 'compra'): Promise<number> {
    await db.read();
    
    let transacciones = db.data.transacciones.map(
      transaccion => Transaccion.fromObject(transaccion) // Usamos el método fromObject
    );

    transacciones = transacciones.filter((t: Transaccion) => t.tipo === tipo);
    return transacciones.reduce((total: number, t: Transaccion) => total + t.coronas, 0);
  }
}
