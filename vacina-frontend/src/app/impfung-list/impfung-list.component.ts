import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Impfung, Ort} from '../shared/impfung';
import {ImpfungStoreService} from '../shared/impfung-store.service';

@Component({
  selector: 'bs-impfung-list',
  templateUrl: './impfung-list.component.html',
  styles: [
  ]
})
export class ImpfungListComponent implements OnInit {

  impfungen: Impfung [];
    constructor(private is: ImpfungStoreService){ }

    ngOnInit() {
        /**this.impfungen = this.is.getAll(); **/
        this.is.getAll().subscribe(res => this.impfungen = res);

        //console.log(this.impfungen);
    }


}
