
profile:= sms-dev
region:= us-west-2

aws_envs = AWS_PROFILE=${profile} AWS_DEFAULT_REGION=${region}
vault_args = --vault-password-file=~/.secrets/musi.vault

help: ## this help text
	@echo 'Available targets'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# environment
venv:  ## create virtual environment
	python3 -m pip install virtualenv
	python3 -m virtualenv venv

install:
	./venv/bin/pip3 install -r requirements.txt

# development
edit: ## edit secrets
	./venv/bin/ansible-vault --vault-password-file ~/.secrets/musi.vault edit vars/secrets.yml

watch: ## watch file-system changes to trigger a command
	watchmedo shell-command --patterns="${pattern}" --recursive --command="${command}" .


# deploy
deploy: # deploy musi
	 ${aws_envs} ./venv/bin/ansible-playbook  ${vault_args} musi-deploy.yml -e env=${env} -e region=${region}

terminate: # destroy musi
	 ${aws_envs} ./venv/bin/ansible-playbook  ${vault_args} musi-terminate.yml -e env=${env}
