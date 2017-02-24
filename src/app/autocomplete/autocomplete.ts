import { Component, OnInit, AfterViewInit, Output, EventEmitter, NgZone, OnChanges, ChangeDetectionStrategy } from "@angular/core";
import {
    FormGroup,
    FormControl,
    FormControlName
} from "@angular/forms";

import { Subject, Observable } from "rxjs";
import { ElasticSearchService } from "../elasticsearch.service";

@Component({
    selector: "autocomplete",
    template: require("./autocomplete.html"),
    styles: [require("./style.css")],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AutoComplete implements AfterViewInit {
    @Output()
    found: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    seachTextModel: string;
    results$: Subject<Array<any>> = new Subject<Array<any>>();
    message: string = "";
    active: boolean = false;
    seachText: FormControl = new FormControl("");

    constructor(private es: ElasticSearchService, private _ngZone: NgZone) {
        this.results$.subscribe((res) => {
            this.found.emit(res);
        });
    }

    ngAfterViewInit() {
        this.seachText
            .valueChanges
            .map((text: any) => text ? text.trim() : "")                                             // ignore spaces
            .do(searchString => searchString ? this.message = "searching..." : this.message = "")
            .debounceTime(500)                                                                      // wait when input completed
            .distinctUntilChanged()
            .switchMap(searchString => {
                return new Promise<Array<any>>((resolve, reject) => {
                    this._ngZone.runOutsideAngular(() => {                                          // perform search operation outside of angular boundaries
                        this.es.search(searchString)
                            .then((searchResult) => {
                                this._ngZone.run(() => {
                                    let results: Array<any> = ((searchResult.hits || {}).hits || [])// extract results from elastic response
                                        .map((hit) => hit._source);
                                    if (results.length > 0) {
                                        this.message = "";
                                    }
                                    else {
                                        if (this.seachTextModel && this.seachTextModel.trim())
                                            this.message = "nothing was found";
                                    }
                                    resolve(results);
                                });
                            })
                            .catch((error) => {
                                this._ngZone.run(() => {
                                    reject(error);
                                });
                            });
                    });
                });
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
