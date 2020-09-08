import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
        // we export things we want to have access to form outside this modules
    ],
    entryComponents: [
      // this for creating components without a selector or with router usage, but with manual creation
      AlertComponent
      // we can ommit this entryComponent property in angular 9 +
    ]
})
export class SharedModule {}