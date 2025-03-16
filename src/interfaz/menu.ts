import inquirer from "inquirer"; // Importa la librería inquirer para interactuar con el usuario a través de la consola
import { initDB } from "../base_datos/database.js"; // Importa la función para inicializar la base de datos
import { incluirBien, listarBienes, eliminarBien, modificarBien, buscarBienTipo, buscarBienPorId, buscarBienDescripcion, buscarBienNombre, 
         incluirCliente, listarClientes, eliminarCliente, modificarCliente, buscarClienteId, buscarClienteNombre, buscarClienteRaza, buscarClienteUbicacion,
         incluirMercader, listarMercaderes, eliminarMercader, modificarMercader, buscarMercaderId, buscarMercaderNombre, buscarMercaderTipo, buscarMercaderUbicacion } 
         from "../services/Inventario.js"; // Importa las funciones para añadir y listar bienes del inventario
import { registrarCompra, registrarVenta, procesarDevolucion } from "../services/Transacciones.js"; // Importa las funciones para manejar los bienes del inventario
import { Bien } from "../models/Bien.js"; // Importa la clase Bien que representa un bien en el inventario
import { Mercader } from "../models/Mercader.js"; // Importa la clase Mercader que representa un mercader en el juego
import { Cliente } from "../models/Cliente.js"; // Importa la clase Cliente que representa un cliente en el juego
import { Transaccion } from "../services/Transacciones.js"; //

async function main() {
  await initDB(); // Inicializa la base de datos

  // Pregunta al usuario qué acción desea realizar
  const respuesta = await inquirer.prompt([
      { type: "list", name: "opcion", message: "¿Qué deseas hacer?", choices: ["Realizar venta",
                                                                               "Añadir cliente", "Ver clientes", "Eliminar cliente", "Modificar cliente", "Buscar cliente",
                                                                               "Añadir mercader", "Ver mercaderes", "Eliminar mercader", "Modificar mercader", "Buscar mercader",
                                                                               "Añadir bien", "Eliminar bien", "Modificar bien", "Ver bienes", "Buscar bien", "Salir"] }
  ]);

  if (respuesta.opcion.includes("bien")) {
    await handleBienes(respuesta.opcion);
  } 
  else if (respuesta.opcion.includes("cliente")) {
    await handleClientes(respuesta.opcion);
  }
  else if (respuesta.opcion.includes("mercader")) {
    await handleMercaderes(respuesta.opcion);
  }
  else if (respuesta.opcion === "Realizar venta") {
    await handleTransacciones(respuesta.opcion);
  }
  else {
    console.log("Saliendo...");
    return;
  }

  // Si el usuario no elige "Salir", se vuelve a ejecutar la función main para permitir más acciones
  if (respuesta.opcion !== "Salir") main();
}

