import { describe, beforeAll, test, expect } from 'vitest';

// Base de datos
import { db, initDB } from '../src/base_datos/database';

// Modelos
import { Bien } from '../src/models/Bien';

import { Mercader } from '../src/models/Mercader';

import { Cliente } from '../src/models/Cliente';

// Servicios
import { 
  incluirBien, eliminarBien, buscarBienPorId, modificarBien , buscarBienNombre ,
  buscarBienTipo, listarBienes, buscarBienDescripcion,
  incluirMercader, eliminarMercader, modificarMercader, buscarMercaderId,
  listarMercaderes, buscarMercaderNombre, buscarMercaderTipo, buscarMercaderUbicacion,
  incluirCliente, eliminarCliente, modificarCliente, buscarClienteId,
  listarClientes, buscarClienteNombre, buscarClienteRaza, buscarClienteUbicacion

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

  test("eliminarBien devuelve false si el bien no existe", async () => {
    const resultado = await eliminarBien("9999"); // ID inexistente
  
    expect(resultado).toBe(false);
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

  test("Debe modificar mal un bien correctamente", async () => {
    const bien = new Bien("48", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien);

    const resultado = await modificarBien("49", bien);
    expect(resultado).toBe(false);
    //eliminamos el bien
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
  
  test("Debe buscar un bien por tipo correctamente", async () => {
    const bien = new Bien("48", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien);

    const bienEncontrado = await buscarBienTipo("Hierro");
    expect(bienEncontrado).toBeDefined();
    expect(bienEncontrado[0].material).toBe("Hierro");

    // Limpiamos la base de datos
    let str: string = "48";
    await eliminarBien(str);
  });

  test("Debe buscar un bien por descripción correctamente", async () => {
    const bien = new Bien("48", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien);

    const bienEncontrado = await buscarBienDescripcion("Una espada");
    expect(bienEncontrado).toBeDefined();
    expect(bienEncontrado[0].descripcion).toBe("Una espada");

    // Limpiamos la base de datos
    let str: string = "48";
    await eliminarBien(str);
  });

  test("Debe listar los bienes correctamente", async () => {
    const bien = new Bien("48", "Espada", "Una espada", "Hierro", 3, 100);
    await incluirBien(bien);

    const bienes = await listarBienes();
    expect(bienes).toBeDefined();
    expect(bienes.length).toBeGreaterThan(0);

    // Limpiamos la base de datos
    let str: string = "48";
    await eliminarBien(str);
  });

  test("listarBienes ordena alfabéticamente de manera ascendente", async () => {
    const bienes = await listarBienes("asc_alf");
    
    //Si se añade o elimina o modifica cualquier bien, este test fallará
    expect(bienes.map(b => b.nombre)).toEqual([
      "Aceite de espectros",
      "Aerondight",
      "Amuleto de Lobo Blanco",
      "Anillo de la Logia",
      "Armadura de Zirael",
      "Ballesta de Fisstech",
      "Botas de la Víbora",
      "Contrato de Bestia",
      "Contrato de Djinn",
      "Corazón de Gólem",
      "Cráneo de Beann'shie",
      "Decocción de Ekhidna",
      "Espada de Acero de Brujo",
      "Espada Harvall",
      "Flor de Mandrágora",
      "Garra de Leshen",
      "Guanteletes del Grifo",
      "Iris",
      "Llave de la Cripta de Kaer Morhen",
      "Máscara de Uroboros",
      "Medallón de la Escuela del Gato",
      "Orens",
      "Pata de Kikimora",
      "Pergamino de Runas",
      "Pluma de Basilisco",
      "Reliquia de Lara Dorren",
      "Tónico de Katakan",
      "Trofeo de Quimera",
      "Vino de Toussaint",
    ]);
  });
  
  test("listarBienes ordena alfabéticamente de manera descendente", async () => {
    const bienes = await listarBienes("desc_alf");
  
    expect(bienes.map(b => b.nombre)).toEqual([
      "Vino de Toussaint",
      "Trofeo de Quimera",
      "Tónico de Katakan",
      "Reliquia de Lara Dorren",
      "Pluma de Basilisco",
      "Pergamino de Runas",
      "Pata de Kikimora",
      "Orens",
      "Medallón de la Escuela del Gato",
      "Máscara de Uroboros",
      "Llave de la Cripta de Kaer Morhen",
      "Iris",
      "Guanteletes del Grifo",
      "Garra de Leshen",
      "Flor de Mandrágora",
      "Espada Harvall",
      "Espada de Acero de Brujo",
      "Decocción de Ekhidna",
      "Cráneo de Beann'shie",
      "Corazón de Gólem",
      "Contrato de Djinn",
      "Contrato de Bestia",
      "Botas de la Víbora",
      "Ballesta de Fisstech",
      "Armadura de Zirael",
      "Anillo de la Logia",
      "Amuleto de Lobo Blanco",
      "Aerondight",
      "Aceite de espectros",
    ]);
  });

  test("listarBienes ordena por valor de manera ascendente", async () => {
    const bienes = await listarBienes("asc_valor");
  
    expect(bienes.map(b => b.valor)).toEqual([
      1, 150, 200, 350, 400, 500, 500, 600, 650, 750, 800, 800, 950, 1000, 1200, 1200, 
      1200, 1400, 1470, 1500, 1800, 2000, 2500, 2500, 3000, 3200, 3490, 5000, 5000
    ]);
    
  });

  test("listarBienes ordena por valor de manera descendente", async () => {
    const bienes = await listarBienes("desc_valor");

    expect(bienes.map(b => b.valor)).toEqual([
      5000, 5000, 3490, 3200, 3000, 2500, 2500, 2000, 1800, 1500, 1470, 1400, 1200, 1200, 1200, 1000, 
      950, 800, 800, 750, 650, 600, 500, 500, 400, 350,
      200, 150, 1

    ]);
  });

  test("Debe incluir un mercader correctamente", async () => {
    const mercader = {
      id: "20",
      nombre: "Vesemir",
      tipo: "Armero",
      ubicacion: "Kaer Morhen",
      dinero: 1000,
      bienes: []
    };

    expect(mercader.id).toBe("20");
    expect(mercader.nombre).toBe("Vesemir");
    expect(mercader.tipo).toBe("Armero");
    expect(mercader.ubicacion).toBe("Kaer Morhen");
    expect(mercader.dinero).toBe(1000);
    expect(mercader.bienes).toStrictEqual([]);

    const m1= new Mercader(mercader.id, mercader.nombre, mercader.tipo, mercader.ubicacion, mercader.dinero, mercader.bienes);
    await incluirMercader(m1);
    //Limpiamos la base de datos
    let str: string = "20";
    await eliminarMercader(str);

  });

  test("Debe incluir un mercader correctamente", async () => {
    const mercader = new Mercader("20", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    // Verificamos que el mercader haya sido incluido
    const mercaderEncontrado = await buscarMercaderId("20");
    expect(mercaderEncontrado).toBeDefined();
    expect(mercaderEncontrado.nombre).toBe("Vesemir");

    // Limpiamos la base de datos
    let str: string = "20";
    await eliminarMercader(str);
  });
  
  test("Debe eliminar un mercader correctamente", async () => {
    const mercader = new Mercader("20", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    let str: string = "20";
    await eliminarMercader(str);
  });

  test("eliminarMercader devuelve false si el mercader no existe", async () => {
    const resultado = await eliminarMercader("9999"); // ID inexistente

    expect(resultado).toBe(false);
  });

  test("Debe modificar un mercader correctamente", async () => {
    const mercader = new Mercader("20", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    const mercaderModificado = new Mercader("20", "Vesemir", "Armero", "Kaer Morhen", 1500, []);
    await modificarMercader(mercader.id, mercaderModificado);

    const mercaderEncontrado = await buscarMercaderId("20");
    expect(mercaderEncontrado).toBeDefined();
    expect(mercaderEncontrado.dinero).toBe(1500);

    // Limpiamos la base de datos
    let str: string = "20";
    await eliminarMercader(str);
  });

  test("Debe modificar mal un mercader correctamente", async () => {
    const mercader = new Mercader("30", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    const resultado = await modificarMercader("51", mercader);
    expect(resultado).toBe(false);
    //eliminamos el mercader
    let str: string = "20";
    await eliminarMercader(str);
  });

  test("Debe buscar un mercader por ID correctamente", async () => {
    const mercader = new Mercader("21", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    const mercaderEncontrado = await buscarMercaderId("21");
    expect(mercaderEncontrado).toBeDefined();
    expect(mercaderEncontrado.nombre).toBe("Vesemir");

    // Limpiamos la base de datos
    let str: string = "21";
    await eliminarMercader(str);
  });

  test("Debe manejar correctamente un ID no existente", async () => {
    await expect(buscarMercaderId("22")).rejects.toThrow("Mercader con ID 22 no encontrado");
  });

  test("Debe listar los mercaderes correctamente", async () => {
    const mercader = new Mercader("23", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    const mercaderes = await listarMercaderes();
    expect(mercaderes).toBeDefined();
    expect(mercaderes.length).toBeGreaterThan(0);

    // Limpiamos la base de datos
    let str: string = "23";
    await eliminarMercader(str);
  });

  test("Debe buscar un mercader por nombre correctamente", async () => {
    const mercader = new Mercader("24", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    const mercaderEncontrado = await buscarMercaderNombre("Vesemir");
    expect(mercaderEncontrado).toBeDefined();
    expect(mercaderEncontrado.nombre).toBe("Vesemir");

    // Limpiamos la base de datos
    let str: string = "24";
    await eliminarMercader(str);
  });

  test("Debe manejar correctamente un nombre no existente", async () => {
    await expect(buscarMercaderNombre("Lambert")).rejects.toThrow("Mercader con nombre Lambert no encontrado");
  });

  test("Debe buscar un mercader por tipo correctamente", async () => {
    const mercader = new Mercader("25", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    const mercaderEncontrado = await buscarMercaderTipo("Armero");
    expect(mercaderEncontrado).toBeDefined();
    expect(mercaderEncontrado[0].tipo).toBe("Armero");

    // Limpiamos la base de datos
    let str: string = "25";
    await eliminarMercader(str);
  });

  test("Debe buscar un mercader por ubicación correctamente", async () => {
    const mercader = new Mercader("26", "Vesemir", "Armero", "Kaer Morhen", 1000, []);
    await incluirMercader(mercader);

    const mercaderEncontrado = await buscarMercaderUbicacion("Kaer Morhen");
    expect(mercaderEncontrado).toBeDefined();
    expect(mercaderEncontrado[0].ubicacion).toBe("Kaer Morhen");

    // Limpiamos la base de datos
    let str: string = "26";
    await eliminarMercader(str);
  });

  test("Debe incluir un cliente correctamente", async () => {
    const cliente = new Cliente("30", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    // Verificamos que el cliente haya sido incluido
    const clienteEncontrado = await buscarClienteId("30");
    expect(clienteEncontrado).toBeDefined();
    expect(clienteEncontrado.nombre).toBe("Geralt");

    // Limpiamos la base de datos
    let str: string = "30";
    await eliminarCliente(str);
  });

  test("Debe eliminar un cliente correctamente", async () => {
    const cliente = new Cliente("30", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    let str: string = "30";
    await eliminarCliente(str);
  });

  test("eliminarCliente devuelve false si el cliente no existe", async () => {
    const resultado = await eliminarCliente("9999"); // ID inexistente

    expect(resultado).toBe(false);
  });

  test("Debe modificar un cliente correctamente", async () => {
    const cliente = new Cliente("30", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    const clienteModificado = new Cliente("30", "Geralt", "Brujo", "Rivia", 1500, []);
    await modificarCliente(cliente.id, clienteModificado);

    const clienteEncontrado = await buscarClienteId("30");
    expect(clienteEncontrado).toBeDefined();
    expect(clienteEncontrado.dinero).toBe(1500);

    // Limpiamos la base de datos
    let str: string = "30";
    await eliminarCliente(str);
  });

  test("Debe modificar mal un cliente correctamente", async () => {
    const cliente = new Cliente("30", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    const resultado = await modificarCliente("51", cliente);
    expect(resultado).toBe(false);
    //eliminamos el cliente
    let str: string = "30";
    await eliminarCliente(str);
  });

  test("Debe buscar un cliente por ID correctamente", async () => {
    const cliente = new Cliente("31", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    const clienteEncontrado = await buscarClienteId("31");
    expect(clienteEncontrado).toBeDefined();
    expect(clienteEncontrado.nombre).toBe("Geralt");

    // Limpiamos la base de datos
    let str: string = "31";
    await eliminarCliente(str);
  });

  test("Debe manejar correctamente un ID no existente", async () => {
    await expect(buscarClienteId("32")).rejects.toThrow("Cliente con ID 32 no encontrado");
  });

  test("Debe listar los clientes correctamente", async () => {
    const cliente = new Cliente("33", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    const clientes = await listarClientes();
    expect(clientes).toBeDefined();
    expect(clientes.length).toBeGreaterThan(0);

    // Limpiamos la base de datos
    let str: string = "33";
    await eliminarCliente(str);
  });

  test("Debe buscar un cliente por nombre correctamente", async () => {
    const cliente = new Cliente("34", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    const clienteEncontrado = await buscarClienteNombre("Geralt");
    expect(clienteEncontrado).toBeDefined();
    expect(clienteEncontrado.nombre).toBe("Geralt");

    // Limpiamos la base de datos
    let str: string = "34";
    await eliminarCliente(str);
  });

  test("Debe manejar correctamente un nombre no existente", async () => {
    await expect(buscarClienteNombre("Yennefer")).rejects.toThrow("Cliente con nombre Yennefer no encontrado");
  });

  test("Debe buscar un cliente por raza correctamente", async () => {
    const cliente = new Cliente("35", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    const clienteEncontrado = await buscarClienteRaza("Brujo");
    expect(clienteEncontrado).toBeDefined();
    expect(clienteEncontrado[0].raza).toBe("Brujo");

    // Limpiamos la base de datos
    let str: string = "35";
    await eliminarCliente(str);
  });

  test("Debe buscar un cliente por ubicación correctamente", async () => {
    const cliente = new Cliente("36", "Geralt", "Brujo", "Rivia", 1000, []);
    await incluirCliente(cliente);

    const clienteEncontrado = await buscarClienteUbicacion("Rivia");
    expect(clienteEncontrado).toBeDefined();
    expect(clienteEncontrado[0].ubicacion).toBe("Rivia");

    // Limpiamos la base de datos
    let str: string = "36";
    await eliminarCliente(str);
  });

  test("Debe manejar correctamente un ID no existente", async () => {
    await expect(buscarClienteId("37")).rejects.toThrow("Cliente con ID 37 no encontrado");
  });

});
