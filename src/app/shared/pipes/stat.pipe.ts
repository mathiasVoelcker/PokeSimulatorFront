import { Pipe, PipeTransform } from '@angular/core';
import { Stat } from '../enums/stat.enum';

@Pipe({
  name: 'Stat'
})
export class StatPipe implements PipeTransform {

  transform(stat: Stat): any {
    switch(stat) {
      case Stat.Attack: {
        return 'Attack'
      }
      case Stat.Defense: {
        return 'Defense'
      }
      case Stat.SpecialAttack: {
        return 'Special Attack'
      }
      case Stat.SpecialDefense: {
        return 'Special Defense'
      }
      case Stat.Speed: {
        return 'Speed'
      }
      case Stat.HP: {
        return 'HP'
      }
      default: {
        return 'None'
      }
    }
  }

}
