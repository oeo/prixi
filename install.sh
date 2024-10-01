#!/bin/bash

apt-get update
apt-get install -y curl git

# install node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# install docker compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# clone the prixi repository
git clone https://github.com/yourusername/prixi.git /opt/prixi

# set up prixi
cd /opt/prixi
cp .env.example .env

# create /etc/prixi directory and configuration file
mkdir -p /etc/prixi
touch /etc/prixi/prixi.conf

# set up systemd service
cp prixi.service /etc/systemd/system/
systemctl enable prixi
systemctl start prixi

echo "Prixi installation complete!"

