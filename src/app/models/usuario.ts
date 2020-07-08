import { Perfil } from './perfil';

export interface Usuario {
    id: number;
    name: string;
    email: string;
    imagem: string;
    perfil_id: number;
    status: boolean;
    created_at: string;
    updated_at: string;
    perfil: Perfil[];
}
