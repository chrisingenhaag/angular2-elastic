import {ComponentRef} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';

import {App} from './app/app';
import {ElasticSearchService} from "./app/elasticsearch.service"

const PROVIDERS = [
    ...HTTP_PROVIDERS,
    ...FORM_PROVIDERS,
    ...ROUTER_PROVIDERS ,
    ElasticSearchService   
];
//smth

bootstrap(App, PROVIDERS)
    .then((appRef: ComponentRef) => {
      
    }, error => console.log(error))