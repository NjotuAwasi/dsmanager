import { Branchmanager } from './branchmanager';
import { Studentsession } from './studentsession';

export class Session {
    id: number;
    startdate = new Date();
    enddate = new Date();
    description: string;
    branchmanager = new Branchmanager();
    studentsessionList: Studentsession[];
}
