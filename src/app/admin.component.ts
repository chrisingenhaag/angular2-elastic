import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import * as elasticsearch from "elasticsearch";
import { FormBuilder, FormGroup, REACTIVE_FORM_DIRECTIVES } from "@angular/forms"
import { ElasticSearchService } from './elasticsearch.service';

@Component({
    selector: 'admin',
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `
        <div> 
            <a [routerLink]="['/']" class="list-group-item">Back to client</a> 
            <div class="row">
                <h5 class="col-md-12">Somewhere in your admin dashboard)</h5>
            </div>
            <div class="row">
                <h3 class="col-md-12 text-center">Elasticsearch server status: {{status}}</h3>
            </div>
            <div class="col-md-6 col-md-offset-3">      
                <div class="row">
                    <h4 class="col-md-12 text-center">Post index</h4>
                </div>
                <div class="row">
                    <form [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
                        <div class="form-group">
                            <label class="control-label" for="index">Index</label>
                            <input disabled type="text" class="form-control" id="index" placeholder="index" ngControl="index" [ngModel]="model.index" name="index">
                            <div *ngIf="form.controls['index'].valid && submitted">
                                Name field is required
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="url">Post url</label>
                            <input type="text" class="form-control" id="url" placeholder="Url" ngControl="url" [(ngModel)]="model.url" name="url">
                            <div *ngIf="form.controls['url'].valid && submitted">
                                Address field is required
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="control-label" for="title">Post title</label>
                            <input type="text" class="form-control" id="title" placeholder="Title" ngControl="title" [(ngModel)]="model.title" name="title">
                            <div *ngIf="form.controls['title'].valid && submitted">
                                Address field is required
                            </div>
                        </div> 
                        <div class="form-group">
                            <label class="control-label" for="text">Post text</label>
                            <textarea type="text" class="form-control" id="text" placeholder="text" ngControl="text" [(ngModel)]="model.text" name="text">
                            </textarea>
                            <div *ngIf="form.controls['text'].valid && submitted">
                                Address field is required
                            </div>
                        </div>           
                        <button type="submit" class="btn btn-primary pull-right">Submit</button>
                    </form>              
                </div>
            </div>
        </div>
  `,
})

export class AdminComponent implements OnInit {
    form: FormGroup;
    client: elasticsearch.ClientInterface;
    status: string;   
    model: any = {
        index: "blog",
        url: "",
        title: "",
        text: ""
    }

    constructor(fbuilder: FormBuilder, private es: ElasticSearchService, private cd: ChangeDetectorRef) {
        this.form = fbuilder.group({
            index: [""],
            url: [""],
            title: [""],
            text: [""],
        });
    }

    ngOnInit() {
        this.es.isAvailable().then(() => {
            this.status = "OK"
        }, (err) => {
            this.status = "ERROR"
            console.error('Server is down', err);
        }).then(()=>{
            //elasticsearch
            this.cd.detectChanges();
        })
    }

    onSubmit(value) {      
        this.es.addToIndex({
            index: "blog",
            type: 'post',
            body: {
                url: value.url,
                title: value.title,
                tags: ['super', 'post'],
                published: Date.now(),
                text: value.text
            }
        }).then((result) => {
            console.log(result);
            alert("Document added, see log for more info");          
        }, error => {
            alert("Something went wrong, see log for more info")
            console.error(error);           
        })
    }
}
