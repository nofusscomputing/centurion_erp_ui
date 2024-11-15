#!/bin/sh

set -e

npm version ${NEW_VERSION} --no-git-tag-version
