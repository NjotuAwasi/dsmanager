import { BranchmanagerPK } from './branchmanager-pk';
import { Session } from './session';
import { Branch } from './branch';
import { User } from './user';

export class Branchmanager {
    branchmanagerPK = new BranchmanagerPK();
    sessionList: Session[];
    branch = new Branch();
    users1 = new User();
}
