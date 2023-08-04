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

    async findByCpf(cpf: string){
        const result = await prisma.users.findUnique({
            where: {
                cpf,
            }
        });
        return result;
    }

    async update(name: string, newPassword: string, phone: string, avatar_url: string){
        const result = await prisma.users.update({
            where: {
            },
            data: {
                name,
                password: newPassword,
                phone,
                avatar_url,
            }
        });
        return result;
    }

}

export { UsersRepository };