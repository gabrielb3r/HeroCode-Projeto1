export interface ICreate{
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
}

export interface IUpdate{
    name: string;
    oldPassword: string;
    newPassword: string;
    phone: string;
    avatar_url?: FileUpload;
}

interface FileUpload{
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}