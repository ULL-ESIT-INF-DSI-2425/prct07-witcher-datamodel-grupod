import { describe, test, expect, vi } from 'vitest';

// Base de datos con test correctos
import { db, initDB } from '../src/base_datos/database';
import { Bien } from '../src/models/Bien';
import { Mercader } from '../src/models/Mercader';
import * as Inventario from '../src/services/Inventario'; // Importamos todo como Inventario
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
    const incluirBienMock = vi.spyOn(Inventario, 'incluirBien').mockResolvedValue(undefined);

    // Llamada a la función
    await handleBienes('Añadir bien');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(incluirBienMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '65', // Ajustado para coincidir con el valor del mock
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
    const eliminarBienMock = vi.spyOn(Inventario, 'eliminarBien').mockResolvedValue(true);

    // Llamada a la función
    await handleBienes('Eliminar bien');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(eliminarBienMock).toHaveBeenCalledWith('66');
    expect(eliminarBienMock).toHaveBeenCalledTimes(1);
  });
  // Test para "Modificar bien"
  test('Modificar bien', async () => {
    // Mock de inquirer.prompt para ID del bien
    const promptMockId = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ id: '1' });

    // Mock de buscarBienId
    const buscarBienIdMock = vi.spyOn(Inventario, 'buscarBienPorId').mockResolvedValue(new Bien('1', 'Orens', 'Moneda de curso legal en los Reinos del Norte.', 'Oro', 0.01, 1));
    // Mock de inquirer.prompt para nuevos datos del bien
    const promptMockDatos = vi.spyOn(inquirer, 'prompt').mockResolvedValue({
      id: '1',
      nombre: 'Oren',
      descripcion: 'Moneda de curso legal en los Reinos del Norte.',
      material: 'Oro',
      peso: 0.01,
      valor: 1
    });

    // Mock de la función modificarBien
    const modificarBienMock = vi.spyOn(Inventario, 'modificarBien').mockResolvedValue(true);

    // Llamada a la función
    await handleBienes('Modificar bien');

    // Expectativas
    //expect(promptMockId).toHaveBeenCalled();
    expect(buscarBienIdMock).toHaveBeenCalledWith('1');
    expect(promptMockDatos).toHaveBeenCalled();
    expect(modificarBienMock).toHaveBeenCalledWith('1', expect.objectContaining({
      id: '1',
      nombre: 'Oren',
      descripcion: 'Moneda de curso legal en los Reinos del Norte.',
      material: 'Oro',
      peso: 0.01,
      valor: 1
    }));
    expect(modificarBienMock).toHaveBeenCalledTimes(1);
  });

  // Test para "Ver bienes"
  test('Ver bienes', async () => {
    // Mock de listarBienes
    const listarBienesMock = vi.spyOn(Inventario, 'listarBienes').mockResolvedValue([
      new Bien('68', 'Bien 1', 'Descripción 1', 'Madera', 10, 100),
      new Bien('69', 'Bien 2', 'Descripción 2', 'Metal', 20, 200)
    ]);

    // Mock de console.log
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Llamada a la función
    await handleBienes('Ver bienes');

    // Expectativas
    expect(listarBienesMock).toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledWith('Lista de bienes disponibles:');
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Bien 1'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Bien 2'));
  });
