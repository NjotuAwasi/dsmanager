import { School } from './school';

export class Review {
    id: number;
    school = new School();
    datecreated = new Date();
    datemodified = new Date();
    comment: string;
    rating: number;
}
