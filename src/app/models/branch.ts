import { School } from './school';
import { User } from './user';
import { Branchmanager } from './branchmanager';

export class Branch {
    id: number;
    code: string;
    location: string;
    city: string;
    datecreated = new Date();
    datemodified = new Date();
    name: string;
    email: string;
    phone: string;
    school = new School();
    usersList: User[];
    branchmangerList: Branchmanager[];
    countStudent = undefined;
    countInstructor = undefined;
}
