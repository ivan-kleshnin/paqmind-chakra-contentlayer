# include ${PWD}/docs/Makefile # draft

help: # Show this help
	@egrep -h '\s#\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

init:
	@echo '# Added by Paqmind\n127.0.0.1 paqmind.local' | sudo tee -a /etc/hosts

install-next:
	@cd next ; yarn install

install: install-next

dev: # Run the project in the dev mode
	@docker compose -f docker-compose.yml up --build --detach

stop:
	@docker-compose down --remove-orphans

# SHELL TO
sh-next: # Shell to the next container
	@docker exec -it paqmind-next sh

sh-postgres: # Shell to the postgres container
	@docker exec -it paqmind-postgres sh

# DB
db-push:
	@docker exec -it paqmind-next sh -c "npx prisma db push"
# seed-postgres:
#	@docker exec -it paqmind-postgres \
#    mongoimport --db paqmind --collection users --type json --file seed/users.json --jsonArray --drop
# Then $ psql
# Then > show dbs | > show collections

# LOGS
log-next:
	@docker logs paqmind-next -f

log-postgres:
	@docker logs paqmind-postgres -f

# LOCAL MACHINE ------------------------------------------------------------------------------------
prune-images:
	@docker system prune -f --all

prune-volumes:
	@docker system prune -f --volumes

kill-all:
	@docker kill $(docker ps -q)
