import { School } from './school';

export class Schoollog {
    id: number;
    datecreated = new Date();
    message: string;
    school = new School();
}
