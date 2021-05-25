import { Component } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import {Impfung} from './shared/impfung';
import {AuthenticationService} from './shared/authentication.service';

@Component({

  selector: 'bs-root',
// hier wird ausgewählt, was der Einstiegspunkt werden soll --> durch Routng erseztz
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private authService: AuthenticationService) { }
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
    getLoginLabel(){
        if (this.isLoggedIn()){
            return 'Logout';
        } else {
            return 'Login';
        }
    }

}


