FROM duongth10/nginx-spa:latest

WORKDIR /usr/share/nginx/html


RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/ ./
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]