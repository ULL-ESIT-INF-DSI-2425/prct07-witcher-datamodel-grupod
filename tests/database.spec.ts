import { describe, test, expect } from 'vitest';

//Base de datos con test correctos
import { db , initDB } from '../src/base_datos/database';


describe('Database', () => {
  // Test para inicializar la base de datos
  test('initDB', async () => {
    await initDB();
  });
});
