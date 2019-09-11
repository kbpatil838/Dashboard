import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCount ():Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/count');
  }

  tests ():Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/tests');
  }

  gettests ():Observable<any>{
    return this.http.get<any>('http://127.0.0.1:5000/');
  }
}
