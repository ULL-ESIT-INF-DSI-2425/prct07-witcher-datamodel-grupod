# Práctica 7 - The Witcher

## Autores

Abdón Senen Meléndez Díaz 
Daniel Pérez Rodríguez
Ismael Rojas

## Introducción

Informe sobre el primer proyecto evaluable de la asignatura de Desarrollo de sistemas informaticos en concreto se trabaja el lenguaje de programación typescript.
Tecnologías a utilizar (TypeScript, Inquirer.js, Lowdb, Vitest).

## Metodología

Se ha organizado en varias carpetas, las cuales contienen los ficheros correspondientes con los apartados que se especifican en el guión de la practica.
* src -> Ficheros con el código fuente del programa completo
* test -> Realización de las pruebas para comprobar el correcto funcionamiento
* dist -> Ficheros en java y typescript
* docs -> documentación generada con typedoc
* Otros ficheros de configuración del entorno

## Ejecutar el programa

Para poder ejecutar correctamente el programa debera utilizar los siguientes comandos:
  -  $ tsc
  -  $ node dist/interfaz/menu.js
    
## Requisitos del Sistema

* **Bienes:**
    * ID único.
    * Nombre.
    * Descripción.
    * Material.
    * Peso.
    * Valor en coronas.
      
* **Mercaderes:**
    * ID único.
    * Nombre.
    * Tipo.
    * Ubicación.
      
* **Clientes:**
    * ID único.
    * Nombre.
    * Raza.
    * Ubicación.
      
* **Funcionalidades:**
    * CRUD de bienes, mercaderes y clientes.
    * Consultas y ordenamiento de bienes.
    * Búsqueda de mercaderes y clientes.
    * Gestión de inventario y stock.
    * Registro de transacciones (ventas, compras, devoluciones).
    * Generación de informes (stock, ventas, ingresos, histórico).
      
* **Interfaz de Usuario:**
    * Interfaz interactiva en línea de comandos con Inquirer.js.
      
* **Persistencia de Datos:**
    * Uso de Lowdb para almacenar información.

## Diseño

**Hemos optado por un diseño de clases las cuales se relacionan entre ellas, ya bien sea a travez de herencia, agregación o composición.**
**Optamos por unos patrones de diseño Solid en algunos puntos de nustro código y una estructura de datos donde se almacenan estos.**

## Metodología de Desarrollo

* **Desarrollo Dirigido por Pruebas (TDD):** Se han escrito pruebas unitarias con Vitest antes de implementar el código para asegurar su correcto funcionamiento.
* **Documentación con TSDoc:** Se ha documentado el código con TSDoc para facilitar su comprensión y mantenimiento.
* **Integración Continua con GitHub Actions:** Se han configurado flujos de trabajo en GitHub Actions para automatizar la compilación, pruebas y análisis de código.
* **Análisis de Calidad de Código con SonarCloud:** Se ha utilizado SonarCloud para analizar la calidad del código y detectar posibles problemas.
* **Cobertura de Código con Coveralls:** Se ha utilizado Coveralls para medir la cobertura de las pruebas unitarias.

## Implementación

* **Estructura del Proyecto:** El proyecto se ha organizado en módulos para facilitar su desarrollo y mantenimiento.
* **Código Fuente:** El código fuente se ha escrito en TypeScript y se ha compilado a JavaScript.
* **Interfaz de Usuario:** Se ha implementado una interfaz interactiva en línea de comandos con Inquirer.js.
* **Pruebas Unitarias:** Se han escrito pruebas unitarias con Vitest para todas las clases y funcionalidades.
* **Documentación:** Se ha generado la documentación del código con TypeDoc.

## Pruebas

* Se han realizado pruebas unitarias exhaustivas para verificar el correcto funcionamiento.
* Se han realizado pruebas de integración para asegurar que los diferentes módulos del sistema interactúan correctamente.
* Se han realizado pruebas de la interfaz de usuario para verificar su usabilidad.
* Se han analizado los resultados de SonarCloud y Coveralls para evaluar la calidad del código y la cobertura de pruebas.

## Conclusiones

El proyecto ha cumplido con los requisitos establecidos y ha demostrado ser una solución eficaz para la gestión de inventario de la Posada del Lobo Blanco.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/nao75Rei)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18701086)
