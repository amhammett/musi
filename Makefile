.PHONEY = help venv install run build


help: ## this help text
	@echo 'Available targets'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## install node modules
	yarn install

build: ## build application
	yarn build

# development

run: ## run the local ui
	yarn start
