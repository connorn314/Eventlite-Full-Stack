#!/usr/bin/env bash

# exit on error
set -o errexit

npm run build
bundle install
# rails db:drop DISABLE_DATABASE_ENVIRONMENT_CHECK=1 db:create db:migrate db:seed 
rails db:migrate db:seed 
