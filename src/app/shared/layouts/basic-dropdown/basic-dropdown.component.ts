import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-basic-dropdown',
  templateUrl: './basic-dropdown.component.html',
  styleUrls: ['./basic-dropdown.component.css']
})
export class BasicDropdownComponent implements OnInit {

  @Input()
  items: any[]

  @Input()
  itemTitle: string;

  @Input()
  selectedItem: any = { id: 0 };
  
  @Input() 
  clear: Subject<boolean> = new Subject();

  @Output()
  itemSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.clear.subscribe(() => { 
      debugger;
      this.selectedItem = 0
   });
  }


  setItem(id: string) {
    debugger;
    this.selectedItem = id;
    this.itemSelected.emit(id);
  }
}