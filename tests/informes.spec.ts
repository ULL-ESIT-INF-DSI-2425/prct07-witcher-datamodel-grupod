import { describe, test, expect } from 'vitest';

//Base de datos con test correctos
import { db , initDB } from '../src/base_datos/database';

// Models con test correctos
import { Bien } from '../src/models/Bien';
import { Mercader } from '../src/models/Mercader';
import { Cliente } from '../src/models/Cliente';
import { Transaccion } from '../src/services/Transacciones';

import { InformeTransacciones } from '../src/services/Informes';

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

});
 