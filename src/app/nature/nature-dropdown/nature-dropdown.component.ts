import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Nature } from '../nature';
import { AdvancedDropdownComponent } from '../../shared/layouts/advanced-dropdown/advanced-dropdown.component';
import { StatPipe } from '../../shared/pipes/stat.pipe';

@Component({
  selector: 'app-nature-dropdown',
  templateUrl: '../../shared/layouts/advanced-dropdown/advanced-dropdown.component.html',
})
export class NatureDropdownComponent extends AdvancedDropdownComponent {

  @Input()
  natures: Nature[];

  constructor() {
    super();
  }

  get shownItems() {
    const text: string = this.list.value
    if (!this.natures) return null;
    if (!text) return this.natures.map(x => x.name);
    return this.natures.filter(x =>
      x.name
      .toUpperCase()
      .includes(text.toUpperCase()))
      .map(x => x.name);
  }

  setItem(text: string) {
    if (!!text) {
      this.selected.emit(
        this.natures.find(x => x.name.toUpperCase().includes(text.toUpperCase()))
        );
    }
  }

}
