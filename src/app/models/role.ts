import { Userrole } from './userrole';
import { Roleprivilege } from './roleprivilege';

export class Role {
    id: number;
    name: string;
    userroleList: Userrole[];
    roleprivilegeList: Roleprivilege[];
}
