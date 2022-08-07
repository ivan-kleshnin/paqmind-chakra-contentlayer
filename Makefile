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
prisma-db-pull:
	@docker exec -it paqmind-next sh -c "npx prisma db pull"
	@docker cp 8093098637ec:/usr/src/app/prisma/schema.prisma ./next/prisma/schema2.prisma

xxx:
	@docker cp ./next/prisma/schema.prisma 8093098637ec:/usr/src/app/prisma/schema.prisma

prisma-db-push:
	@docker exec -it paqmind-next sh -c "npx prisma db push"

prisma-migrate-dev:
	@docker exec -it paqmind-next sh -c "npx prisma migrate dev"

prisma-migrate-deploy:
	@docker exec -it paqmind-next sh -c "npx prisma migrate deploy"

db-dump:
	@docker exec -it paqmind-postgres sh -c "pg_dump paqmind > ./paqmind.sql"
#	@docker exec -it paqmind-postgres sh -c "pg_dump -Fc paqmind > ./paqmind.sql"
	@docker cp paqmind-postgres:./paqmind.sql ./postgres/paqmind2.sql

db-restore:
	@docker cp ./postgres/paqmind.sql paqmind-postgres:./paqmind2.sql
#	@docker exec -it paqmind-postgres sh -c "pg_restore --clean -d paqmind ./paqmind2.sql"
	@docker exec -it paqmind-postgres sh -c "dropdb paqmind --force && createdb paqmind && psql < ./paqmind.sql"

db-restore-temp:
	@docker cp ./postgres/dbdiagram-and-jakobmaier.sql paqmind-postgres:./temp.sql
	@docker exec -it paqmind-postgres sh -c "dropdb paqmind --force && createdb paqmind && psql < ./temp.sql"

# seed-postgres:
#	@docker exec -it paqmind-postgres \
#    mongoimport --db paqmind --collection users --type json --file seed/users.json --jsonArray --drop
# Then $ psql
# Then > show dbs | > show collections

# OBSERVE
ps:
	@docker ps

log-%: # # Logs from (postgres|hasura|next|nginx) containers e.g. $ make log-next
	@docker logs paqmind-$* -f

# CLEANUP
clean-images: # Clean all images
	@docker system prune -f --all

clean-volumes: # Clean all volumes
	@docker system prune -f --volumes

kill-all: # Kill all containers
	@docker kill $(docker ps -q)
