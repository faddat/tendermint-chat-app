import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
    constructor(
        private http: Http
    ){ }
    
    public get(): Observable<any> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        const link = 'http://localhost:3000/state';
        const bodyObject = {
        };
        const bodyString = JSON.stringify(bodyObject); // Stringify payload
        return this.http.get(link, options) // ...using post request
            .map((res: Response) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }

    public post (text: string): Observable<any> {
        const options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        const link = 'http://localhost:3000/txs';
        const senderName = sessionStorage.getItem('name')
        console.log(senderName);
        const bodyObject = {
            sender: senderName,
            message: text
        };
        const bodyString = JSON.stringify(bodyObject); // Stringify payload
        return this.http.post(link, bodyObject, options) // ...using post request
            .map((res: Response) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }
}
