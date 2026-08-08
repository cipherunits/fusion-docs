APP_NAME := next-app
IMAGE_NAME := $(APP_NAME):latest
CONTAINER_NAME := $(APP_NAME)-container
PORT := 3000

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make build       - Build Docker image"
	@echo "  make run         - Run container"
	@echo "  make stop        - Stop container"
	@echo "  make rm          - Remove container"
	@echo "  make restart     - Restart container"
	@echo "  make logs        - Show logs"
	@echo "  make clean       - Remove image and container"
	@echo "  make dev         - Run app locally with pnpm"
	@echo "  make install     - Install dependencies"
	@echo "  make build-app   - Build Next.js app locally"

# Build docker image
.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .

# Run container
.PHONY: run
run:
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):3000 \
		$(IMAGE_NAME)

# Stop container
.PHONY: stop
stop:
	docker stop $(CONTAINER_NAME) || true

# Remove container
.PHONY: rm
rm:
	docker rm $(CONTAINER_NAME) || true

# Restart container
.PHONY: restart
restart: stop rm run

# Show logs
.PHONY: logs
logs:
	docker logs -f $(CONTAINER_NAME)

# Clean everything
.PHONY: clean
clean: stop rm
	docker rmi $(IMAGE_NAME) || true

# Install dependencies locally
.PHONY: install
install:
	pnpm install

# Build Next.js app locally
.PHONY: build-app
build-app:
	pnpm build

# Run dev server locally
.PHONY: dev
dev:
	pnpm dev