import { Administrator } from './administrator';

export class Log {
    id: number;
    datecreated = new Date();
    message: string;
    administrator = new Administrator();
}
