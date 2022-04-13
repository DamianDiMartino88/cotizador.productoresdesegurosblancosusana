import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../Models/Email';

@Injectable({
  providedIn: 'root'
})
export class MailingService {

  constructor(private _http: HttpClient) { }

  private baseUrl = "https://secret-island-01332.herokuapp.com/"
//https://www.youtube.com/watch?v=p4bnK0qy89w
//https://www.youtube.com/watch?v=nF9g1825mwk

  mailSender(mailToSend: Email){
    console.log("Mail Service")
    console.log(mailToSend)
    this._http.post(this.baseUrl + "send", mailToSend).subscribe((data)=>{
      console.log(data);
    })
  }
}