export interface equipo {
  id: number;
  nombre: string;
  jefedeequipo: string;
  presidente: string;
  pais: string;
  fechadefundacion: Date;
  campeonatosganados: number;
  logo: string | null;
}