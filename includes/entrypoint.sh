#!/bin/sh

set -e


cat <<EOF > /usr/share/nginx/html/env.js

window.env = {
    API_URL: "${API_URL}",
    CI_PROJECT_URL: ${CI_PROJECT_URL},
    CI_COMMIT_SHA: ${CI_COMMIT_SHA},
    CI_COMMIT_TAG: ${CI_COMMIT_TAG}
};

EOF


if [ "$1" == "" ]; then


    echo "[Info] Starting SupervisorD";


    /usr/bin/supervisord;


else

    exec "$@"

fi
