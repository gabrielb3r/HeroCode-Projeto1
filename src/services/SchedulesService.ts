import { ICreate } from "../interfaces/SchedulesInterface";
import { isBefore, startOfHour } from "date-fns";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class SchedulesService{
    private schedulesRepository: SchedulesRepository;
    constructor(){
        this.schedulesRepository = new SchedulesRepository();
    }
    async create({name, phone, date}: ICreate){
        const dateFormatted = startOfHour(new Date(date));
        const hourStart = startOfHour(dateFormatted);
        if(isBefore(hourStart, Date.now())){
            throw new Error("Não é possível criar um agendamento em uma data que já passou");
        }
        const checkIsAvailable = await this.schedulesRepository.find(hourStart);
        if(checkIsAvailable){
            throw new Error("Horário já agendado");
        }
        const create = await this.schedulesRepository.create({name, phone, date: hourStart});
        return create;
    }
}

export { SchedulesService }