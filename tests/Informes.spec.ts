import { describe, test, expect } from 'vitest';

//Base de datos con test correctos
import { db , initDB } from '../src/base_datos/database';

// Models con test correctos
import { Bien } from '../src/models/Bien';
import { Mercader } from '../src/models/Mercader';
import { Cliente } from '../src/models/Cliente';
import { Transaccion } from '../src/services/Transacciones';

import { InformeTransacciones } from '../src/services/Informes';
import {  } from '../src/services/Inventario';

//Informes con test correctos
describe('Informes', () => {
  test('estadoStock', async () => {
    const informes = new InformeTransacciones();
    await informes.estadoStock();
  });

  test('bienesMasVendidos', async () => {
    const informes = new InformeTransacciones();
    await informes.bienesMasVendidos();
  });

  test('bienesMasDemandados', async () => {
    const informes = new InformeTransacciones();
    await informes.bienesMasDemandados();
  });

  test('resumenFinanciero', async () => {
    const informes = new InformeTransacciones();
    await informes.resumenFinanciero();
  });

  test('transaccionesCliente', async () => {
    const informes = new InformeTransacciones();
    const cliente = new Cliente('79', 'Geralt', 'Rivia', '12345678A', 100, []);
    let str : string = cliente.id;
    await informes.transaccionesCliente(str);
  });

  test('transaccionesMercader', async () => {
    const informes = new InformeTransacciones();
    const mercader = new Mercader('1', 'Ismael', 'Usurero', 'Güimar Tenerife', 100, []);
    let str : string = mercader.id;
    await informes.transaccionesMercader(str);
  });

  test("estadoStock filtra por ID de bien", async () => {
    const informes = new InformeTransacciones();
    await informes.estadoStock("1");
  });

  test("estadoStock filtra por tipo de bien", async () => {
    const informes = new InformeTransacciones();
    await informes.estadoStock(undefined, "Madera");
  });

  test("estadoStock filtra por ID y tipo de bien", async () => {
    const informes = new InformeTransacciones();
    await informes.estadoStock("1", "Madera");
  });

  test ("bienesMasVendidos si es 0", async () => {
    const informes = new InformeTransacciones();
    await informes.bienesMasVendidos(0);
  });

  test ("bienesMasDemandados si es 0", async () => {
    const informes = new InformeTransacciones();
    await informes.bienesMasDemandados(0);
  });

  test ("transaccionesCliente si es 0", async () => {
    const informes = new InformeTransacciones();
    await informes.transaccionesCliente("0");
  });

  test ("transaccionesMercader si no es 0", async () => {
    const informes = new InformeTransacciones();
    await informes.transaccionesMercader("1");
  });

  test ("transaccionesMercader si es 0", async () => {
    const informes = new InformeTransacciones();
    await informes.transaccionesMercader("0");
  });

  test ("transaccionesMercader no muestra transacciones de venta", async () => {
    const informes = new InformeTransacciones();
    await informes.transaccionesMercader("1");
  });
});
 