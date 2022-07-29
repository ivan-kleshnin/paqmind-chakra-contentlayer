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

sh-mongo: # Shell to the mongo container
	@docker exec -it paqmind-mongo sh

# SEED
seed-mongo:
	@docker exec -it paqmind-mongo \
    mongoimport --db paqmind --collection users --type json --file seed/users.json --jsonArray --drop
# Then $ mongo
# Then > show dbs | > show collections

# LOGS
log-next:
	@docker logs paqmind-next -f

log-mongo:
	@docker logs paqmind-mongo -f

# LOCAL MACHINE ------------------------------------------------------------------------------------
cleanup:
	@docker system prune -a -f

cleanup-volumes:
	@docker system prune -a -f --volumes

kill-all:
	@docker kill $(docker ps -q)

mongod:
	@cd /usr/local/mongodb/bin && ./mongod --dbpath /usr/local/mongodb/data/db > ../logs/mongod.log 2>&1 &

mongo:
	@/usr/local/mongodb/bin/mongo
