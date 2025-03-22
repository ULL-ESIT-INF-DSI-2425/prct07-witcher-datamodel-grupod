import { describe, test, expect } from "vitest";
import { db, initDB } from "../src/base_datos/database";

describe("Database", () => {
  test("initDB", async () => {
    await initDB(); // Esperamos a que initDB termine
    expect(db.data).toBeDefined(); // Verificamos que los datos existan
  });
});
