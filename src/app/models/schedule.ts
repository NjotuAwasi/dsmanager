import { School } from './school';
import { Student } from './student';
import { Instructor } from './instructor';

export class Schedule {
    id: number;
    startdate: Date;
    enddate: Date;
    status: string;
    class: string;
    location: string;
    isallday: boolean;
    subject: string;
    school = new School();
    student: Student[];
    instructor: Instructor[];
}
