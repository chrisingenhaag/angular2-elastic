import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import * as elasticsearch from "elasticsearch";
import {FormBuilder, Control, ControlGroup} from "angular2/common"
import {ElasticSearchService} from './elasticsearch.service';
@Component({
    selector: 'admin',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <div> 
    <a [routerLink]="['Client']" class="list-group-item">Back to client</a> 
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
                <form [ngFormModel]="form" #f="ngForm" (ngSubmit)="onSubmit(form.value)">
                    <div class="form-group">
                        <label class="control-label" for="index">Index</label>
                        <input disabled type="text" class="form-control" id="index" #index="ngForm" placeholder="index" ngControl="index" [(ngModel)]="model.index">
                        <div *ngIf="index.control.hasError('required') && submitted">
                            Name field is required
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="url">Post url</label>
                        <input type="text" class="form-control" id="url" #url="ngForm" placeholder="Url" ngControl="url" [(ngModel)]="model.url">
                        <div *ngIf="url.control.hasError('required') && submitted">
                            Address field is required
                        </div>
                    </div> 
                    <div class="form-group">
                        <label class="control-label" for="title">Post title</label>
                        <input type="text" class="form-control" id="title" #title="ngForm" placeholder="Title" ngControl="title" [(ngModel)]="model.title">
                        <div *ngIf="title.control.hasError('required') && submitted">
                            Address field is required
                        </div>
                    </div> 
                    <div class="form-group">
                        <label class="control-label" for="text">Post text</label>
                        <textarea type="text" class="form-control" id="text" #text="ngForm" placeholder="text" ngControl="text" [(ngModel)]="model.text">
                        </textarea>
                        <div *ngIf="text.control.hasError('required') && submitted">
                            Address field is required
                        </div>
                    </div>           
                    <button type="submit" [disabled]="process" class="btn btn-primary pull-right">Submit</button>
                </form>              
            </div>
       </div>
 </div>
  `,
})

export class AdminComponent implements OnInit {
    form: ControlGroup;
    client: elasticsearch.ClientInterface;
    status: string;
    process: boolean = false;
    model: any = {
        index: "blog",
        url: "",
        title: "",
        text: ""
    }
    constructor(fbuilder: FormBuilder, private es: ElasticSearchService) {
        this.form = fbuilder.group({
            index: new Control(""),
            url: new Control(""),
            title: new Control(""),
            text: new Control("")
        });
    }
    ngOnInit() {
        this.es.isAvailable().then(() => {
            this.status = "OK"
        }, (err) => {
            this.status = "ERROR"
            console.error('Server is down', err);
        })
    }
    onSubmit(value) {
        this.process = true;
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
        }).subscribe((result) => {
            console.log(result);
            alert("Document added, see log for more info");
            this.process = false;
        }, error=> {
            alert("Something went wrong, see log for more info")
            console.error(error);
            this.process = false;
        })
    }
}