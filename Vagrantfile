# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Use the Ubuntu Bionic 64 box
  config.vm.box = "ubuntu/bionic64"

  # Forward port 5001 from guest to host
  config.vm.network :forwarded_port, guest: 5001, host: 5001

  # Other configurations...

  # Uncomment and customize the following lines as needed:
  # config.vm.network "forwarded_port", guest: 80, host: 8080
  # config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"
  # config.vm.synced_folder "../data", "/vagrant_data"
  # config.vm.synced_folder ".", "/vagrant", disabled: true

  # Provider-specific configuration
  # config.vm.provider "virtualbox" do |vb|
  #   vb.gui = true
  #   vb.memory = "1024"
  # end

  # Provisioning
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
end
