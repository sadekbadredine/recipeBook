import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', 
    loadChildren: './recipes/recipes.module#RecipesModule' 
  },
  { path: 'shopping-list', 
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' 
  },
  { path: 'auth', 
    loadChildren: './auth/auth.module#AuthModule' 
  }
  // loadChildren is a special property in a route config which angular understands please only load the code content or the module i'll point you at , when the user visits this path
  // Angular will go to that relative path and try dynamically import a specific object from that file and theoretically could be named anything. But since we are following the naming convention of naming this module RecipesModule when the file name in this case is recipes.module.ts, but no one is forcing us to follow that naming convention. Thats why we have to tell angular what's the exported name of that class module explicitly by adding #exportedMduleName or in this case #RecipesModule
  // The effect of this paht is that the code is split at that point, so everything in this module will be put into a separate code bundle, which is then downloaded and parsed on demand when the user visits this path
  // side note: we should remove .ts from the name of the relative path
  // in angular 9+ we use a different path format
  // { path: '/recipes', 
  // loadChildren: () => import('./recipes/recipes.module').then(m=> m.RecipesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, 
    {preloadingStrategy: PreloadAllModules})],
  // RouterModule prvides directives such router-outlet and router-link
  exports: [RouterModule]
})
export class AppRoutingModule {}
