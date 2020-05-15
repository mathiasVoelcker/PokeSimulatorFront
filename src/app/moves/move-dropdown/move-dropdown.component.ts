import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdvancedDropdownComponent } from '../../shared/layouts/advanced-dropdown/advanced-dropdown.component';
import { Move } from '../move';

@Component({
  selector: 'app-move-dropdown',
  templateUrl: '../../shared/layouts/advanced-dropdown/advanced-dropdown.component.html'
})
export class MoveDropdownComponent extends AdvancedDropdownComponent {

  @Input()
  moves: Move[];

  constructor() {
    super();
    this.list.valueChanges.subscribe(text => {
      this.setItem(text);
    });
  }

  get shownItems() {
    const text: string = this.list.value
    if (!this.moves) return null
    if (!text) return this.moves.map(x => x.name);
    return this.moves.filter(x =>
      x.name
      .toUpperCase()
      .includes(text.toUpperCase()))
      .map(x => x.name);
  }

  setItem(text: string) {
    if (!!text) {
      this.selected.emit(
        this.moves.find(x => x.name.toUpperCase().includes(text.toUpperCase()))
        );
    }
  }
}
