export interface equipo {
  id: string;
  nombre: string;
  jefedeequipo: string;
  presidente: string;
  pais: string;
  fechadefundacion: Date;
  campeonatosganados: number;
  logo: string | null;
}