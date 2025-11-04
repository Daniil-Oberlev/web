# Backend для онлайн-магазина "СТОЛПЛИТ"

## Настройка

### 1. Установка зависимостей

```bash
pnpm install
```

### 2. Настройка базы данных

Создайте файл `.env` в корне папки `backend` со следующим содержимым:

```env
DATABASE_URL="mongodb://localhost:27017/stolplit?retryWrites=true&w=majority"
```

Для MongoDB Atlas используйте формат:
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/stolplit?retryWrites=true&w=majority"
```

**Важно для MongoDB Atlas:**
1. **Network Access** — добавьте ваш IP-адрес в MongoDB Atlas:
   - Зайдите в MongoDB Atlas → Network Access
   - Нажмите "Add IP Address"
   - Добавьте ваш текущий IP или используйте `0.0.0.0/0` для всех IP (только для разработки!)
   - Сохраните изменения
2. Проверьте, что используете правильные username и password
3. Убедитесь, что строка подключения содержит правильное имя кластера и имя базы данных
4. Если используете MongoDB Atlas, убедитесь, что включен SSL/TLS (по умолчанию включен)

**Устранение проблем с подключением:**
- Если получаете ошибку "Server selection timeout" или "fatal alert: InternalError":
  - **Проверьте Network Access в MongoDB Atlas** — это самая частая причина проблемы
  - Проверьте правильность строки подключения (должна содержать имя базы данных)
  - Попробуйте использовать полную строку подключения из MongoDB Atlas (кнопка "Connect" в интерфейсе)

- Если получаете ошибку "Transactions are not supported":
  - Это нормально для MongoDB Free Tier — транзакции не поддерживаются
  - Seed скрипт уже настроен для работы без транзакций
  - Если ошибка все еще появляется, проверьте подключение к базе данных

### 3. Генерация Prisma Client

После создания `.env` файла с DATABASE_URL:

```bash
pnpm prisma generate
```

### 4. Заполнение базы данных (seed)

```bash
pnpm prisma:seed
```

Это заполнит базу данных начальными данными о категориях и товарах.

### 5. Запуск сервера

Режим разработки:
```bash
pnpm dev
```

Продакшн режим:
```bash
pnpm start
```

Сервер будет доступен на `http://localhost:3000`

## API Endpoints

- `GET /api/categories` - Получить все категории с товарами
- `GET /api/products` - Получить все товары
- `GET /api/categories/:id` - Получить категорию по ID (MongoDB ObjectId)
- `GET /api/products/:id` - Получить товар по ID (MongoDB ObjectId)

## Дополнительные команды

- `pnpm prisma:studio` - Открыть Prisma Studio для просмотра данных в БД
- `pnpm prisma:generate` - Регенерировать Prisma Client
