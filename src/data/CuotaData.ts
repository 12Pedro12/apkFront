import { Cuota } from "../entidad/Cuota";
import { http } from "./http";

export const CuotaData = {
    getAll: async(): Promise<Cuota[]> => http("administrativo/cuota/"),
    
    show: async(id: number): Promise<Cuota> => http('administrativo/cuota/${id}/'),

    create: async(cuota: Partial<Cuota>): Promise<Cuota> => http("administrativo/cuota/", {method : "POST", body: JSON.stringify(cuota)}),

    update: async(id: number,cuota: Partial<Cuota>): Promise<Cuota> => http('administrativo/cuota/${id}/', {method : "PUT", body: JSON.stringify(cuota)}),

    patch: async(id: number,cuota: Partial<Cuota>): Promise<Cuota> => http('administrativo/cuota/${id}/', {method : "PATCH", body: JSON.stringify(cuota)}),

    delete: async(id: number): Promise<Cuota> => http('administrativo/cuota/${id}/', {method : "DELETE"}),
}