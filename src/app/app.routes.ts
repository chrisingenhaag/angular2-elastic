import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { AdminComponent } from './admin.component';


export const routes: Routes = [
  { path: '', component: ClientComponent },
  {
    path: 'admin',
    component: AdminComponent
  }
];