async function handleBienes(opcion: string) {
  if (opcion === "Añadir bien") {
    // Si el usuario elige "Añadir bien", se le pide que ingrese los detalles del nuevo bien
    const nuevoBien = await inquirer.prompt([
      { type: "input", name: "id", message: "ID del bien:" },
      { type: "input", name: "nombre", message: "Nombre del bien:" },
      { type: "input", name: "descripcion", message: "Descripción del bien:" },
      { type: "input", name: "material", message: "Material:" },
      { type: "number", name: "peso", message: "Peso (kg):" },
      { type: "number", name: "valor", message: "Valor en coronas:" }
    ]);
      
    // Crea una nueva instancia de Bien con los datos ingresados y la añade al inventario
    await incluirBien(new Bien(nuevoBien.id, nuevoBien.nombre, nuevoBien.descripcion, nuevoBien.material, nuevoBien.peso, nuevoBien.valor));
    console.log("Bien agregado exitosamente.");
  } 
  else if (opcion === "Eliminar bien") {
    // Si el usuario elige "Eliminar bien", se le pide que ingrese el ID del bien a eliminar
    const idBien = await inquirer.prompt([{ type: "input", name: "id", message: "ID del bien a eliminar:" }]);
    // Elimina el bien del inventario y muestra un mensaje de éxito o error
    if (await eliminarBien(idBien.id)) console.log("Bien eliminado exitosamente.");
    else console.log("No se encontró un bien con ese ID.");
  }
  else if (opcion === "Modificar bien") {
    // Si el usuario elige "Modificar bien", se le pide que ingrese el ID del bien a modificar
    const idBien = await inquirer.prompt([{ type: "input", name: "id", message: "ID del bien a modificar:" }]);
    // Busca el bien en el inventario y muestra un mensaje de error si no se encuentra
    const bien = await buscarBienPorId(idBien.id);
    if (!bien) {
      console.log("No se encontró un bien con ese ID.");
      return;
    }
    // Pide al usuario que ingrese los nuevos detalles del bien
    const nuevoBien = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nuevo nombre del bien:", default: bien.nombre },
      { type: "input", name: "descripcion", message: "Nueva descripción del bien:", default: bien.descripcion },
      { type: "input", name: "material", message: "Nuevo material:", default: bien.material },
      { type: "number", name: "peso", message: "Nuevo peso (kg):", default: bien.peso },
      { type: "number", name: "valor", message: "Nuevo valor en coronas:", default: bien.valor }
    ]);
    // Crea una nueva instancia de Bien con los datos ingresados y modifica el bien en el inventario
    await modificarBien(idBien.id, new Bien(idBien.id, nuevoBien.nombre, nuevoBien.descripcion, nuevoBien.material, nuevoBien.peso, nuevoBien.valor));
    console.log("Bien modificado exitosamente.");
  }
  else if (opcion === "Buscar bien") {
    // Si el usuario elige "Buscar bien", se le pide que ingrese el tipo de búsqueda a realizar
    const tipoBusqueda = await inquirer.prompt([
        { type: "list", name: "tipo", message: "¿Cómo deseas buscar el bien?", choices: ["ID", "Nombre", "Descripción", "Material"] }
    ]);

    let bien: Bien | Bien[] = [];  // Inicializar bien como un arreglo vacío
    switch (tipoBusqueda.tipo) {
        case "ID":
            const idBien = await inquirer.prompt([{ type: "input", name: "id", message: "ID del bien a buscar:" }]);
            bien = await buscarBienPorId(idBien.id);
            break;
        case "Nombre":
            const nombreBien = await inquirer.prompt([{ type: "input", name: "nombre", message: "Nombre del bien a buscar:" }]);
            bien = await buscarBienNombre(nombreBien.nombre);
            break;
        case "Descripción":
            const descripcionBien = await inquirer.prompt([{ type: "input", name: "descripcion", message: "Descripción del bien a buscar:" }]);
            bien = await buscarBienDescripcion(descripcionBien.descripcion);
            break;
        case "Material":
            const materialBien = await inquirer.prompt([{ type: "input", name: "material", message: "Material del bien a buscar:" }]);
            bien = await buscarBienTipo(materialBien.material);
            break;
    }

    // Verificación de tipo y muestra de la información
    if (Array.isArray(bien)) {
      if (bien.length > 0) {
        // Pregunta al usuario cómo desea ordenar los resultados
        const orden = await inquirer.prompt([
          { type: "list", name: "orden", message: "¿Cómo deseas ordenar los resultados?", choices: ["Ascendente (alfabético)", "Descendente (alfabético)", "Ascendente (valor)", "Descendente (valor)"] }
        ]);

        // Ordena los bienes según la elección del usuario
        let ordenar = "asc_alf";
        if (orden.orden === "Ascendente (alfabético)") {
          ordenar = "asc_alf";
        } else if (orden.orden === "Descendente (alfabético)") {
          ordenar = "desc_alf";
        } else if (orden.orden === "Ascendente (valor)") {
          ordenar = "asc_valor";
        } else if (orden.orden === "Descendente (valor)") {
          ordenar = "desc_valor";
        }

        bien = await listarBienes(ordenar);

        console.log("Bienes encontrados:");
        bien.forEach((b) => {
          if (b instanceof Bien) {
            console.log(b.mostrarInfo());
          } else {
            console.log("Error: El objeto encontrado no es un bien válido.");
          }
        });
      } 
      else {
        console.log("No se encontraron bienes con esos criterios.");
      }
    } 
    else if (bien instanceof Bien) {
      console.log(bien.mostrarInfo());
    } 
    else {
      console.log("No se encontró un bien con esos criterios de búsqueda.");
    }

  }
  else if (opcion === "Ver bienes") {
    // Si el usuario elige "Ver bienes", se obtiene la lista de bienes del inventario y se muestra en la consola
    const bienes = await listarBienes();
    console.log("Lista de bienes disponibles:");
    bienes.forEach((bien) => console.log(bien.mostrarInfo()));
  }
}

