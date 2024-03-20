#!/usr/bin/env bash

sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
#apt install docker.io -y
#apt install docker-compose -y
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install lts/hydrogen
nvm use lts/hydrogen
#docker pull kadena/devnet
