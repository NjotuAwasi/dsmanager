import { User } from './user';
import { Review } from './review';
import { StudentPK } from './student-pk';

export class Student {
    studentPK = new StudentPK();
    idnumber: number;
    status: string;
    results: string;
    feepaid: DoubleRange;
    fee: DoubleRange;
    review = new Review;
    users1 = new User();
}

