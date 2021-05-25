import { Component, OnInit, Input } from '@angular/core';
import {Impfung} from '../shared/impfung';

@Component({
  selector: 'a.bs-impfung-list-item',
  templateUrl: './impfung-list-item.component.html',
  styles: [
  ]
})
export class ImpfungListItemComponent implements OnInit {

  @Input() impfung: Impfung
  constructor() { }
    ngOnInit() { }
}

