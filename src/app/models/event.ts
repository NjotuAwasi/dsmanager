import { Administrator } from './administrator';

export class Event {
    id: number;
    name: string;
    location: string;
    city: string;
    startdate = new Date();
    enddate = new Date();
    datecreated = new Date();
    datemodified = new Date();
    picture: string;
    administrator = new Administrator();
}
