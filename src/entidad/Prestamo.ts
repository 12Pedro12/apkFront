export interface Prestamo {
  id: number;
  client_id: number;
  cobrador_id: number;
  monto: string;           // Decimal → string
  tasa_interes: string;    // Decimal → string
  plazo: number;           // meses
  fecha_inicio: string;    // ISO datetime
  fecha_fin: string;       // ISO datetime
  estado: "activo" | "finalizado" | "mora";
}