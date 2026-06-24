export interface Equipo {
  id: number;
  nombre: string;
  gefedeequipo: string;
  presidente: string;
  pais: string;
  fechadefundacion: Date;
  campeonatosGanados: number;
  logo: string | null;
}