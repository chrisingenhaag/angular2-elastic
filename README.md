[![CircleCI][circle-image]][circle-url]
## Description / Inspiration

I wanted to create a sample for autocompletion with elasticsearch. After a time with the elasticsearch docs according to [suggesters](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html) I found a quite interesting blog entry from Sloan Ahrens from qbox [here](https://qbox.io/blog/multi-field-partial-word-autocomplete-in-elasticsearch-using-ngrams).

In conclusion my first approach to create a sample on the completion suggester not enough flexibility for me. It´s designed to be very fast. But therefore there are some limitations for this speed.

Additionally some of the examples don´t provide real world examples with sample data. So I took the accounts.json from elastic search documentation, adjusted the index configuration from Sloan Ahrens to fit the sample data and then forked byavvs repo to have a sample angular2 application with elasticsearch integration.

## First of all
* Install elasticsearch server according to the [instructions](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html).
* Add this lines to your elasticsearch.yml configuration file (it's not recommended in real app):

```yml
http.cors.enabled : true
http.cors.allow-origin : "*"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```

## Setup Elasticsearch index
Run script
```bash
sh ./preparation/setup.sh
```

## Quick start for app
Install:
```bash
npm install -g webpack webpack-dev-server
npm install
```
Build:
```bash
npm run build
```
Start in dev mode (available on [localhost:8080](localhost:8080) by default)
```bush
npm run dev
```
Follow this steps:
1. Go to admin tab and add something to the elasticsearch index using provided form
2. Go back to the client page
3. Search! (performed by title field by default)

[circle-image]: https://circleci.com/gh/byavv/angular2-elastic.svg?style=shield
[circle-url]: https://circleci.com/gh/byavv/angular2-elastic
