scp -P 22 D:\CODE\UNI_APP\self\prod\backend\dist\build\h5.zip ubuntu@119.91.64.45:/home/ubuntu/save

mkdir backend

sudo mv /home/ubuntu/save/h5.zip /home/ubuntu/prod/backend/h5.zip

cd /home/ubuntu/prod/backend

unzip h5.zip

cd /home/ubuntu/prod/backend/h5

scp -P 22 D:\CODE\UNI_APP\self\prod\doc\prod_backend_nginx.conf ubuntu@119.91.64.45:/home/ubuntu/save

sudo mv /home/ubuntu/save/prod_backend_nginx.conf /etc/nginx/conf.d/prod_backend_nginx.conf

cat /etc/nginx/conf.d/prod_backend_nginx.conf

sudo systemctl reload nginx

sudo chown -R www-data:www-data /home/ubuntu/prod/backend/h5

sudo chmod -R 755 /home/ubuntu/prod/backend

sudo chmod 755 /home/ubuntu
