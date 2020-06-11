import { School } from './school';
import { User } from './user';

export class Message {
    id: number;
    datecreated = new Date();
    message: string;
    type: string;
    read: boolean;
    school = new School();
    users = new User();
}
