import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaracterisiticasCrearComponent } from './caracterisiticas-crear/caracterisiticas-crear.component';
import { CaracteristicasPersonalesSospechososComponent } from './caracteristicas-personales-sospechosos/caracteristicas-personales-sospechosos.component';

const routes: Routes = [
    {
      path: 'Listar caracterisiticas',
      component: CaracteristicasPersonalesSospechososComponent,
      data: { title: 'carcaterisicas' },
    },
    {
      path: 'Crar caracterisiticas',
      component: CaracterisiticasCrearComponent,
      data: { title: 'carcaterisicas' },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaracteristicasPersonalesRoutingModule { }

