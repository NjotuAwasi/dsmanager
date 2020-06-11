import { School } from './school';

export class Notification {
    id: number;
    message: string;
    datecreated = new Date();
    read: boolean;
    school = new School();
}