async function handleMercaderes(opcion: string) {
  if (opcion === "Añadir mercader") {
    const nuevoMercader = await inquirer.prompt([
      { type: "input", name: "id", message: "ID del mercader:" },
      { type: "input", name: "nombre", message: "Nombre del mercader:" },
      { type: "input", name: "tipo", message: "Tipo de mercader:" },
      { type: "input", name: "ubicacion", message: "Ubicación del mercader:" },
      { type: "number", name: "dinero", message: "Dinero del mercader:" }
    ]);
    await incluirMercader(new Mercader(nuevoMercader.id, nuevoMercader.nombre, nuevoMercader.tipo, nuevoMercader.ubicacion, nuevoMercader.dinero));
    console.log("Mercader agregado exitosamente.");
  }
  else if (opcion === "Ver mercaderes") {
    console.log("Lista de mercaderes:");
    const mercaderes = await listarMercaderes();
    mercaderes.forEach((mercader) => console.log(mercader.mostrarInfo()));
  }
  else if (opcion === "Eliminar mercader") {
    const idMercader = await inquirer.prompt([{ type: "input", name: "id", message: "ID del mercader a eliminar:" }]);
    if (await eliminarMercader(idMercader.id)) console.log("Mercader eliminado exitosamente.");
    else console.log("No se encontró un mercader con ese ID.");
  }
  else if (opcion === "Modificar mercader") {
    const idMercader = await inquirer.prompt([{ type: "input", name: "id", message: "ID del mercader a modificar:" }]);
    const mercader = await buscarMercaderId(idMercader.id);
    if (!mercader) {
      console.log("No se encontró un mercader con ese ID.");
      return;
    }
    const nuevoMercader = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nuevo nombre del mercader:", default: mercader.nombre },
      { type: "input", name: "tipo", message: "Nuevo tipo de mercader:", default: mercader.tipo },
      { type: "input", name: "ubicacion", message: "Nueva ubicación del mercader:", default: mercader.ubicacion },
      { type: "number", name: "dinero", message: "Nuevo dinero del mercader:", default: mercader.getDinero() }
    ]);
    await modificarMercader(idMercader.id, new Mercader(idMercader.id, nuevoMercader.nombre, nuevoMercader.tipo, nuevoMercader.ubicacion, nuevoMercader.dinero));
    console.log("Mercader modificado exitosamente.");
  }
  else if (opcion === "Buscar mercader") {
    const tipoBusqueda = await inquirer.prompt([
        { type: "list", name: "tipo", message: "¿Cómo deseas buscar el mercader?", choices: ["Nombre", "Tipo", "Ubicación"] }
    ]);

    let mercader: Mercader | Mercader[] = [];
    switch (tipoBusqueda.tipo) {
      case "Nombre":
        const nombreMercader = await inquirer.prompt([{ type: "input", name: "nombre", message: "Nombre del mercader a buscar:" }]);
        mercader = await buscarMercaderNombre(nombreMercader.nombre);
        break;
      case "Tipo":
        const tipoMercader = await inquirer.prompt([{ type: "input", name: "tipo", message: "Tipo del mercader a buscar:" }]);
        mercader = await buscarMercaderTipo(tipoMercader.tipo);
        break;
      case "Ubicación":
        const ubicacionMercader = await inquirer.prompt([{ type: "input", name: "ubicacion", message: "Ubicación del mercader a buscar:" }]);
        mercader = await buscarMercaderUbicacion(ubicacionMercader.ubicacion);
        break;
    }

    if (Array.isArray(mercader)) {
      if (mercader.length > 0) {
        console.log("Mercaderes encontrados:");
        mercader.forEach((m) => {
          if (m instanceof Mercader) {
            console.log(m.mostrarInfo());
          } else {
            console.log("Error: El objeto encontrado no es un mercader válido.");
          }
        });
      } else {
        console.log("No se encontraron mercaderes con esos criterios.");
      }
    } 
    else if (mercader instanceof Mercader) {
      console.log(mercader.mostrarInfo());
    }
    else {
      console.log("No se encontró un mercader con esos criterios de búsqueda.");
    }
  }
}

