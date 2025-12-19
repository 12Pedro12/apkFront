import { Cobrador } from "../entidad/Cobrador";
import { http } from "./http";

export const CobradorData = {
    getAll: async(): Promise<Cobrador[]> => http("administrativo/cobrador/"),
    
    show: async(id: number): Promise<Cobrador> => http('administrativo/cobrador/${id}/'),

    create: async(cobrador: Partial<Cobrador>): Promise<Cobrador> => http("administrativo/cobrador/", {method : "POST", body: JSON.stringify(cobrador)}),

    update: async(id: number,cobrador: Partial<Cobrador>): Promise<Cobrador> => http('administrativo/cobrador/${id}/', {method : "PUT", body: JSON.stringify(cobrador)}),

    patch: async(id: number,cobrador: Partial<Cobrador>): Promise<Cobrador> => http('administrativo/cobrador/${id}/', {method : "PATCH", body: JSON.stringify(cobrador)}),

    delete: async(id: number): Promise<Cobrador> => http('administrativo/cobrador/${id}/', {method : "DELETE"}),
}