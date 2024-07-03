FROM node:22

WORKDIR /tanktics

COPY ./package.json /tanktics/
COPY ./package-lock.json /tanktics/

RUN npm i -g vite
RUN npm install

COPY ./index.html ./vite.config.ts ./src ./public /tanktics/

EXPOSE 5173

CMD ["vite"]
