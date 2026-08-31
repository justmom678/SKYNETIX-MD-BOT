FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
