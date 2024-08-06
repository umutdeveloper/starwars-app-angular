import { Routes } from '@angular/router';
import { Routes as PageRoutes } from './utils/routes';
import { LayoutComponent } from './templates/layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: PageRoutes.People,
      },
      {
        path: PageRoutes.People,
        loadComponent: () => import('./pages/people/people.component').then(c => c.PeopleComponent),
      },
      {
        path: PageRoutes.Films,
        loadComponent: () => import('./pages/films/films.component').then(c => c.FilmsComponent),
      },
      {
        path: PageRoutes.Planets,
        loadComponent: () => import('./pages/planets/planets.component').then(c => c.PlanetsComponent),
      },
      {
        path: PageRoutes.Species,
        loadComponent: () => import('./pages/species/species.component').then(c => c.SpeciesComponent),
      },
      {
        path: PageRoutes.Starships,
        loadComponent: () => import('./pages/starships/starships.component').then(c => c.StarshipsComponent),
      },
      {
        path: PageRoutes.Vehicles,
        loadComponent: () => import('./pages/vehicles/vehicles.component').then(c => c.VehiclesComponent),
      },
    ],
  },
];
