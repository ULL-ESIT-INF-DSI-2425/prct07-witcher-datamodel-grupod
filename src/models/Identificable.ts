// Interface Identificable

/**
 * Interfaz Identificable
 * 
 * Interfaz que define los métodos que deben implementar las clases que quieran ser identificables.
 * 
 * @interface Identificable - Interfaz Identificable
 * @method getId - Obtiene el identificador
 * @method getNombre - Obtiene el nombre
 */
export interface Identificable {
    getId(): string;
    getNombre(): string;
  }