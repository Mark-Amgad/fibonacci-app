FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.* ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]