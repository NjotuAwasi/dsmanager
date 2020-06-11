import { Instructor } from './instructor';
import { School } from './school';

export class Vehicle {
    id: number;
    model: string;
    type: string;
    brand: string;
    datecreated = new Date();
    datemodified = new Date();
    picture: string;
    plate: string;
    instructor = new Instructor();
    school = new School();
}
