import { Bien } from "../models/Bien.js";
export declare function initDB(): Promise<void>;
export declare function addBien(bien: Bien): Promise<void>;
export declare function getBienes(): Promise<Bien[]>;
