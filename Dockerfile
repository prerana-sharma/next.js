FROM 721923618792.dkr.ecr.ap-southeast-2.amazonaws.com/node:16.15.1-alpine AS portal_builder

WORKDIR /webapp
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]

