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

    search(value): any {
        if (value) {
            console.log(value)
            return this._client.search({
              body: {
                size: 5,
                query: {
                   match: {
                      _all: {
                         query: `${value}`,
                         operator: 'and',
                         fuzziness: 2
                      }
                   }
                 }
               }
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
            requestTimeout: 3000
        });
    }
}
