import { describe, beforeAll, test, expect } from 'vitest';

// Base de datos
import { db, initDB } from '../src/base_datos/database';

// Modelos
import { Bien } from '../src/models/Bien';

// Servicios
import { 
  incluirBien, eliminarBien, buscarBienPorId, modificarBien , buscarBienNombre 
} from '../src/services/Inventario';

describe("Inventario", () => {
  beforeAll(() => {
    initDB(); // Inicializa la base de datos solo una vez
  });

  test("Debe incluir un bien correctamente", async () => {
    const bien = new Bien("46", "Espada", "Una espada afilada", "Acero", 3, 100);
    await incluirBien(bien);

    // Verificamos que el bien haya sido incluido
    const bienEncontrado = await buscarBienPorId("46");
    expect(bienEncontrado).toBeDefined();
    expect(bienEncontrado.nombre).toBe("Espada");
  });
  
  test("Debe eliminar un bien correctamente", async () => {
    const bien1 = new Bien("47", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien1);

    let str: string = "47";
    await eliminarBien(str);

    let str1: string = "46";
    await eliminarBien(str1);
  });

  test("Debe modificar un bien correctamente", async () => {
    const bien = new Bien("48", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien);

    const bienModificado = new Bien("48", "Espada de acero", "Una espada", "Acero", 3, 150);
    await modificarBien(bien.id, bienModificado);

    const bienEncontrado = await buscarBienPorId("48");
    expect(bienEncontrado).toBeDefined();
    expect(bienEncontrado.nombre).toBe("Espada de acero");
    expect(bienEncontrado.material).toBe("Acero");
    expect(bienEncontrado.valor).toBe(150);

    // Limpiamos la base de datos
    let str: string = "48";
    await eliminarBien(str);
  });

  test("Debe buscar un bien por ID correctamente", async () => {
    const bien = new Bien("48", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien);

    const bienEncontrado = await buscarBienPorId("48");
    expect(bienEncontrado).toBeDefined();
    expect(bienEncontrado.nombre).toBe("Espada");

    // Limpiamos la base de datos
    let str: string = "48";
    await eliminarBien(str);
  });

  test("Debe manejar correctamente un ID no existente", async () => {
    await expect(buscarBienPorId("49")).rejects.toThrow("Bien con ID 49 no encontrado");
  });

  test("Debe buscar un bien por nombre correctamente", async () => {
    const bien = new Bien("48", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien);

    const bienEncontrado = await buscarBienNombre("Espada");
    expect(bienEncontrado).toBeDefined();
    expect(bienEncontrado.nombre).toBe("Espada");

    // Limpiamos la base de datos
    let str: string = "48";
    await eliminarBien(str);
  });

  test("Debe manejar correctamente un nombre no existente", async () => {
    await expect(buscarBienNombre("Hacha")).rejects.toThrow("Bien con nombre Hacha no encontrado");
  });
  
});
