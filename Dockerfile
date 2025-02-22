FROM node:latest

WORKDIR pathfinder/

RUN pwd

COPY . .

RUN ls -la

RUN npm install -f

CMD ["npm", "start"]

EXPOSE 3000