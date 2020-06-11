import { School } from './school';
import { User } from './user';

export class Course {
    id: number;
    type: string;
    name: string;
    description: string;
    datecreated = new Date();
    datemodified = new Date();
    picture: string;
    school = new School();
    users1 = new User();
}
