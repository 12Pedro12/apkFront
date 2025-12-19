import { Client } from "../entidad/Client";
import { http } from "./http";

export const ClientData = {
    getAll: async(): Promise<Client[]> => http("administrativo/clients/"),
    
    show: async(id: number): Promise<Client> => http('administrativo/clients/${id}/'),

    create: async(client: Partial<Client>): Promise<Client> => http("administrativo/clients/", {method : "POST", body: JSON.stringify(client)}),

    update: async(id: number,client: Partial<Client>): Promise<Client> => http('administrativo/clients/${id}/', {method : "PUT", body: JSON.stringify(client)}),

    patch: async(id: number,client: Partial<Client>): Promise<Client> => http('administrativo/clients/${id}/', {method : "PATCH", body: JSON.stringify(client)}),

    delete: async(id: number): Promise<Client> => http('administrativo/clients/${id}/', {method : "DELETE"}),
}