FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

<<<<<<< HEAD

CMD ["npm", "start"]
=======
CMD ["sh", "-c", "npx prisma generate && npm start"]
>>>>>>> feature/auth-fix
