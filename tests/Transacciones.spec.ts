import { describe, test, expect } from 'vitest';

import { db } from "../src/base_datos/database.js";
import { Bien } from "../src/models/Bien.js";
import { Mercader } from "../src/models/Mercader.js";
import { Cliente } from "../src/models/Cliente.js";

import { Transaccion, registrarVenta,registrarCompra } from "../src/services/Transacciones.js";

describe('Transacciones', () => {
  test('Crear transacción', () => {
    const transaccion = new Transaccion('venta', '51', 100, '1');
    expect(transaccion.tipo).toBe('venta');
    expect(transaccion.bienId).toBe('51');
    expect(transaccion.coronas).toBe(100);
    expect(transaccion.IdPersona).toBe('1');
  });

  test('Mostrar información de la transacción', () => {
    const transaccion = new Transaccion('compra', '52', 200, '2');
    expect(transaccion.mostrarInfo()).toBeUndefined();
  });

  // test('Registrar venta', async () => {
  //   await db.read();
  //   const bien = new Bien('53', 'Espada', 'Una espada afilada', 'Acero', 3, 100);
  //   const cliente = new Cliente('21', 'Vinicius', 'Mono', 'Brasil', 1000, []);
  //   db.data.bienes.push(bien);
  //   db.data.clientes.push(cliente);
  //   await db.write();

  //   let str: string = bien.id;
  //   let str2: string = cliente.id;

  //   await registrarVenta(str, str2);
  //   await db.read
  //   expect(db.data.transacciones.length).toBe(1);
  //   expect(db.data.transacciones[0].tipo).toBe('venta');
  //   expect(db.data.transacciones[0].bienId).toBe('53');
  //   expect(db.data.transacciones[0].coronas).toBe(100);
  //   expect(db.data.transacciones[0].IdPersona).toBe('1');

  //   // Limpiar la base de datos
  //   db.data.bienes = [];
  //   db.data.clientes = [];
  //   db.data.transacciones = [];
  //   await db.write();
    
  // });

  // test('Registrar compra', async () => {
  //   await db.read();
  //   const bien = new Bien('54', 'Escudo', 'Un escudo resistente', 'Hierro', 5, 150);
  //   const mercader = new Mercader('22', 'Vinicius', 'Mono', 'Brasil', 1000, []);
  //   db.data.bienes.push(bien);
  //   db.data.mercaderes.push(mercader);
  //   await db.write();

  //   let str: string = bien.id;
  //   let str2: string = mercader.id;

  //   await registrarCompra(str, str2);
  //   await db.read
  //   expect(db.data.transacciones.length).toBe(1);
  //   expect(db.data.transacciones[0].tipo).toBe('compra');
  //   expect(db.data.transacciones[0].bienId).toBe('54');
  //   expect(db.data.transacciones[0].coronas).toBe(150);
  //   expect(db.data.transacciones[0].IdPersona).toBe('1');

  //   // Limpiar la base de datos
  //   db.data.bienes = [];
  //   db.data.mercaderes = [];
  //   db.data.transacciones = [];
  //   await db.write();
  // });

  // test('ProcesarDevolucion', async () => {
  //   await db.read();
  //   const bien = new Bien('55', 'Casco', 'Un casco de batalla', 'Bronce', 2, 80);
  //   const cliente = new Cliente('23', 'Vinicius', 'Mono', 'Brasil', 1000, []);
  //   db.data.bienes.push(bien);
  //   db.data.clientes.push(cliente);
  //   await db.write();

  //   let str: string = bien.id;
  //   let str2: string = cliente.id;

  //   await registrarVenta(str, str2);
  //   await db.read
  //   expect(db.data.transacciones.length).toBe(1);
  //   expect(db.data.transacciones[0].tipo).toBe('venta');
  //   expect(db.data.transacciones[0].bienId).toBe('55');
  //   expect(db.data.transacciones[0].coronas).toBe(80);
  //   expect(db.data.transacciones[0].IdPersona).toBe('1');

  //   await procesarDevolucion(str, str2);
  //   await db.read
  //   expect(db.data.transacciones.length).toBe(2);
  //   expect(db.data.transacciones[1].tipo).toBe('devolucion');
  //   expect(db.data.transacciones[1].bienId).toBe('55');
  //   expect(db.data.transacciones[1].coronas).toBe(80);
  //   expect(db.data.transacciones[1].IdPersona).toBe('1');

  //   // Limpiar la base de datos
  //   db.data.bienes = [];
  //   db.data.clientes = [];
  //   db.data.transacciones = [];
  //   await db.write();

  // });

});
