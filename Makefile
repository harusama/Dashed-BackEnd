#!make
MAKEFLAGS += --silent

# Generates documentation artifacts.
docs:
	echo "Generating documentation..."
	scripts/create-db-docs.sh ./docs/db

.PHONY: docs