import { School } from './school';
import { Student } from './student';
import { Role } from './role';

export class User {
    id: number;
    firstname: string;
    lastname: string;
    datecreated = new Date();
    datemodified: Date;
    picture: string;
    phone: string;
    gender: string;
    birthdate: Date;
    email: string;
    login: string;
    password: string;
    studentList: Student[];
    userroleList: Role[];
    school = new School();

    constructor() {}
}
