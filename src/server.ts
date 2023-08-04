import express, {Application, NextFunction, Request, Response} from 'express';
import { UsersRoutes } from './routes/users.routes';

const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersRoutes = new UsersRoutes().getRoutes();


app.use('/users', usersRoutes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof Error){
        return response.status(400).json({
            error: error.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(3000, () => {
    console.log('Server is running');
});