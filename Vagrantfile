Vagrant.configure(2) do |config|
  config.vm.box = 'debian/stretch64'
  config.vm.network 'private_network', ip: '10.10.10.10'
  config.vm.provider 'virtualbox' do |vb|
    vb.memory = '2048'
  end
  config.vm.provision 'ansible' do |ansible|
    ansible.playbook = 'vagrant-setup.yml'
    ansible.inventory_path = '.vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory'
    ansible.verbose = '-v'
  end
end
