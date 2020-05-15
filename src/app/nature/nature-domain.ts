import { Nature } from './nature';
import { StatPipe } from '../shared/pipes/stat.pipe';

export class NatureDomain {

  static defineNatureText(nature: Nature) {
    if (!nature) return null;
    if (!nature.strongStat && !nature.weakStat) {
      return `${nature.name}: Neutral`;
    }
    return `${nature.name} - Strong: ${StatPipe.prototype.transform(nature.strongStat)} - Weak: ${StatPipe.prototype.transform(nature.weakStat)}`;
  }
}
