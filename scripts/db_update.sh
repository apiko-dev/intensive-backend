#!/bin/bash

curl -s get.sdkman.io | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install groovy

./migrations/bootstrap/extensions.sh

cd migrations/schema
./liquibase.groovy update
