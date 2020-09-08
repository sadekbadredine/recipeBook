import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component'

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: AuthComponent },
    ]),
    CommonModule,
    FormsModule,
    SharedModule
],
exports: [RouterModule]

})
export class AuthModule {}