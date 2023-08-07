import { prisma } from "../database/prisma";
import { ICreate } from "../interfaces/UsersInterface";

class UsersRepository{
    async create({name, email, password, cpf, phone}: ICreate){
        const result = await prisma.users.create({
            data: {
                name,
                email,
                password,
                cpf,
                phone
            },
        });
        return result;
    }

    async findByEmail(email: string){
        const result = await prisma.users.findUnique({
            where: {
                email,
            }
        });
        return result;
    }

    async findById(id: string){
        const result = await prisma.users.findUnique({
            where: {
                id,
            }
        });
        return result;
    }

    async findByCpf(cpf: string){
        const result = await prisma.users.findUnique({
            where: {
                cpf,
            }
        });
        return result;
    }

    async update(name: string, phone: string, avatar_url: string, user_id: string){
        const result = await prisma.users.update({
            where: {
                id: user_id,
            },
            data: {
                name,
                phone,
                avatar_url,
            }
        });
        return result;
    }

    async updatePassword(newPassword: string, user_id: string){    
        const result = await prisma.users.update({
            where: {
                id: user_id,
            },
            data: {
                password: newPassword,
            }
        });
        return result;
    }

}

export { UsersRepository };