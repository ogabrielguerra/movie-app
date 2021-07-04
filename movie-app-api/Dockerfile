FROM php:7-apache
RUN apt-get update -y && apt-get install -y libpng-dev curl libcurl4-openssl-dev
RUN docker-php-ext-install pdo pdo_mysql gd curl
RUN a2enmod rewrite
COPY uploads.ini /usr/local/etc/php/conf.d
RUN service apache2 restart
RUN chown -R www-data:www-data /var/www
RUN chmod -R 777 /var/www/html/storage
