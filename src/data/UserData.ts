import { User } from "../entidad/User";
import { http } from "./http";

export const RolData = {
    getAll: async(): Promise<User[]> => http("administrativo/users/"),
    
    show: async(id: number): Promise<User> => http('administrativo/users/${id}/'),

    create: async(user: Partial<User>): Promise<User> => http("administrativo/users/", {method : "POST", body: JSON.stringify(user)}),

    update: async(id: number,user: Partial<User>): Promise<User> => http('administrativo/users/${id}/', {method : "PUT", body: JSON.stringify(user)}),

    patch: async(id: number,user: Partial<User>): Promise<User> => http('administrativo/users/${id}/', {method : "PATCH", body: JSON.stringify(user)}),

    delete: async(id: number): Promise<User> => http('administrativo/users/${id}/', {method : "DELETE"}),
}