import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//enthält alle notwendigen (Rest) Calls
import {AuthenticationService} from '../shared/authentication.service';


// um auf Response Objekt von Server zugreifen zu können
interface Response {
    access_token: string;
}

//liefert Methoden hinzu, die von angular ausgelesen werden können
@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService
    ){}

    // notwendige Validator für Formular
    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    login() {
        const val = this.loginForm.value;
        //wenn Login erfolgreich, speichern des Auth-Token und User
        if (val.username && val.password) {
            this.authService.login(val.username, val.password).subscribe(res => {
                //console.log(res);
                this.authService.setLocalStorage((res as
                    Response).access_token);
                console.log((res as Response).access_token);

                // User auf Stratseite weiterleiten
                this.router.navigateByUrl('/');
            });

        }
    }

//Methoden um zu überprüfen ob User eingeloggt ist oder nicht
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    logout() {
        this.authService.logout();
    }

}
