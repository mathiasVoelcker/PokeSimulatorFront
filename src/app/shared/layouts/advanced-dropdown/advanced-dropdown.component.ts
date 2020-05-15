import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { BasicDropdownEntity } from '../basic-dropdown/basic-dropdown-entity';

@Component({
  selector: 'app-advanced-dropdown',
  templateUrl: './advanced-dropdown.component.html'
})
export class AdvancedDropdownComponent {

  list = new FormControl();

  @Input()
  items: string[];

  @Input()
  placeholder: string;

  inputLabel: string;

  @Input()
  set selectedItem(selectedItem: BasicDropdownEntity) {
    if (!!selectedItem) {
      this.inputLabel = selectedItem.name;
    }
  }

  @Output()
  selected = new EventEmitter<any>();

  checkbox: boolean = false

  constructor() {
    this.list.valueChanges.subscribe(text => {
      this.setItem(text);
    });
  }

  get shownItems() {
    const text: string = this.list.value
    if (!text) return this.items;
    return this.items.filter(x => x.includes(text));
  }

  setItem(text: string) {
    if (!!text) {
      this.selected.emit(
        this.items.find(x => text.toUpperCase().includes(x.toUpperCase()))
        );
    }
  }
}
