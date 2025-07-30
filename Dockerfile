FROM node:lts-alpine
WORKDIR /app
COPY . .

RUN npm ci
RUN npm run prisma:generate
RUN npm run prisma:dev

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
