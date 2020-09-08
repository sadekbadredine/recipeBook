import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    // BrowserModule is the only special case, must be used onces and that is in the AppModule
    // instead we import CommonModule if we wanna use BrowserModule in another module
    // it gives us directives such as ngIf and ngFor and other general application startup work 
    // that has to run once
    HttpClientModule,
    // HttpClientModule only provides services, no directives or componets, so it's accessible in auther ,modules, so we add it once in AppModule to be accessible in other modules
    AppRoutingModule,
    // RecipesModule, this is now loaded in lazy loading
    // RecipesModule has no access to all the other modules in the AppModule
    // ShoppingListModule, this is now loaded in lazy loading
    SharedModule,
    CoreModule,
    // AuthModule , this is now loaded in lazy loading
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
