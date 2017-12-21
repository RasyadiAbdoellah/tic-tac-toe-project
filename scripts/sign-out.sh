#!/bin/bash

# sh scripts/sign-up.sh

curl "http://tic-tac-toe.wdibos.com/sign-out/1790" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \

echo
