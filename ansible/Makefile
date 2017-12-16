
profile:= sms-dev
region:= us-west-2

aws_envs = AWS_PROFILE=${profile} AWS_DEFAULT_REGION=${region}
vault_args = --vault-password-file=~/.secrets/musi.vault

help: ## this help text
	@echo 'Available targets'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

virtualenv:  ## create virtual environment
	python3 -m pip install virtualenv
	python3 -m virtualenv venv
	./venv/bin/pip3 install -r requirements.txt

watch: ## watch file-system changes to trigger a command
	watchmedo shell-command --patterns="${pattern}" --recursive --command="${command}" .

musi-deploy: # deploy musi
	 ${aws_envs} ansible-playbook  ${vault_args} musi-deploy.yml -e env=${env} -e region=${region}

musi-terminate: # destroy musi
	 ${aws_envs} ansible-playbook  ${vault_args} musi-terminate.yml -e env=${env}
