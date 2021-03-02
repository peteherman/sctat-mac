#!/bin/bash
cd ../copy-sctat-pack
expo build:web
cd ../forge-using-pack
cp -r ../copy-sctat-pack/web-build/* ./src
npm run start
