import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub : Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }
  
  ngOnInit() {
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(resData => {
      this.router.navigate(['/recipes'])
      this.isLoading = false;
    },
      errorMessage => {
        console.log(errorMessage);
        this.showErrorAlert(errorMessage)
        this.error = errorMessage;
        this.isLoading = false;
      }
    );


    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostVcREf = this.alertHost.vcRef;
    hostVcREf.clear();

    const cmpRef = hostVcREf.createComponent(alertCmpFactory);
    // instance has the properties we created in alertComponent
    cmpRef.instance.message = message;
    this.closeSub = cmpRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostVcREf.clear();
    })
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
