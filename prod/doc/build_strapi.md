D:\CODE\UNI_APP\self\prod\prod

scp -P 22 D:\CODE\UNI_APP\self\prod\prod\dist.zip ubuntu@119.91.64.45:/home/ubuntu/save

cd /home/ubuntu/save

cd /home/ubuntu/prod

mkdir strapi

sudo mv /home/ubuntu/save/dist.zip /home/ubuntu/prod/strapi/dist.zip

cd /home/ubuntu/prod/strapi

unzip dist.zip

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt-get install -y nodejs

node -v

sudo npm install -g yarn

sudo npm install -g pm2