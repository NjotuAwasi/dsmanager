import { Roleprivilege } from './roleprivilege';

export class Privilege {
    id: number;
    name: string;
    description: string;
    roleprivilegeList: Roleprivilege[];
}
