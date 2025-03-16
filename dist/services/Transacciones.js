export {};
/**
 * HECHO CON IA PARA EJMPLO, DEBE CAMBIARSE

//Registra una venta de un bien a un cliente.

export async function registrarVenta(bienId: string, clienteId: string) {
  await db.read();

  const bien = db.data.bienes.find(b => b.id === bienId);
  const cliente = db.data.clientes.find(c => c.id === clienteId);

  if (!bien || !cliente) {
    throw new Error("Bien o cliente no encontrado.");
  }

  // Simulación de transacción (podríamos registrar en otro JSON si queremos historial)
  console.log(`💰 Venta realizada: ${bien.nombre} vendido a ${cliente.nombre} por ${bien.valor} coronas.`);

  // Eliminar el bien del inventario
  db.data.bienes = db.data.bienes.filter(b => b.id !== bienId);
  await db.write();
}

//Registra una compra de un bien a un mercader.
export async function registrarCompra(bien: Bien, mercaderId: string) {
  await db.read();

  const mercader = db.data.mercaderes.find(m => m.id === mercaderId);
  if (!mercader) {
    throw new Error("Mercader no encontrado.");
  }

  db.data.bienes.push(bien);
  await db.write();
  console.log(`📦 Compra realizada: ${bien.nombre} adquirido de ${mercader.nombre}.`);
}

//Procesa una devolución de un bien por parte de un cliente o mercader.
export async function procesarDevolucion(bienId: string, origen: "cliente" | "mercader") {
  await db.read();

  const bien = db.data.bienes.find(b => b.id === bienId);
  if (!bien) {
    throw new Error("Bien no encontrado.");
  }

  console.log(`🔄 Devolución procesada: ${bien.nombre} devuelto por un ${origen}.`);
}
*/ 
