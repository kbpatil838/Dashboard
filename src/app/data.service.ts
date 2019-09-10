import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCount () {
    return this.http.get('http://127.0.0.1:5000/count');
  }

  tests ()  {
    return this.http.get('http://127.0.0.1:5000/tests');
  }

  gettests (){
    return this.http.get('http://127.0.0.1:5000/');
  }
}
