import { describe, test, expect } from 'vitest';


//Base de datos con test correctos
// import { db } from ;

// Models con test correctos
import { Bien } from '../src/models/Bien';

import { Cliente } from '../src/models/Cliente';

import { Mercader } from '../src/models/Mercader';

// Services con test correctos
import { incluirBien, eliminarBien, modificarBien, buscarBienNombre, buscarBienTipo, buscarBienDescripcion, buscarBienPorId, listarBienes, listarClientes, listarMercaderes, incluirMercader, eliminarMercader, modificarMercader, buscarMercaderNombre, buscarMercaderTipo, buscarMercaderUbicacion, buscarMercaderId, incluirCliente, eliminarCliente, modificarCliente, buscarClienteNombre, buscarClienteRaza, buscarClienteUbicacion, buscarClienteId } from '../src/services/Inventario';

import { registrarVenta, registrarCompra, procesarDevolucion } from '../src/services/Transacciones';

//Tests
//Bien.ts
describe('Bien', () => {
  test('debería mostrar la información de un bien', () => {
    const bien = new Bien('1', 'Espada de plata', 'Espada forjada por enanos', 'Plata', 2.5, 1000);
    expect(bien.mostrarInfo()).toBe('Espada de plata - Espada forjada por enanos (Material: Plata, Peso: 2.5kg, Valor: 1000 coronas)');
  });
  test('debería mostrar la información de un bien con otro material', () => {
    const bien = new Bien('2', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3, 500);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3kg, Valor: 500 coronas)');
  });
  test('debería mostrar la información de un bien con otro peso', () => {
    const bien = new Bien('3', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 500);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 500 coronas)');
  });
  test('debería mostrar la información de un bien con otro valor', () => {
    const bien = new Bien('4', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 600);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 600 coronas)');
  });
  test('debería mostrar la información de un bien con otro nombre', () => {
    const bien = new Bien('5', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 600);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 600 coronas)');
  });
  test('debería mostrar la información de un bien con otra descripción', () => {
    const bien = new Bien('6', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 600);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 600 coronas)');
  });
  test('debería mostrar la información de un bien con otro id', () => {
    const bien = new Bien('7', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 600);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 600 coronas)');
  });
  test('debería mostrar la información de un bien con otro id, nombre, descripción, material, peso y valor', () => {
    const bien = new Bien('8', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 600);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 600 coronas)');
  });
  test('debería mostrar la información de un bien con otro id, nombre, descripción, material, peso y valor', () => {
    const bien = new Bien('9', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 600);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 600 coronas)');
  });
  test('debería mostrar la información de un bien con otro id, nombre, descripción, material, peso y valor', () => {
    const bien = new Bien('10', 'Espada de acero', 'Espada forjada por enanos', 'Acero', 3.5, 600);
    expect(bien.mostrarInfo()).toBe('Espada de acero - Espada forjada por enanos (Material: Acero, Peso: 3.5kg, Valor: 600 coronas)');
  });
});

//Cliente.ts
