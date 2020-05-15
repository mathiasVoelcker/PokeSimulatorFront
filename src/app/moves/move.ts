import { Type } from "../type/type";
import { MoveCategory } from "../shared/enums/move-category.enum";
import { BasicDropdownEntity } from '../shared/layouts/basic-dropdown/basic-dropdown-entity';

export class Move extends BasicDropdownEntity{
    basePower: number;
    category: MoveCategory;
    type_id: number;
}
