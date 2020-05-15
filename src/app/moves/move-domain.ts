import { Move } from './move';

export class MoveDomain {

  static setMoveName(move: Move) {
    return `${move.name} - Power: ${move.basePower} - ${move.category}`
  }
}
