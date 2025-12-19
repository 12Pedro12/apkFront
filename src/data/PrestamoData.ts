import { Prestamo } from "../entidad/Prestamo";
import { http } from "./http";

export const PrestamoData = {
    getAll: async(): Promise<Prestamo[]> => http("administrativo/prestamo/"),
    
    show: async(id: number): Promise<Prestamo> => http('administrativo/prestamo/${id}/'),

    create: async(prestamo: Partial<Prestamo>): Promise<Prestamo> => http("administrativo/prestamo/", {method : "POST", body: JSON.stringify(prestamo)}),

    update: async(id: number,prestamo: Partial<Prestamo>): Promise<Prestamo> => http('administrativo/prestamo/${id}/', {method : "PUT", body: JSON.stringify(prestamo)}),

    patch: async(id: number,prestamo: Partial<Prestamo>): Promise<Prestamo> => http('administrativo/prestamo/${id}/', {method : "PATCH", body: JSON.stringify(prestamo)}),

    delete: async(id: number): Promise<Prestamo> => http('administrativo/prestamo/${id}/', {method : "DELETE"}),
}