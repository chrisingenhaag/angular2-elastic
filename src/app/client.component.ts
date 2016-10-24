import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { AutoComplete } from "./autocomplete/autocomplete"
@Component({
    selector: 'client',  
    template: `
    <section>  
        <a [routerLink]="['/admin']" class="list-group-item">Admin</a>
        <br>
        <br>
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="wrapper">
                    <autocomplete (selected)="autocompleteCanged($event)" (found)=foundItemsChanged($event)></autocomplete>
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
    styles: [
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
    foundItemsChanged(items) {
        // todo something
    }
}
