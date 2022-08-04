# include ${PWD}/docs/Makefile # draft

help: # Show this help
	@egrep -h '\s#\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?# "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

init: # Init
	@echo '# Added by Paqmind\n127.0.0.1 paqmind.local' | sudo tee -a /etc/hosts

install-next: # Install 'next app' deps
	@cd next ; yarn install

install: install-next # Install all deps

dev: # Run the project in the dev mode
	@docker compose -f docker-compose.yml up --build --detach

stop: # Stop all containers and remove orphans
	@docker-compose down --remove-orphans

# SHELLS
sh-%: # Shell to (postgres|hasura|next|nginx) containers e.g. $ make sh-next
	@docker exec -it paqmind-$* sh

# DB
#db-push:
#  @docker exec -it paqmind-next sh -c "npx prisma db push"
# seed-postgres:
#	@docker exec -it paqmind-postgres \
#    mongoimport --db paqmind --collection users --type json --file seed/users.json --jsonArray --drop
# Then $ psql
# Then > show dbs | > show collections

# LOGS
log-%: # # Logs from (postgres|hasura|next|nginx) containers e.g. $ make log-next
	@docker logs paqmind-$* -f

# LOCAL MACHINE ------------------------------------------------------------------------------------
prune-images: # Prune all images
	@docker system prune -f --all

prune-volumes: # Prune all volumes
	@docker system prune -f --volumes

kill-all: # Kill all containers
	@docker kill $(docker ps -q)
