export interface Pago {
  id: number;
  cuota_id: number;
  cobrador_id?: number;        // puede ser null
  monto: string;               // Decimal → string
  fecha_pago: string;          // ISO datetime
  metodo_pago: "efectivo" | "transferencia" | "qr";
}