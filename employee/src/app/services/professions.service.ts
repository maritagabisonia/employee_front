import { Injectable } from '@angular/core';
import { profession } from '../model/profession';
import { Observable  } from 'rxjs';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  public professions: profession[] = []

  constructor(public http: HttpClient) { }


  getProfessions(): Observable<profession[]> {
    console.log(1)
    return this.http.get<profession[]>("https://localhost:7245/api/employee/profession");

  };


  get professionsList(): profession[] {
    return this.professions
  }
  set professionsList(list: profession[]) {
    this.professions = list;
  }

}
