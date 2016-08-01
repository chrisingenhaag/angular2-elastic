import { ComponentRef } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {
    disableDeprecatedForms,
    provideForms  } from '@angular/forms';
import { APP_ROUTER_PROVIDERS } from './app/routes';

import { App } from './app/app';
import { ElasticSearchService } from "./app/elasticsearch.service";

const PROVIDERS = [
    ...HTTP_PROVIDERS,
    ...APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    ElasticSearchService
];

bootstrap(App, PROVIDERS);
