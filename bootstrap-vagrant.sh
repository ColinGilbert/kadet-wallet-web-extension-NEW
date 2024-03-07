!/usr/bin/env bash

apt update
apt upgrade -y
apt install docker.io -y
apt install docker-compose -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
apt install npm -y
docker pull kadena/devnet
