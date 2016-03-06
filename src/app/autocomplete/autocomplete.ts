import {Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES, Control, FORM_DIRECTIVES} from 'angular2/common';
import * as rx from 'rxjs';
import {ElasticSearchService} from '../elasticsearch.service';

@Component({
    selector: 'autocomplete',
    template: require('./autocomplete.html'),
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    outputs: ['changed'],
    styles: [require('./style.css')]
})

export class AutoComplete implements OnInit, AfterViewInit {
    visible = true;
    seachText: Control;
    seachTextModel: string;
    results: Array<string>;
    message: string;
    active: boolean = false;
    changed: EventEmitter<any> = new EventEmitter();
    @ViewChild("seachInput") input: ElementRef;

    constructor(private es: ElasticSearchService) {
        this.seachText = new Control();
    }
    ngOnInit() {
        this.seachText
            .valueChanges
            .map(value => {                                                             // disable space-only input
                if (value && value.trim()) {
                    return value.trim();
                } else {
                    return this.cleanControl();                  
                }
            })
            .filter(value => value)                                                     // stop if empty
            .do(value => this.message = 'searching...')                                 // every iteration
            .debounceTime(700)                                                          // wait when input completed  
            .map((value: string) => value.toLowerCase())                                // depends on search strategy
            .distinctUntilChanged()
            .switchMap(value => this.es.search(value))                                  // switchable request
            .map((esResult: any) =>
                ((esResult.hits || {}).hits || []).map((hit) => hit._source))           // extract results
            .subscribe((results) => {
                this.toggleResults(results);
            }, (err) => {
                console.error(err)
            })
    }
    ngAfterViewInit() {
        rx.Observable.fromEvent(this.input.nativeElement, "blur")
            .subscribe((event: FocusEvent) => {
                setTimeout(() => {
                    this.active = false;
                }, 100)
            })
        rx.Observable.fromEvent(this.input.nativeElement, "focus")
            .subscribe(() => {
                this.active = true;
            })
    }
    resutSelected(result) {
        this.changed.next(result);
    }
    cleanControl(): any {
        this.message = null;
        this.results = [];
        this.seachTextModel = "";
        return this.seachTextModel;
    }
    toggleResults(results = null) {
        if (results.length) {
            this.results = results;
            this.message = null;
        } else {
            this.results = [];
            this.message = 'nothing was found'
        }
    }
}