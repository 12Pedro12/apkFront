import { Rol } from "../entidad/Rol";
import { http } from "./http";

export const RolData = {
    getAll: async(): Promise<Rol[]> => http("administrativo/roles/"),
    
    show: async(id: number): Promise<Rol> => http('administrativo/roles/${id}/'),

    create: async(rol: Partial<Rol>): Promise<Rol> => http("administrativo/roles/", {method : "POST", body: JSON.stringify(rol)}),

    update: async(id: number,rol: Partial<Rol>): Promise<Rol> => http('administrativo/roles/${id}/', {method : "PUT", body: JSON.stringify(rol)}),

    patch: async(id: number,rol: Partial<Rol>): Promise<Rol> => http('administrativo/roles/${id}/', {method : "PATCH", body: JSON.stringify(rol)}),

    delete: async(id: number): Promise<Rol> => http('administrativo/roles/${id}/', {method : "DELETE"}),
}