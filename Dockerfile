FROM node:18.4.0-alpine3.15
WORKDIR /home/react-express-jwt
COPY ./ ./
RUN npm install && npm run build
CMD ["npm", "start"]