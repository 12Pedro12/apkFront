import { Pago } from "../entidad/Pago";
import { http } from "./http";

export const PagoData = {
    getAll: async(): Promise<Pago[]> => http("administrativo/pago/"),
    
    show: async(id: number): Promise<Pago> => http('administrativo/pago/${id}/'),

    create: async(pago: Partial<Pago>): Promise<Pago> => http("administrativo/pago/", {method : "POST", body: JSON.stringify(pago)}),

    update: async(id: number,pago: Partial<Pago>): Promise<Pago> => http('administrativo/pago/${id}/', {method : "PUT", body: JSON.stringify(pago)}),

    patch: async(id: number,pago: Partial<Pago>): Promise<Pago> => http('administrativo/pago/${id}/', {method : "PATCH", body: JSON.stringify(pago)}),

    delete: async(id: number): Promise<Pago> => http('administrativo/pago/${id}/', {method : "DELETE"}),
}