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
    //das Formular selbst
    //FormGroups-> zum Gruppieren von Feldern
    impfungForm: FormGroup;
    impfung = ImpfungFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingImpfung = false;
    ort: FormGroup;
    // Orte einfügen
    orte: Ort[];

    //FormBuilder --> stellt Methoden zum Anlegen zur verfügung


    constructor(
        private ib: FormBuilder,
        private is: ImpfungStoreService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    // wenn titel (Routenparameter) existiert soll Formular verwendet werden können
    ngOnInit() {
        const title = this.route.snapshot.params["title"];
        this.buildOrtArray();
        if (title) {
            this.isUpdatingImpfung = true;
            this.is.getSingle(title).subscribe(impfung => {
                this.impfung = impfung;
                this.initImpfung();
            });
        }
        this.initImpfung();
    }

    // Impfung wird initialisiert
    //mithilfe von FormModel wird formBuidler angelegt
    initImpfung
    () {
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
            orte: this.impfung.ort
        });
        this.impfungForm.statusChanges.subscribe(() =>
            this.updateErrorMessages());
    }


    //Orte
   buildOrtArray() {
        this.is.getAllOrte().subscribe(res => {
            this.orte = res;
            console.log(this.orte);
        });
    }


    submitForm() {
// filter empty values
        /*this.impfungForm.value.orte = this.impfungForm.value.orte.filter(
            ortvorschau => ortvorschau.address
        )*/
        //console.log("Submit method");
        //console.log("isUpdatingImpfung: " + this.isUpdatingImpfung);
        const impfung: Impfung = ImpfungFactory.fromObject(this.impfungForm.value);

        if(this.orte){
            for(const ort of this.orte){
                if (ort.id == this.impfungForm.value.orte)
                    impfung.ort = ort;
            }
        }

       // impfung.ort = this.impfungForm.value.orte;
        console.log(impfung);


        if (this.isUpdatingImpfung) {
           // console.log("update");
            this.is.update(impfung).subscribe(res => {
                this.router.navigate(["../../impfung", impfung.title], {
                    relativeTo: this.route
                });
            });
        } else {
            //impfung.user_id = 1; // jsut for testing
            //console.log(this.impfung);
            //console.log(impfung);
            this.is.create(impfung).subscribe(res => {
                this.impfung = ImpfungFactory.empty();
              //  console.log(this.impfung);
                this.impfungForm.reset(ImpfungFactory.empty());
                this.router.navigate(["../impfung"], { relativeTo: this.route
                });
            });
        }
    }













    //ERROR Messages
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
