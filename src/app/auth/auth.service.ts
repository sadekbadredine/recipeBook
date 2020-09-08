import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';


import { x } from './x.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
     x = new BehaviorSubject<x>(null);
     expirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError) ,tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                )  
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError) ,tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                )  
            })
        );
    }

    autoLogin(){
        const userData : {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new x(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        
        if (loadedUser.token) {
            this.x.next(loadedUser);
            const remainingDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(remainingDuration)
            console.log('remaing token duration: ' + remainingDuration);
            
        }
    }

    autoLogout(expirationDuration: number) {
        this.expirationTimer = setTimeout(() => {
        this.logout();
    }, expirationDuration);
}

    logout() {
        this.x.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if (this.expirationTimer) {
            clearTimeout(this.expirationTimer)
        }
    }

    private handleAuthentication(email: string,userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new x(email, userId, token, expirationDate);
        this.x.next(user);
        this.autoLogout(expiresIn * 1000);
        // to store data in local storage for not loosing it when we restart the app
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknonw error occured'
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'Oops! Email exists :/'
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'Email was not found! :('
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'You entered a wrong password, Please try again :)'
                  break;
              }
              return throwError(errorMessage);
    }
}