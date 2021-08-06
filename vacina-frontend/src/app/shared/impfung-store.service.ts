import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Impfung} from './impfung';
import {Ort} from "./ort";

@Injectable()
export class ImpfungStoreService {

    private api = 'http://vacina.s1710456036.student.kwmhgb.at/api';


    constructor(private http: HttpClient) { }


    getAll(): Observable<Array<Impfung>> {
        return this.http.get(`${this.api}/Impfung`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getSingle(title: string): Observable<Impfung> {
        console.log("=== ", title)
        return this.http.get(`${this.api}/Impfung/${title}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    remove(title: string): Observable<any> {
        return this.http.delete(`${this.api}/Impfung/${title}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }
// man muss Orte mitschicken --> deshalb funktioniert das Speichern nicht!!
    create(impfung: Impfung): Observable<any> {
        return this.http.post(`${this.api}/Impfung`, impfung)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));

    }

    //-------------------------------------ORTE
    saveOrt(ort: Ort): Observable<any> {
        return this.http.put(`${this.api}/ort/${ort.id}`, ort)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getAllOrte(): Observable<Array<Ort>> {
        return this.http.get(`${this.api}/orts`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }



    //---------------------------------ORTE


    update(impfung: Impfung): Observable<any> {
        return this.http.put(`${this.api}/Impfung/${impfung.title}`, impfung)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));

    }


    check(title: string): Observable<Boolean> {
        return this.http.get<Boolean>(`${this.api}/Impfung/checkTitle/${title}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));

    }

    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }

}