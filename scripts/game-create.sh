#!/bin/bash

# sh scripts/sign-up.sh

curl "http://tic-tac-toe.wdibos.com/games" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \

echo
