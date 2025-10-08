# Запуск проекта
1. Скачайте код проекта на ваш компьютер с помощью команды:
```
git clone https://github.com/ReniX99/GigaControl
```

---
2. Добавьте файл `.env`в корневую папку проекта. Структура файла:
```
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="4321"
POSTGRES_DB="super_secret_db"
```

---
3. Добавьте файл `.env.prod` в папку `backend`. Структура файла (в поле `DATABASE_URL` замените `<POSTGRES_USER>`,
`<POSTGRES_PASSWORD>`, `<POSTGRES_DB>` на соответствующие значения из файла `.env` выше):
```
DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@postgres:5432/<POSTGRES_DB>?schema=public"

JWT_SECRET_KEY="fjsdofj0239fjdsjf2-33u4-sdjf2-34u3-2432fjsdp)"

JWT_ACCESS_TOKEN_TTL="15m"
JWT_REFRESH_TOKEN_TTL="7d"
COOKIE_DOMAIN="localhost"
```

---
4. Перед запуском убедитесь, что на вашем компьютере установлен Docker и Docker Compose. Далее введите команду в корневой папке проекта:
```
docker compose up
```

---
5. Перейдите по URL `http://localhost:5173`
```
Логин: admin@gmail.com
Пароль: 12345678
```
