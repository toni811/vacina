import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl, FormGroupDirective} from '@angular/forms';
import {ImpfungFactory} from '../shared/impfung-factory';
import {ImpfungStoreService} from '../shared/impfung-store.service';
import {Impfung, Ort} from '../shared/impfung';
import { ImpfungFormErrorMessages } from "./impfung-form-error-messages";

@Component({
    selector: "is-impfung-form",
    templateUrl: "./impfung-form.component.html"
})
export class ImpfungFormComponent implements OnInit {
    impfungForm: FormGroup;
    impfung = ImpfungFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingImpfung = false;
    //orte: FormArray;
    ort: FormGroup;
    constructor(
        private ib: FormBuilder,
        private is: ImpfungStoreService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        const title = this.route.snapshot.params["title"];
        if (title) {
            this.isUpdatingImpfung = true;
            this.is.getSingle(title).subscribe(impfung => {
                this.impfung = impfung;
                this.initImpfung();
            });
        }
        this.initImpfung();
    }
    initImpfung
    () {
        this.buildOrtArray();
        this.impfungForm = this.ib.group({
            id: this.impfung.id,
           // title: [this.impfung.title, Validators.required],
            appointment: this.impfung.appointment,
            title: [
                this.impfung.title,[
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(13)
                ]
            ],
            date: this.impfung.date,
            description: this.impfung.description,
            MaxMember: [this.impfung.MaxMember, [Validators.min(0), Validators.max(10)]],
            orte: this.ort

        });
        this.impfungForm.statusChanges.subscribe(() =>
            this.updateErrorMessages());
    }


   buildOrtArray() {
        console.log(this.impfung.ort);
        //this.orte = this.ib.array([]);
        //for (let o of this.impfung.ort) {
            let fg = this.ib.group({
                id: 1,
                location: new FormControl(this.impfung.ort.location, [Validators.required]),
                address: new FormControl(this.impfung.ort.address, [Validators.required]),
                description: new FormControl(this.impfung.ort.description, [Validators.required]),
                date: new FormControl(this.impfung.ort.date, [Validators.required]),
                PLZ: new FormControl(this.impfung.ort.PLZ, [Validators.required])
            });//
       //console.log(fg);
       //this.orte.push(fg);
       this.ort = fg;
       // }
    }

    submitForm() {
// filter empty values
        /*this.impfungForm.value.orte = this.impfungForm.value.orte.filter(
            ortvorschau => ortvorschau.address
        )*/
        const impfung: Impfung = ImpfungFactory.fromObject(this.impfungForm.value);
//deep copy - did not work without??
        impfung.ort = this.impfungForm.value.orte;
        console.log(impfung);
//just copy the authors
        //impfung.authors = this.impfung.authors;
        if (this.isUpdatingImpfung) {
            this.is.update(impfung).subscribe(res => {
                this.router.navigate(["../../impfung", impfung.title], {
                    relativeTo: this.route
                });
            });
        } else {
            //impfung.user_id = 1; // jsut for testing
            console.log(impfung);
            this.is.create(impfung).subscribe(res => {
                this.impfung = ImpfungFactory.empty();
                this.impfungForm.reset(ImpfungFactory.empty());
                this.router.navigate(["../impfung"], { relativeTo: this.route
                });
            });
        }
    }
    updateErrorMessages() {
        console.log("Is invalid? " + this.impfungForm.invalid);
        this.errors = {};
        for (const message of ImpfungFormErrorMessages ) {
            const control = this.impfungForm.get(message.forControl);
            if (
                control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]
            ) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}
