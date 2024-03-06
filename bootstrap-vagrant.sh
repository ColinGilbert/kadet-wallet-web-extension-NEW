!/usr/bin/env bash

apt update
apt upgrade -y
apt install docker.io -y
apt install docker-compose -y
docker pull kadena/devnet
