import { Stat } from "../shared/enums/stat.enum";
import { IBasicObject } from "../shared/interfaces/basic-object";
import { BasicDropdownEntity } from '../shared/layouts/basic-dropdown/basic-dropdown-entity';

export class Nature extends BasicDropdownEntity{
    strongStat: Stat;
    weakStat: Stat;

    constructor(
        id: number,
        name: string,
        strongStat: Stat,
        weakStat: Stat) {
            super(id, name);
            this.strongStat = strongStat;
            this.weakStat = weakStat;
    }

}
