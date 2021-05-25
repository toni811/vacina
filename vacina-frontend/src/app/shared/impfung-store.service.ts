import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Impfung} from './impfung';


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
        return this.http.delete(`${this.api}/Impgung/${title}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    create(impfung: Impfung): Observable<any> {
        return this.http.post(`${this.api}/Impfung`, impfung)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));

    }

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