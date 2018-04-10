#!/bin/bash
set -e

OUTPUT_DIR=$1

if [ -z "$OUTPUT_DIR" ]; then
    echo "Missing first argument: Output directory."
    exit 1
fi

mkdir -p $OUTPUT_DIR

# Docker does not allow mounting volumes with relative paths.
OUTPUT_ABSOLUTE_PATH=$(realpath $OUTPUT_DIR)

docker run -v "$OUTPUT_ABSOLUTE_PATH":/output --net=host schemaspy/schemaspy:snapshot -hq -s public -t pgsql -db "dasheddb" -u "dashed" -p "mypass" -host "localhost" -port "5432"
