#!/bin/bash

# Update and install dependencies
apt-get update
apt-get install -y curl git

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone the Prixi repository
git clone https://github.com/yourusername/prixi.git /opt/prixi

# Set up Prixi
cd /opt/prixi
cp .env.example .env
docker-compose up -d

# Set up systemd service
cp prixi.service /etc/systemd/system/
systemctl enable prixi
systemctl start prixi

echo "Prixi installation complete!"

