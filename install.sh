#!/bin/bash

# function to check if prixi is installed
is_prixi_installed() {
    if [ -d "/opt/prixi" ]; then
        return 0
    else
        return 1
    fi
}

# function to remove existing prixi installation
remove_existing_prixi() {
    echo "removing existing prixi installation..."
    systemctl stop prixi
    systemctl disable prixi
    rm -rf /opt/prixi
    rm -f /etc/systemd/system/prixi.service
    rm -rf /etc/prixi
    systemctl daemon-reload
}

# check if prixi is already installed
if is_prixi_installed; then
    echo "prixi is already installed. reinstalling..."
    remove_existing_prixi
else
    echo "prixi is not installed. proceeding with fresh installation."
fi

# proceed with installation
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
git clone https://github.com/oeo/prixi /opt/prixi

# set up prixi
cd /opt/prixi
cp .env.example .env

# create /etc/prixi directory and configuration file
mkdir -p /etc/prixi
touch /etc/prixi/prixi.conf

# copy example configuration if prixi.conf is empty
if [ ! -s /etc/prixi/prixi.conf ]; then
    echo "copying example configuration to /etc/prixi/prixi.conf..."
    cp /opt/prixi/.env.example /etc/prixi/prixi.conf
fi

# set up systemd service
cp prixi.service /etc/systemd/system/
systemctl enable prixi
systemctl start prixi

echo "prixi installation complete!"

