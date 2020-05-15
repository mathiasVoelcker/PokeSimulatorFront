import { Pipe, PipeTransform } from '@angular/core';
import { MoveCategory } from '../enums/move-category.enum';

@Pipe({
  name: 'MoveCategory'
})
export class MoveCategoryPipe implements PipeTransform {

  transform(moveCategory: MoveCategory): any {
    switch(moveCategory) {
      case MoveCategory.Physical: {
        return 'Physical'
      }
      case MoveCategory.Special: {
        return 'Special'
      }
      case MoveCategory.Status: {
        return 'Status'
      }
    }
  }
}
