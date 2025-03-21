//File: menu.spec.ts

import { describe, test, expect } from 'vitest';
 
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

//Test de la funcionalidad de menu
describe('Menu', () => {
  test('Menu', () => {
    expect(1).toBe(1);
  });
}
);