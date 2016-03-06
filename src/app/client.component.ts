import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {Client} from "elasticsearch";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AutoComplete} from "./autocomplete/autocomplete"
@Component({
    selector: 'client',
    directives: [ROUTER_DIRECTIVES, AutoComplete],
    template: `
    <section>  
        <a [routerLink]="['Admin']" class="list-group-item">Admin</a>
        <br>
        <br>
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="wrapper">
                    <autocomplete (changed)="autocompleteCanged($event)"></autocomplete>
                </div>                 
            </div>
        </div>
         <div class="row">
          <div class="col-md-4">
        <div *ngIf='!!selectedValue'>
         <div><strong>Selected item:</strong></div>
         <br>
         <i>
         {{selectedValue}}
         </i>
        </div>
        
    </div>
        </div>
    </section>
  `,
  styles:[
      `
      .wrapper{
          background: gray;
          padding: 10px;
      }
      `
  ]
})

export class ClientComponent {
    selectedValue: string;
    constructor() {
    }
    autocompleteCanged(value) {
        this.selectedValue = JSON.stringify(value);
    }
}