import { describe, test, expect } from 'vitest';

//INFORMES NO ESTA TERMINADO

//Base de datos con test correctos
import { db , initDB } from '../src/base_datos/database';

// Models con test correctos
import { Bien } from '../src/models/Bien';

//Bien.ts 
describe("Bien", () => {
  test("Debe crear un objeto Bien con los valores correctos", () => {
    const bien = new Bien("1", "Espada", "Una espada afilada", "Acero", 3, 100);
    expect(bien.id).toBe("1");
    expect(bien.nombre).toBe("Espada");
    expect(bien.descripcion).toBe("Una espada afilada");
    expect(bien.material).toBe("Acero");
    expect(bien.peso).toBe(3);
    expect(bien.valor).toBe(100);
  });

  test("Debe mostrar la información del bien correctamente", () => {
    const bien = new Bien("2", "Escudo", "Un escudo resistente", "Hierro", 5, 150);
    expect(bien.mostrarInfo()).toBe("Escudo - Un escudo resistente (Material: Hierro, Peso: 5kg, Valor: 150 coronas)");
  });

  test("Debe devolver el nombre correctamente", () => {
    const bien = new Bien("3", "Casco", "Un casco de batalla", "Bronce", 2, 80);
    expect(bien.getNombre()).toBe("Casco");
  });

  test("Debe devolver la representación en string correctamente", () => {
    const bien = new Bien("4", "Lanza", "Una lanza larga", "Madera", 4, 120);
    expect(bien.toString()).toBe("Lanza (Madera, 4kg, 120 coronas)");
  });

  test("Debe crear un objeto Bien desde un objeto JSON", () => {
    const bienData = { id: "5", nombre: "Armadura", descripcion: "Armadura de placas", material: "Acero", peso: 10, valor: 500 };
    const bien = Bien.fromObject(bienData);
    expect(bien).toBeInstanceOf(Bien);
    expect(bien.nombre).toBe("Armadura");
  });

  test("Debe manejar correctamente un valor negativo de peso", () => {
    const bien = new Bien("6", "Poción", "Poción mágica", "Vidrio", -1, 50);
    expect(bien.peso).toBeLessThan(0);
  });

  test("Debe manejar correctamente un valor negativo de dinero", () => {
    const bien = new Bien("7", "Anillo", "Anillo dorado", "Oro", 0.5, -200);
    expect(bien.valor).toBeLessThan(0);
  });

  test("Debe aceptar valores en límite de peso", () => {
    const bien = new Bien("8", "Yelmo", "Protección para la cabeza", "Acero", 0, 300);
    expect(bien.peso).toBe(0);
  });

  test("Debe aceptar valores en límite de valor", () => {
    const bien = new Bien("9", "Daga", "Pequeña pero mortal", "Hierro", 1, 0);
    expect(bien.valor).toBe(0);
  });
});
 