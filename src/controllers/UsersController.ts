import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {
    private usersService: UsersService;
    constructor() {
        this.usersService = new UsersService();
    }
    index() {
        //buscar todos
    }

    async store(request: Request, response: Response, next: NextFunction) {
        const { name, email, password, cpf, phone } = request.body;
        try {
            const result = await this.usersService.create({ name, email, password, cpf, phone });

            return response.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const { name, oldPassword, newPassword, phone, avatar_url } = request.body;
        const {user_id} = request;
        try {
            const result = await this.usersService.update({ 
                name, 
                oldPassword, 
                newPassword, 
                phone, 
                avatar_url: request.file,
                user_id 
            });
            return response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    show() {
        //buscar somente um
    }

    async auth(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;
        try {
            const result = await this.usersService.auth(email, password);
            return response.status(200).json(result);
        } catch (error) {         
            next(error);
        }
    }
}

export { UsersController };