import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { retry } from 'rxjs/operators';

interface Token {
    exp: number;
    user: {
        id: string;
        // isAdmin festlegen
        isAdmin: 0;
    };
}

@Injectable(
 // providedIn: 'root'
//}
)
export class AuthenticationService {
    private api: string =
        'http://vacina.s1710456036.student.kwmhgb.at/api/auth';


//Token holen
    constructor(private http: HttpClient) {}
    login(email: string, password: string) {
        //console.log(password);
        return this.http.post(`${this.api}/login`, {
            email: email,
            password: password
        });
        //console.log(password);
    }


// user_id dazu holen
    public getCurrentUserId() {
        return Number.parseInt(localStorage.getItem("userId"));
    }
//isAdmin info holen
    public getIsAdmin(){
        return Number.parseInt(localStorage.getItem("isAdmin"));
    }
    //Token speichern--> auch die user_id,pw
    public setLocalStorage(token: string) {
        console.log("Storing token");
        // Token wird decoded
        console.log(jwt_decode(token));
        const decodedToken = jwt_decode(token) as Token;
        console.log(decodedToken);
        console.log(decodedToken.user.id);
        //Token speichern
        localStorage.setItem("token", token);
        localStorage.setItem("userId", decodedToken.user.id);
    }

    //Token wird aus Storage entfernt
    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("logged out");
    }

    //
    public isLoggedIn() {
        // ist aktueller Token noch gültig?
        if (localStorage.getItem("token")) {
            let token: string = localStorage.getItem("token");
            console.log(token);
            console.log(jwt_decode(token));
            const decodedToken = jwt_decode(token) as Token;
            let expirationDate: Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if (expirationDate < new Date()) {
                console.log("token expired");
                localStorage.removeItem("token");
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
    isLoggedOut() {
        return !this.isLoggedIn();
    }
}
