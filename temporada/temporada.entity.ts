import { pistas } from "../pistas/pistas.entity";

export interface temporada {
    id: number;
    año: number;
    circuitos: pistas[];

}