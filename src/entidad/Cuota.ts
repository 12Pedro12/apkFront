export interface Cuota {
  id: number;
  prestamo_id: number;
  numero_cuota: number;
  monto: string;              // Decimal → string
  fecha_vencimiento: string;  // ISO date: "2025-12-01"
  estado: "pendiente" | "pagada" | "vencida";
}
