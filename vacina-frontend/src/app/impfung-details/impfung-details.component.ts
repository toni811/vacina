import { Component,  Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Impfung} from '../shared/impfung';
import {ActivatedRoute, Router} from '@angular/router';
import {ImpfungStoreService} from '../shared/impfung-store.service';
import {ImpfungFactory} from '../shared/impfung-factory';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'bs-impfung-details',
  templateUrl: './impfung-details.component.html',
  styles: [
  ]
})

    export class ImpfungDetailsComponent implements OnInit {
    impfung: Impfung = ImpfungFactory.empty();

    //@Input() imfpung: Impfung;
    //@Output() showListEvent = new EventEmitter<any>();
    constructor(
        private is: ImpfungStoreService,
        private router: Router,
        private route: ActivatedRoute,
        public authService: AuthenticationService
    ) { }
    ngOnInit() {
        const params = this.route.snapshot.params;
        this.is.getSingle(params['title'])
        .subscribe(i => {
            this.impfung = i;
        });

        console.log(this.impfung);
    }
    getRating(num: number) {
        return new Array(num);
    }
   /* showImpfungList() {
        this.showListEvent.emit();
    } */

    removeImpfung()
    {
        if (confirm('Delet Impfung?')) {
            this.is.remove(this.impfung.title)
                .subscribe(res => this.router.navigate(['../'], {
                    relativeTo:
                    this.route
                }));
        }
}
}

