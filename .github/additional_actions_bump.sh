#!/bin/sh

set -e

sed -E 's#"version": "(.+)"#"version: "'${NEW_VERSION}'"#g' -i package.json

sed -E 's#"version": "(.+)"#"version: "'${NEW_VERSION}'"#g' -i package-lock.json
