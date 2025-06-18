FROM node:18 AS expensetracker
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN ls -la
RUN cat package.json
RUN npm run build

FROM nginx:alpine
COPY --from=expensetracker /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]