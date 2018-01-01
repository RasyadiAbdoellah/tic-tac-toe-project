#!/bin/bash

# sh scripts/sign-up.sh

curl "http://tic-tac-toe.wdibos.com/games/22548" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
  "game": {
    "cell": {
      "index": "'"${INDEX}"'",
      "value": "x"
    },
    "over": "true"
  }
}'
echo