/**
  // Test para "Buscar bien"
  test("Debe encontrar un bien por su ID", async () => {
    // Mock de inquirer.prompt para ID del bien
    const promptMock = vi.spyOn(inquirer, "prompt").mockResolvedValueOnce({ id: "1" });

    // Mock de buscarBienPorId
    const bienMock = new Bien("1", "Oren", "Moneda de curso legal en los Reinos del Norte.", "Oro", 0.01, 1);
    const buscarBienMock = vi.spyOn(Inventario, "buscarBienPorId").mockResolvedValueOnce(bienMock);
    console.log("Valor recibido en buscarBienPorId:", bienMock);
    // Llamada a la función
    await handleBienes("Buscar bien");

    // Verificar que inquirer.prompt se llamó correctamente
    expect(promptMock).toHaveBeenCalled();
    expect(buscarBienMock).toHaveBeenCalledWith("1");

    // Restaurar mocks
    promptMock.mockRestore();
    buscarBienMock.mockRestore();
  });

  test('Buscar bien por Nombre', async () => {
    // Mock de inquirer.prompt para tipo de búsqueda
    const promptMockTipo = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ tipo: 'Oro' });

    // Mock de inquirer.prompt para Nombre del bien
    const promptMockNombre = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ nombre: 'Orens' });

    // Mock de buscarBienNombre
    const buscarBienNombreMock = vi.spyOn(Inventario, 'buscarBienNombre').mockResolvedValue(new Bien('1', 'Orens', 'Moneda de curso legal en los Reinos del Norte.', 'Oro', 0.01, 1));

    // Mock de console.log
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Llamada a la función
    await handleBienes('Buscar bien');

    // Expectativas
   // expect(promptMockTipo).toHaveBeenCalled();
    //expect(promptMockNombre).toHaveBeenCalled();
    //expect(buscarBienNombreMock).toHaveBeenCalledWith('Orens');
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Orens'));
  });

  test('Buscar bien por Descripción', async () => {
    // Mock de inquirer.prompt para tipo de búsqueda
    const promptMockTipo = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ tipo: 'descripcion' });

    // Mock de inquirer.prompt para Descripción del bien
    const promptMockDescripcion = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ descripcion: 'Moneda de curso legal en los Reinos del Norte.' });

    // Mock de buscarBienDescripcion
    const buscarBienDescripcionMock = vi.spyOn(Inventario, 'buscarBienDescripcion').mockResolvedValue([new Bien('1', 'Orens', 'Moneda de curso legal en los Reinos del Norte.', 'Oro', 0.01, 1)]);

    // Mock de console.log
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Llamada a la función
    await handleBienes('Buscar bien');

    // Expectativas
    ////expect(promptMockTipo).toHaveBeenCalled();
    //expect(promptMockDescripcion).toHaveBeenCalled();
    //expect(buscarBienDescripcionMock).toHaveBeenCalledWith('Moneda de curso legal en los Reinos del Norte.');
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Orens'));
  });

  test('Buscar bien por Material', async () => {
    // Mock de inquirer.prompt para tipo de búsqueda
    const promptMockTipo = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ tipo: 'material' });

    // Mock de inquirer.prompt para Material del bien
    const promptMockMaterial = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ material: 'Oro' });

    // Mock de buscarBienTipo
    const buscarBienTipoMock = vi.spyOn(Inventario, 'buscarBienTipo').mockResolvedValue([new Bien('1', 'Orens', 'Moneda de curso legal en los Reinos del Norte.', 'Oro', 0.01, 1)]);

    // Mock de console.log
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Llamada a la función
    await handleBienes('Buscar bien');

    // Expectativas
    //expect(promptMockTipo).toHaveBeenCalled();
    //expect(promptMockMaterial).toHaveBeenCalled();
    //expect(buscarBienTipoMock).toHaveBeenCalledWith('Oro');
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Orens'));
  });
  */
});



describe('main', () => {
  test('Salir del menú', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ opcion: 'Salir' });

    // Llamada a la función
    await main();

    // Expectativa
    expect(promptMock).toHaveBeenCalled();
  });
});

describe('handleClientes', () => {
  // Test para "Añadir cliente"
  test('Añadir cliente', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({
      id: '70',
      nombre: 'Cliente de prueba',
      raza: 'Humano',
      ubicacion: 'Novigrado',
      dinero: 500
    });

    // Mock de la función incluirCliente
    const incluirClienteMock = vi.spyOn(Inventario, 'incluirCliente').mockResolvedValue(undefined);

    // Llamada a la función
    await handleClientes('Añadir cliente');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(incluirClienteMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '70',
      nombre: 'Cliente de prueba',
      raza: 'Humano',
      ubicacion: 'Novigrado',
      dinero: 500
    }));
    expect(incluirClienteMock).toHaveBeenCalledTimes(1);
  });

  // Test para "Eliminar cliente"
  test('Eliminar cliente', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ id: '71' });

    // Mock de la función eliminarCliente
    const eliminarClienteMock = vi.spyOn(Inventario, 'eliminarCliente').mockResolvedValue(true);

    // Llamada a la función
    await handleClientes('Eliminar cliente');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(eliminarClienteMock).toHaveBeenCalledWith('71');
    expect(eliminarClienteMock).toHaveBeenCalledTimes(1);
  });
  /**
  // Test para "Modificar cliente"
  test('Modificar cliente', async () => {
    // Mock de inquirer.prompt para ID del cliente
    const promptMockId = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ id: '72' });

    // Mock de buscarClienteId
    const buscarClienteIdMock = vi.spyOn(Inventario, 'buscarClienteId').mockResolvedValue(new Cliente('72', 'Cliente original', 'Elfo', 'Oxenfurt', 300, []));

    // Mock de inquirer.prompt para nuevos datos del cliente
    const promptMockDatos = vi.spyOn(inquirer, 'prompt').mockResolvedValue({
      nombre: 'Cliente modificado',
      raza: 'Enano',
      ubicacion: 'Kaer Morhen',
      dinero: 600
    });

    // Mock de la función modificarCliente
    const modificarClienteMock = vi.spyOn(Inventario, 'modificarCliente').mockResolvedValue(true);

    // Llamada a la función
    await handleClientes('Modificar cliente');

    // Expectativas
    expect(promptMockId).toHaveBeenCalled();
    expect(buscarClienteIdMock).toHaveBeenCalledWith('72');
    expect(promptMockDatos).toHaveBeenCalled();
    expect(modificarClienteMock).toHaveBeenCalledWith('72', expect.objectContaining({
      id: '72',
      nombre: 'Cliente modificado',
      raza: 'Enano',
      ubicacion: 'Kaer Morhen',
      dinero: 600
    }));
    expect(modificarClienteMock).toHaveBeenCalledTimes(1);
  });
  */

  // Test para "Ver clientes"
  test('Ver clientes', async () => {
    // Mock de listarClientes
    const listarClientesMock = vi.spyOn(Inventario, 'listarClientes').mockResolvedValue([
      new Cliente('73', 'Cliente 1', 'Humano', 'Novigrado', 500, []),
      new Cliente('74', 'Cliente 2', 'Elfo', 'Oxenfurt', 300, [])
    ]);

    // Mock de console.log
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Llamada a la función
    await handleClientes('Ver clientes');

    // Expectativas
    expect(listarClientesMock).toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledWith('Lista de clientes:');
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Cliente 1'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Cliente 2'));
  });
});

