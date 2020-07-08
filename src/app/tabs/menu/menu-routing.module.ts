import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';
import { PerfilPage } from './perfil/perfil.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  {
    path: 'perfil',
    component: PerfilPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
