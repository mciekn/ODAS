DOCKER_COMPOSE_COM=docker-compose
IMAGES=notatex-notatex-app notatex-latex-compiler notatex-notatex-front
ifeq ($(OS),Windows_NT)
	SETUP_FILE=setup.psl
else
    UNAME_S := $(shell uname -s)
    ifeq ($(UNAME_S),Linux)
        SETUP_FILE=setup.sh
    endif
    ifeq ($(UNAME_S),Darwin)
        SETUP_FILE=setup_sm.sh
    endif
    UNAME_P := $(shell uname -p)
    ifeq ($(UNAME_P),x86_64)
        SETUP_FILE=setup_as.sh
    endif
    ifneq ($(filter %86,$(UNAME_P)),)
        SETUP_FILE=setup.sh
    endif
    ifneq ($(filter arm%,$(UNAME_P)),)
        SETUP_FILE=setup_sm.sh
    endif
endif
setup:
	setup_scripts/$(SETUP_FILE)
start:
	$(DOCKER_COMPOSE_COM) up
stop:
	$(DOCKER_COMPOSE_COM) down
clean:
	docker image rm $(IMAGES)
