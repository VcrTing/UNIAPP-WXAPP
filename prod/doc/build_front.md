scp -P 22 D:\CODE\UNI_APP\self\prod\front\dist\build\h5.zip ubuntu@119.91.64.45:/home/ubuntu/save

cd /home/ubuntu/prod 

mkdir front

sudo mv /home/ubuntu/save/h5.zip /home/ubuntu/prod/front/h5.zip

cd /home/ubuntu/prod/front

unzip h5.zip

cd /home/ubuntu/prod/front/h5

scp -P 22 D:\CODE\UNI_APP\self\prod\doc\prod_front_nginx.conf ubuntu@119.91.64.45:/home/ubuntu/save

sudo mv /home/ubuntu/save/prod_front_nginx.conf /etc/nginx/conf.d/prod_front_nginx.conf

cat /etc/nginx/conf.d/prod_front_nginx.conf

sudo systemctl reload nginx

sudo chown -R www-data:www-data /home/ubuntu/prod/front/h5

sudo chmod -R 755 /home/ubuntu/prod/front

sudo chmod 755 /home/ubuntu
