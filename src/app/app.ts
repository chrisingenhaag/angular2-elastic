import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {Client} from "elasticsearch";
import {Router, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ClientComponent} from './client.component';
import {AdminComponent} from './admin.component';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <div class="container">  
        <router-outlet>
     </router-outlet> 
    </div>
  `,
})
@RouteConfig([
    { path: '/', as: 'Client', component: ClientComponent },
    { path: '/admin', as: 'Admin', component: AdminComponent }
])
export class App {    
    constructor() { }   
}