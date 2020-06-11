import { AdministratorPK } from './administrator-pk';
import { Log } from './log';
import { User } from './user';
import { Event } from './event';

export class Administrator {
    administratorPK = new AdministratorPK();
    logList: Log[];
    users1 = new User();
    eventList: Event[];
}