async function handleClientes(opcion: string) {
  if (opcion === "Añadir cliente") {
    const nuevoCliente = await inquirer.prompt([
      { type: "input", name: "id", message: "ID del cliente:" },
      { type: "input", name: "nombre", message: "Nombre del cliente:" },
      { type: "input", name: "raza", message: "Raza del cliente:" },
      { type: "input", name: "ubicacion", message: "Ubicación del cliente:" },
      { type: "number", name: "dinero", message: "Dinero del cliente:" }
    ]);
    await incluirCliente(new Cliente(nuevoCliente.id, nuevoCliente.nombre, nuevoCliente.raza, nuevoCliente.ubicacion, nuevoCliente.dinero));
    console.log("Cliente agregado exitosamente.");
  }
  else if (opcion === "Ver clientes") {
    console.log("Lista de clientes:");
    const clientes = await listarClientes();
    clientes.forEach((cliente) => console.log(cliente.mostrarInfo()));
  }
  else if (opcion === "Eliminar cliente") {
    const idCliente = await inquirer.prompt([{ type: "input", name: "id", message: "ID del cliente a eliminar:" }]);
    if (await eliminarCliente(idCliente.id)) console.log("Cliente eliminado exitosamente.");
    else console.log("No se encontró un cliente con ese ID.");
  }
  else if (opcion === "Modificar cliente") {
    const idCliente = await inquirer.prompt([{ type: "input", name: "id", message: "ID del cliente a modificar:" }]);
    const cliente = await buscarClienteId(idCliente.id);
    if (!cliente) {
      console.log("No se encontró un cliente con ese ID.");
      return;
    }
    const nuevoCliente = await inquirer.prompt([
      { type: "input", name: "nombre", message: "Nuevo nombre del cliente:", default: cliente.nombre },
      { type: "input", name: "raza", message: "Nueva raza del cliente:", default: cliente.raza },
      { type: "input", name: "ubicacion", message: "Nueva ubicación del cliente:", default: cliente.ubicacion },
      { type: "number", name: "dinero", message: "Nuevo dinero del cliente:", default: cliente.dinero }
    ]);
    await modificarCliente(idCliente.id, new Cliente(idCliente.id, nuevoCliente.nombre, nuevoCliente.raza, nuevoCliente.ubicacion, nuevoCliente.dinero));
    console.log("Cliente modificado exitosamente.");
  }
  else if (opcion === "Buscar cliente") {
    const tipoBusqueda = await inquirer.prompt([
        { type: "list", name: "tipo", message: "¿Cómo deseas buscar el cliente?", choices: ["Nombre", "Raza", "Ubicación"] }
    ]);
    let cliente: Cliente | Cliente[] = [];
    switch (tipoBusqueda.tipo) {
      case "Nombre":
        const nombreCliente = await inquirer.prompt([{ type: "input", name: "nombre", message: "Nombre del cliente a buscar:" }]);
        cliente = await buscarClienteNombre(nombreCliente.nombre);
        break;
      case "Raza":
        const razaCliente = await inquirer.prompt([{ type: "input", name: "raza", message: "Raza del cliente a buscar:" }]);
        cliente = await buscarClienteRaza(razaCliente.raza);
        break;
      case "Ubicación":
        const ubicacionCliente = await inquirer.prompt([{ type: "input", name: "ubicacion", message: "Ubicación del cliente a buscar:" }]);
        cliente = await buscarClienteUbicacion(ubicacionCliente.ubicacion);
        break;
    }
    if (Array.isArray(cliente)) {
      if (cliente.length > 0) {
        console.log("Clientes encontrados:");
        cliente.forEach((c) => {
          if (c instanceof Cliente) {
            console.log(c.mostrarInfo());
          } else {
            console.log("Error: El objeto encontrado no es un cliente válido.");
          }
        });
      } else {
        console.log("No se encontraron clientes con esos criterios.");
      }
    }
    else if (cliente instanceof Cliente) {
      console.log(cliente.mostrarInfo());
    }
    else {
      console.log("No se encontró un cliente con esos criterios de búsqueda.");
    }
  }
}

async function handleTransacciones(opcion: string) {
  if (opcion === "Realizar venta") {
    const bienInput = await inquirer.prompt([{ type: "input", name: "bienId", message: "ID del bien que se vende:" }]);
    //Buscamos el bien en la base de datos
    const bien = await buscarBienPorId(bienInput.bienId);
    if (!bien) {
      console.log("No se encontró un bien con ese ID.");
      return;
    }
    const clienteInput = await inquirer.prompt([{ type: "input", name: "clienteId", message: "ID del cliente que compra:" }]);
    //Buscamos el cliente en la base de datos
    const cliente = await buscarClienteId(clienteInput.clienteId);
    if (!cliente) {
      console.log("No se encontró un cliente con ese ID.");
      return; 
    }
    const mercaderInput = await inquirer.prompt([{ type: "input", name: "mercaderId", message: "ID del mercader que vende:" }]);
    //Buscamos el mercader en la base de datos
    const mercader = await buscarMercaderId(mercaderInput.mercaderId);
    if (!mercader) {
      console.log("No se encontró un mercader con ese ID.");
      return;
    }
    await registrarVenta(bien.id, clienteInput.clienteId, mercaderInput.mercaderId);
  }
}

main(); // Ejecuta la función principal