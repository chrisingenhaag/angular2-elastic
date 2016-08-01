import { provideRouter, RouterConfig, Route } from '@angular/router';
import { ClientComponent } from './client.component';
import { AdminComponent } from './admin.component';

export const routes: RouterConfig = [
  { path: '', component: ClientComponent, pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent    
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
