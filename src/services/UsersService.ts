import { compare, hash } from "bcrypt";
import { ICreate, IUpdate} from "../interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";
import { s3 } from "../config/aws";
import { v4 as uuid } from 'uuid';
import { sign } from "jsonwebtoken";

class UsersService{
    private usersRepository: UsersRepository;
    constructor(){
        this.usersRepository = new UsersRepository();
    }

    async create({name, email, password, cpf, phone}: ICreate){
        const findByEmail = await this.usersRepository.findByEmail(email);
        const findByCpf = await this.usersRepository.findByCpf(cpf);

        if(findByEmail){
            throw new Error("Email already exists!");
        }

        if(findByCpf){
            throw new Error("CPF already exists!");
        }

        const hashPassword = await hash(password, 10);

        const create = await this.usersRepository.create({name, email, password: hashPassword, cpf, phone});
        
        return create;
    }

    async update({
        name, 
        oldPassword, 
        newPassword, 
        phone, 
        avatar_url
    }: IUpdate){
        if(oldPassword && !newPassword){
            const passwordMatch = await compare(oldPassword, findUser.password);
        }
        const uploadImage = avatar_url?.buffer;
        const uploadS3 = await s3.upload({
            Bucket: 'semana-heroi',
            Key: '${uuid()}-${request.file?.originalname}',
            //ACL: 'public-read',
            Body: avatar_url,
            ContentType: 'image/jpeg'
        }).promise();
    }

    async auth(email: string, password: string){
        const findUser = await this.usersRepository.findByEmail(email);
        if(!findUser){
            throw new Error("User or password incorrect!");
        }

        const passwordMatch = await compare(password, findUser.password);
        if(!passwordMatch){
            throw new Error("User or password incorrect!");
        }

        let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN;
        if(!secretKey){
            throw new Error("Secret key not found!");
        }

        const token = sign({email}, secretKey, {
            subject: findUser.id,
            expiresIn: 60*15
        });

        return {
            token,
            user: {
                name: findUser.name,
                email: findUser.email,
            }
        }
    }
}

export { UsersService };