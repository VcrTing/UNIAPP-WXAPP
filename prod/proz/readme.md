### 文件传输
scp -P 22 D:\CODE\UNI_APP\self\prod\proz\target\buy-1.0-SNAPSHOT.jar ubuntu@119.91.64.45:/home/ubuntu/save

sudo nano /etc/systemd/system/prod-java.service

scp -P 22 D:\CODE\UNI_APP\self\prod\proz\doc\prod-java.service ubuntu@119.91.64.45:/home/ubuntu/save

sudo systemctl daemon-reload

sudo systemctl start prod-java

sudo systemctl enable prod-java

nohup java -jar /home/ubuntu/prod/buy-1.0-SNAPSHOT.jar > /dev/null 2>&1 &

curl http://localhost:8889
sudo netstat -tulnp | grep 8889

scp -P 22 D:\CODE\UNI_APP\self\prod\proz\doc\prod_java_nginx.conf ubuntu@119.91.64.45:/home/ubuntu/save

mv /home/ubuntu/save/prod_java_nginx.conf /etc/nginx/sites-available