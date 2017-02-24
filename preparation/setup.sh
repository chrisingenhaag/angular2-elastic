#!/bin/bash

echo "prepare elasticsearch index"
curl -XPUT 'localhost:9200/bank?pretty' --data-binary "@index_settings.json" -H 'Content-Type: application/json'

echo "import sample accounts.json from elasticsearch doc"
curl -XPOST 'localhost:9200/bank/account/_bulk?pretty&refresh' --data-binary "@accounts.json" -H 'Content-Type: application/json'

echo "sample request"
curl -XPOST "http://localhost:9200/bank/_search?pretty" -d'
{
   "size": 10,
   "query": {
      "match": {
         "_all": {
            "query": "avenue",
            "operator": "and",
            "fuzziness": 2
         }
      }
    }
}'
