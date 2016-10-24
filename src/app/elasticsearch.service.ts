import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, SearchResponse } from "elasticsearch";

@Injectable()
export class ElasticSearchService {
    private _client: Client;

    constructor() {
        if (!this._client) this._connect();
    }

    private _connect() {
        this._client = new Client({
            host: 'http://localhost:9200',
            log: 'trace'
        });
    }
    /*
        search(value): Promise<SearchResponse<any>> {
            if (value) {
                console.log(value)
                return this._client.search({
                    index: 'blog',
                    q: `title:${value}`
                })
            } else {
                return Promise.resolve({})
            }
        }
    
        addToIndex(value): Promise<any> {
            return this._client.create(value)
        }
    
        isAvailable(): Promise<any> {
            return this._client.ping({
                requestTimeout: Infinity,
                hello: "elasticsearch!"
            });
        }*/
    search(value): any {
        if (value) {
            console.log(value)
            return this._client.search({
                index: 'blog',
                q: `title:${value}`
            })
        } else {
            return Promise.resolve({})
        }
    }

    addToIndex(value): any {
        return this._client.create(value)
    }

    isAvailable(): any {
        return this._client.ping({
            requestTimeout: Infinity,
            hello: "elasticsearch!"
        });
    }
}
