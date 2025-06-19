import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



export interface User{
  name: string;
  role: number;
}
@Injectable()
export class AuthProvider {
  currentUser:User;

  constructor() {
  }

    login(name: string, pw: string) : Promise<boolean> {
      return new Promise((resolve, reject) => {
        /** IF 0 technician */
        if (name === 'tech' && pw === 'tech') {
          this.currentUser = {
            name: name,
            role: 0
          };
          resolve(true); 

          /** IF 1 client */
        } else if (name === 'user' && pw === 'user') {
          this.currentUser = {
            name: name,
            role: 1
          };
          resolve(true);
        } else {
          reject(false);
        }
      });
    }
    isLoggedIn(){
      return this.currentUser != null;
    }
    logout(){
      this.currentUser = null;
    }

    isTech() {
      return this.currentUser.role === 0;
    }
  }