describe('handleMercaderes', () => {
  // Test para "Añadir mercader"
  test('Añadir mercader', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({
      id: '75',
      nombre: 'Mercader de prueba',
      tipo: 'Armas',
      ubicacion: 'Novigrado',
      dinero: 1000
    });

    // Mock de la función incluirMercader
    const incluirMercaderMock = vi.spyOn(Inventario, 'incluirMercader').mockResolvedValue(undefined);

    // Llamada a la función
    await handleMercaderes('Añadir mercader');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(incluirMercaderMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '75',
      nombre: 'Mercader de prueba',
      tipo: 'Armas',
      ubicacion: 'Novigrado',
      dinero: 1000
    }));
    expect(incluirMercaderMock).toHaveBeenCalledTimes(1);
  });

  // Test para "Eliminar mercader"
  test('Eliminar mercader', async () => {
    // Mock de inquirer.prompt
    const promptMock = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ id: '76' });

    // Mock de la función eliminarMercader
    const eliminarMercaderMock = vi.spyOn(Inventario, 'eliminarMercader').mockResolvedValue(true);

    // Llamada a la función
    await handleMercaderes('Eliminar mercader');

    // Expectativas
    expect(promptMock).toHaveBeenCalled();
    expect(eliminarMercaderMock).toHaveBeenCalledWith('76');
    expect(eliminarMercaderMock).toHaveBeenCalledTimes(1);
  });
  /** 
  // Test para "Modificar mercader"
  test('Modificar mercader', async () => {
    // Mock de inquirer.prompt para ID del mercader
    const promptMockId = vi.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ id: '77' });

    // Mock de buscarMercaderId
    const buscarMercaderIdMock = vi.spyOn(Inventario, 'buscarMercaderId').mockResolvedValue(new Mercader('77', 'Mercader original', 'Armaduras', 'Oxenfurt', 800, []));

    // Mock de inquirer.prompt para nuevos datos del mercader
    const promptMockDatos = vi.spyOn(inquirer, 'prompt').mockResolvedValue({
      nombre: 'Mercader modificado',
      tipo: 'Pociones',
      ubicacion: 'Kaer Morhen',
      dinero: 1200
    });

    // Mock de la función modificarMercader
    const modificarMercaderMock = vi.spyOn(Inventario, 'modificarMercader').mockResolvedValue(true);

    // Llamada a la función
    await handleMercaderes('Modificar mercader');

    // Expectativas
    expect(promptMockId).toHaveBeenCalled();
    expect(buscarMercaderIdMock).toHaveBeenCalledWith('77');
    expect(promptMockDatos).toHaveBeenCalled();
    expect(modificarMercaderMock).toHaveBeenCalledWith('77', expect.objectContaining({
      id: '77',
      nombre: 'Mercader modificado',
      tipo: 'Pociones',
      ubicacion: 'Kaer Morhen',
      dinero: 1200
    }));
    expect(modificarMercaderMock).toHaveBeenCalledTimes(1);
  });

  // Test para "Ver mercaderes"
  test('Ver mercaderes', async () => {
    // Mock de listarMercaderes
    const listarMercaderesMock = vi.spyOn(Inventario, 'listarMercaderes').mockResolvedValue([
      new Mercader('78', 'Mercader 1', 'Armas', 'Novigrado', 1000, []),
      new Mercader('79', 'Mercader 2', 'Armaduras', 'Oxenfurt', 800, [])
    ]);

    // Mock de console.log
    const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Llamada a la función
    await handleMercaderes('Ver mercaderes');

    // Expectativas
    expect(listarMercaderesMock).toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledWith('Lista de mercaderes:');
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Mercader 1'));
    expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Mercader 2'));
  });
  */
});