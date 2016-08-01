import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormControlName,
    REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { ElasticSearchService } from '../elasticsearch.service';

@Component({
    selector: 'autocomplete',
    template: require('./autocomplete.html'),
    directives: [REACTIVE_FORM_DIRECTIVES],
    styles: [require('./style.css')],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AutoComplete implements AfterViewInit {
    visible = true;
    seachTextModel: string;
    results$: Subject<any> = new Subject();
    results;
    count: number;
    message: string;
    active: boolean = false;
    form: FormGroup;    
    @Output()
    found: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();
    constructor(private es: ElasticSearchService, private cd: ChangeDetectorRef) {
        this.form = new FormGroup({
            seachText: new FormControl('')
        });
        this.results$.subscribe((res) => {
            this.found.emit(res);
            //    this.cd.markForCheck();
            //     this.cd.detectChanges();
        })
    }

    ngOnDestroy() {
        this.results$.unsubscribe();
    }

    ngAfterViewInit() {
        this.form.controls["seachText"]
            .valueChanges
            .map((ẗext: any) => ẗext ? ẗext.trim() : '')                            // ignore spaces         
            .do(searchString => searchString ? this.message = 'searching...' : this.message = "")
            .debounceTime(500)                                                                              // wait when input completed
            .distinctUntilChanged()
            .switchMap(searchString => this.es.search(searchString))                                        // switchable request 
            .map((searchResult: any) => ((searchResult.hits || {}).hits || []).map((hit) => hit._source))   // extract results   
            .do(results => {                
                if (results.length > 0) {
                    this.message = "";
                }
                else {
                    if (this.seachTextModel && this.seachTextModel.trim())
                        this.message = "nothing was found";
                }

            })
            .catch(this.handleError)
            .subscribe(this.results$);     
    }

    resutSelected(result) {
        this.selected.next(result);
    }

    handleError(): any {
        this.message = "something went wrong";
    }
}
