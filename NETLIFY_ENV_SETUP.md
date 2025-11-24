# Настройка переменных окружения в Netlify

## Проблема
При деплое на Netlify возникает ошибка: `The Sanity Project ID is not set. Check your environment variables.`

## Решение

### Шаг 1: Откройте настройки Netlify

1. Войдите в [Netlify Dashboard](https://app.netlify.com)
2. Выберите ваш сайт
3. Перейдите в **Site settings** → **Environment variables**

### Шаг 2: Добавьте следующие переменные

Добавьте следующие переменные окружения:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=b268b188-75fb-4c19-9583-d0b1b4b35bad
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-03-25
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

**Важно:**
- Замените `https://your-site.netlify.app` на реальный URL вашего сайта в Netlify
- `NEXT_PUBLIC_SANITY_PROJECT_ID` должен совпадать с вашим Sanity Project ID
- `NEXT_PUBLIC_SANITY_DATASET` должен совпадать с вашим dataset (обычно `production`)

### Шаг 3: Перезапустите деплой

После добавления переменных:
1. Перейдите в **Deploys**
2. Нажмите **Trigger deploy** → **Deploy site**
3. Или сделайте новый commit и push в репозиторий

### Шаг 4: Проверка

После деплоя проверьте логи сборки - ошибка должна исчезнуть.

## Дополнительные переменные (опционально)

Если используете другие функции, могут понадобиться:

```
SANITY_STUDIO_PROJECT_ID=b268b188-75fb-4c19-9583-d0b1b4b35bad
SANITY_REVALIDATE_SECRET=your-secret-key-here
SANITY_API_WRITE_TOKEN=your-write-token (если используете API для создания постов)
```

## Где найти Sanity Project ID?

1. Откройте [Sanity Manage](https://www.sanity.io/manage)
2. Выберите ваш проект
3. Project ID будет указан в настройках проекта

## Где найти URL сайта в Netlify?

1. В Netlify Dashboard выберите ваш сайт
2. URL будет показан в верхней части страницы (например: `https://your-site-name.netlify.app`)

