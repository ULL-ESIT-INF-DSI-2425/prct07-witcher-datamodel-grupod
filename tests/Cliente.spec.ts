import { describe, test, expect } from 'vitest';

// Models con test correctos
import { Bien } from '../src/models/Bien';

import { Cliente } from '../src/models/Cliente';

//Cliente.ts
describe("Cliente", () => {
  test("Debe crear un objeto Cliente con los valores correctos", () => {
    const cliente = new Cliente("1", "Alduin", "Dragón", "Montaña", 1000, []);
    expect(cliente.id).toBe("1");
    expect(cliente.nombre).toBe("Alduin");
    expect(cliente.raza).toBe("Dragón");
    expect(cliente.ubicacion).toBe("Montaña");
    expect(cliente.dinero).toBe(1000);
    expect(cliente.bienes).toHaveLength(0);
  });

  test("Debe agregar bienes correctamente", () => {
    const bien = new Bien("10", "Collar", "Un collar de perlas", "Perlas", 0.2, 500);
    const cliente = new Cliente("2", "Elrond", "Elfo", "Bosque", 2000, [bien]);
    expect(cliente.bienes).toHaveLength(1);
    expect(cliente.bienes[0].nombre).toBe("Collar");
  });

  test("Debe mostrar la información del cliente correctamente", () => {
    const bien = new Bien("11", "Pergamino", "Pergamino antiguo", "Papel", 0.1, 300);
    const cliente = new Cliente("3", "Gandalf", "Mago", "Torre", 5000, [bien]);
    expect(cliente.mostrarInfo()).toBe("Gandalf (Mago) - Ubicación: Torre - Bienes: [Pergamino (Papel, 0.1kg, 300 coronas)]");
  });

  test("Debe manejar cliente sin bienes", () => {
    const cliente = new Cliente("4", "Frodo", "Hobbit", "La Comarca", 50, []);
    expect(cliente.mostrarInfo()).toBe("Frodo (Hobbit) - Ubicación: La Comarca - Bienes: []");
  });

  test("Debe crear un objeto Cliente desde un objeto JSON", () => {
    const clienteData = {
      id: "5",
      nombre: "Thorin",
      raza: "Enano",
      ubicacion: "Erebor",
      dinero: 10000,
      bienes: [{ id: "12", nombre: "Hacha", descripcion: "Hacha de guerra", material: "Hierro", peso: 5, valor: 800 }]
    };
    const cliente = Cliente.fromObject(clienteData);
    expect(cliente).toBeInstanceOf(Cliente);
    expect(cliente.bienes).toHaveLength(1);
  });

  test("Debe aceptar clientes con dinero negativo", () => {
    const cliente = new Cliente("6", "Smaug", "Dragón", "Montaña", -1000, []);
    expect(cliente.dinero).toBeLessThan(0);
  });

  test("Debe aceptar clientes con ubicación vacía", () => {
    const cliente = new Cliente("7", "Legolas", "Elfo", "", 500, []);
    expect(cliente.ubicacion).toBe("");
  });

  test("Debe aceptar clientes con raza vacía", () => {
    const cliente = new Cliente("8", "Bilbo", "", "La Comarca", 200, []);
    expect(cliente.raza).toBe("");
  });

  test("Debe aceptar clientes con nombre vacío", () => {
    const cliente = new Cliente("9", "", "Hobbit", "La Comarca", 100, []);
    expect(cliente.nombre).toBe("");
  });

  test("Debe aceptar clientes con id vacío", () => {
    const cliente = new Cliente("", "Gimli", "Enano", "Erebor", 1000, []);
    expect(cliente.id).toBe("");
  });

  test("Debe aceptar clientes con bienes vacíos", () => {
    const cliente = new Cliente("10", "Gollum", "Hobbit", "Cueva", 50, []);
    expect(cliente.bienes).toHaveLength(0);
  });

  test("Debe aceptar clientes con bienes vacíos", () => {
    const cliente = new Cliente("11", "Gollum", "Hobbit", "Cueva", 50, []);
    expect(cliente.bienes).toHaveLength(0);
  });
  
});
