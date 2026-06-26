export interface equipo {
  id: string;
  nombre: string;
  jefedeequipo: string;
  presidente: string;
  pais: string;
  fechadefundacion: Date;
  campeonatosdepilotosganados: number;
  campeonatosdeconstructoresganados: number;
  campeonatoscorridos: number;
  logo: string | null;
}