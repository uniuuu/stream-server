#!/bin/sh
set -x



# NPM
cd /usr/src/app 
npm cache clean --force 
#npx npm-check-updates -u
npm update
npm install
#npm update
#yarn add uWebSockets.js@uNetworking/uWebSockets.js#v20.23.0

# Start Stream server
#cd /usr/src/app && 
node index.js



