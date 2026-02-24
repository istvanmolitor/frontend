#!/bin/bash

# Create the src/packages directory if it doesn't exist
mkdir -p src/packages

# Clone the repositories
git clone git@github.com:istvanmolitor/vue-admin.git src/packages/vue-admin
git clone git@github.com:istvanmolitor/vue-menu.git src/packages/vue-menu

echo "Repositories cloned successfully into src/packages/"

