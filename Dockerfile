FROM node:latest


WORKDIR /usr/scr/app
COPY package.json ./
RUN npm install
COPY . .


EXPOSE 8000

# RUN npm run dev
CMD ["npm", "run", "dev"]
