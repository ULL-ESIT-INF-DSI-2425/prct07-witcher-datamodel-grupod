//File: menu.spec.ts

import { describe, test, expect, vi } from 'vitest';
 
//Base de datos con test correctos
import { db , initDB } from '../src/base_datos/database'; 
import { Bien } from '../src/models/Bien';
import { Mercader} from '../src/models/Mercader';
import { incluirBien, listarBienes, eliminarBien, modificarBien, buscarBienTipo, buscarBienPorId, buscarBienDescripcion, buscarBienNombre, 
  incluirCliente, listarClientes, eliminarCliente, modificarCliente, buscarClienteId, buscarClienteNombre, buscarClienteRaza, buscarClienteUbicacion,
  incluirMercader, listarMercaderes, eliminarMercader, modificarMercader, buscarMercaderId, buscarMercaderNombre, buscarMercaderTipo, buscarMercaderUbicacion } 
  from '../src/services/Inventario';
import { registrarCompra, registrarVenta, procesarDevolucion } from '../src/services/Transacciones';
import { Cliente } from '../src/models/Cliente';
import { InformeTransacciones } from '../src/services/Informes';

import { main, handleBienes, handleClientes, handleInformes, handleMercaderes, handleTransacciones } from '../src/interfaz/menu';

import inquirer from 'inquirer';

describe('handleBienes', () => {
  // Test para "Añadir bien"
  test('Añadir bien', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({
      id: '65',
      nombre: 'Bien de prueba',
      descripcion: 'Descripción de prueba',
      material: 'Madera',
      peso: 10,
      valor: 100,
    });

    // Mock de la función incluirBien
    const incluirBienMock = vi.spyOn({ incluirBien }, 'incluirBien').mockResolvedValue();

    // Llamada a la función
    await handleBienes('Añadir bien');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(incluirBienMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '66',
      nombre: 'Bien de prueba',
      descripcion: 'Descripción de prueba',
      material: 'Madera',
      peso: 10,
      valor: 100
    }));
    expect(incluirBienMock).toHaveBeenCalledTimes(1);
  });

  // Test para "Eliminar bien"
  test('Eliminar bien', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ id: '66' });

    // Mock de la función eliminarBien
    const eliminarBienMock = vi.spyOn({ eliminarBien }, 'eliminarBien').mockResolvedValue(true);

    // Llamada a la función
    await handleBienes('Eliminar bien');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(eliminarBienMock).toHaveBeenCalledWith('66');
    expect(eliminarBienMock).toHaveBeenCalledTimes(1);
  });

});

// Tests de la función main
describe('main', () => {
  test('Salir del menu', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ opcion: "Salir" });

    // Llamada a la función
    await main();

    // Expectativa
    expect(promptMock).toHaveBeenCalled();
  });

  // test('Añadir bien', async () => {
  //   // Mock de inquirer.prompt
  //   const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ opcion: "Añadir bien" });

  //   // Llamada a la función
  //   await handleBienes("Añadir bien");


  //   // Expectativa
  //   expect(promptMock).toHaveBeenCalled();
  // });

});
