import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Client } from "elasticsearch";
import { ROUTER_DIRECTIVES } from "@angular/router";

import { ClientComponent } from './client.component';
import { AdminComponent } from './admin.component';

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

export class App {    
    constructor() { }   
}
