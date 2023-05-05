FROM node:14.15.4-slim

USER node

WORKDIR /home/node/app

RUN npm install -g @nestjs/cli@8.2.5 npm@8.5.0

CMD ["sh", "-c", "npm install && tail -f /dev/null"]