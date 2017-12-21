#!/bin/bash

# sh scripts/sign-up.sh

curl "http://tic-tac-toe.wdibos.com/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
  "credentials": {
    "email": "ras1",
    "password": "123"
  }
}'

echo
