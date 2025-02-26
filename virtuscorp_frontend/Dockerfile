# 1. Используем официальный образ Node.js
FROM node:18-alpine AS builder

# 2. Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# 3. Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем весь проект внутрь контейнера
COPY . .

# 6. Собираем Next.js приложение
RUN npm run build

# 7. Создаём production-окружение
FROM node:18-alpine

WORKDIR /app

# 8. Копируем собранное приложение из builder
COPY --from=builder /app ./

# 9. Указываем переменную окружения для Next.js
ENV NODE_ENV=production

# 10. Устанавливаем только production-зависимости
RUN npm install --omit=dev

# 11. Открываем порт 3000
EXPOSE 3000

# 12. Запускаем приложение
CMD ["npm", "start"]