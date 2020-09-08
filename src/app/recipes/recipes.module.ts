import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

// Declare  and import everythings will be used in this modules such as 
// modules
// compontents
// Directives
// pipes  

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports:[ 
        // RouterModule,
        SharedModule,
        // CommonModule is to use BrowserModule in this modules
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule {}