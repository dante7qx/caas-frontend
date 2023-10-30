FROM nginx:1.23.0

LABEL MAINTAINER="dante <dantefreedom@gmail.com>"

WORKDIR /usr/share/nginx/html

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && rm -rf *

COPY dist/* ./
