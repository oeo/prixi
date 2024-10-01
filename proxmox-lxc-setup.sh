#!/bin/bash

# Proxmox LXC setup script for Prixi

# Create the LXC container
pct create 100 local:vztmpl/ubuntu-20.04-standard_20.04-1_amd64.tar.gz \
  --hostname prixi \
  --memory 2048 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --storage local-lvm \
  --password yourpassword

# Start the container
pct start 100

# Wait for the container to start
sleep 10

# Copy the install script to the container
pct push 100 install.sh /root/install.sh

# Make the script executable
pct exec 100 -- chmod +x /root/install.sh

# Run the install script
pct exec 100 -- /root/install.sh

echo "Prixi LXC container setup complete!"

