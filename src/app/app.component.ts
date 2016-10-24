import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { ClientComponent } from './client.component';
import { AdminComponent } from './admin.component';

@Component({
    selector: 'app',   
    template: `
    <div class="container">  
        <router-outlet>
        </router-outlet> 
    </div>
  `,
})

export class AppComponent {    
    constructor() { }   
}
