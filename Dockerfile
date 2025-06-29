# Dockerfile para el backend (NestJS)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build && ls -l dist

FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY .env ./
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
