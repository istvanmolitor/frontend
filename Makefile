.PHONY: help start stop dev build

# Default target
.DEFAULT_GOAL := help

## Help command
help: ## Mutasd a segítséget
	@echo "Elérhető parancsok:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

## Projekt kezelés
start: ## Frontend dev szerver indítása
	npm run dev

stop: ## Frontend dev szerver leállítása
	@echo "Használd Ctrl+C-t a dev szerver leállításához"

dev: start ## Alias a start-hoz

build: ## Frontend build
	npm run build
