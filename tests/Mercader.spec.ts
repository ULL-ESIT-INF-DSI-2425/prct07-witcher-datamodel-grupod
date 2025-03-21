import { describe, test, expect } from 'vitest';

//INFORMES NO ESTA TERMINADO

// Models con test correctos
import { Bien } from '../src/models/Bien';

import { Mercader } from '../src/models/Mercader';

//Mercader.ts

describe("Mercader", () => {
  test("Debe crear un objeto Mercader con los valores correctos", () => {
    const mercader = new Mercader("1", "Geralt", "Brujo", "Rivia", 500, []);
    expect(mercader.id).toBe("1");
    expect(mercader.nombre).toBe("Geralt");
    expect(mercader.tipo).toBe("Brujo");
    expect(mercader.ubicacion).toBe("Rivia");
    expect(mercader.dinero).toBe(500);
    expect(mercader.bienes).toHaveLength(0);
  });

  test("Sacar dienro", () => {
    const mercader = new Mercader("1", "Geralt", "Brujo", "Rivia", 500, []);
    expect(mercader.getDinero()).toBe(500);
  });

  test("Debe agregar bienes correctamente", () => {
    const bien = new Bien("13", "Varita", "Varita mágica", "Madera", 0.5, 200);
    const mercader = new Mercader("2", "Yennefer", "Hechicera", "Vengerberg", 1000, [bien]);
    expect(mercader.bienes).toHaveLength(1);
    expect(mercader.bienes[0].nombre).toBe("Varita");
  });

  test("Debe mostrar la información del mercader correctamente", () => {
    const bien = new Bien("14", "Poción", "Poción de salud", "Vidrio", 0.3, 100);
    const mercader = new Mercader("3", "Triss", "Hechicera", "Maribor", 1500, [bien]);
    expect(mercader.mostrarInfo()).toBe("Triss (Hechicera) - Ubicación: Maribor - Bienes: [Poción (Vidrio, 0.3kg, 100 coronas)]");
  });

  test("Debe manejar mercader sin bienes", () => {
    const mercader = new Mercader("4", "Jaskier", "Bardo", "Oxenfurt", 200, []);
    expect(mercader.mostrarInfo()).toBe("Jaskier (Bardo) - Ubicación: Oxenfurt - Bienes: []");
  });

  test("Debe crear un objeto Mercader desde un objeto JSON", () => {
    const mercaderData = {
      id: "5",
      nombre: "Ciri",
      tipo: "Brujo",
      ubicacion: "Cintra",
      dinero: 2000,
      bienes: [{ id: "15", nombre: "Grial", descripcion: "Grial sagrado", material: "Oro", peso: 1, valor: 1000 }]
    };
    const mercader = Mercader.fromObject(mercaderData);
    expect(mercader).toBeInstanceOf(Mercader);
    expect(mercader.bienes).toHaveLength(1);
  });

  test("Debe aceptar mercaderes con dinero negativo", () => {
    const mercader = new Mercader("6", "Eskel", "Brujo", "Kaer Morhen", -500, []);
    expect(mercader.dinero).toBeLessThan(0);
  });

  test("Debe aceptar mercaderes con ubicación vacía", () => {
    const mercader = new Mercader("7", "Vesemir", "Brujo", "", 100, []);
    expect(mercader.ubicacion).toBe("");
  });

  test("Debe aceptar mercaderes con tipo vacío", () => {
    const mercader = new Mercader("8", "Lambert", "", "Kaer Morhen", 200, []);
    expect(mercader.tipo).toBe("");
  });

  test("Debe aceptar mercaderes con nombre vacío", () => {
    const mercader = new Mercader("9", "", "Brujo", "Kaer Morhen", 500, []);
    expect(mercader.nombre).toBe("");
  });

  test("Debe aceptar mercaderes con id vacío", () => {
    const mercader = new Mercader("", "Coën", "Brujo", "Kaer Morhen", 1000, []);
    expect(mercader.id).toBe("");
  });

  test("Debe aceptar mercaderes sin bienes", () => {
    const mercader = new Mercader("10", "Vesemir", "Brujo", "Kaer Morhen", 200, []);
    expect(mercader.bienes).toHaveLength(0);
  });

  test("Debe aceptar mercaderes con bienes vacíos", () => {
    const mercader = new Mercader("11", "Lambert", "Brujo", "Kaer Morhen", 500, []);
    expect(mercader.bienes).toHaveLength(0);
  });

});
