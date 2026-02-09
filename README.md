# Stellar Burgers

Космическая бургерная — конструктор бургеров с drag-and-drop, личным кабинетом и лентой заказов в реальном времени.

**Deploy:** [https://bdcry.github.io/stellar-stack/](https://bdcry.github.io/stellar-stack/)

---

## О проекте

Stellar Burgers — учебный проект Яндекс Практикума. SPA-приложение, в котором пользователь может:

- Собрать бургер из ингредиентов (drag-and-drop)
- Просмотреть детали ингредиента в модальном окне
- Оформить заказ (с авторизацией)
- Отслеживать ленту заказов в реальном времени (WebSocket)
- Управлять профилем и просматривать историю своих заказов

---

## Стек технологий

| Категория | Технологии |
|-----------|-----------|
| **Язык** | TypeScript |
| **UI** | React 19 |
| **Роутинг** | React Router v7 |
| **Стейт** | Redux Toolkit |
| **Реалтайм** | WebSocket (middleware) |
| **DnD** | react-dnd (HTML5 Backend) |
| **Сборка** | Vite |
| **Стили** | CSS Modules |
| **Тесты** | Vitest (unit), Cypress (e2e) |
| **Линтинг** | ESLint, Stylelint, Prettier |
| **CI** | Husky + lint-staged |
| **Деплой** | GitHub Pages |

---

## Структура проекта

```
src/
├── components/          # UI-компоненты
│   ├── app/             # Корневой компонент + роутинг
│   ├── app-header/      # Хедер с навигацией
│   ├── burger-constructor/  # Конструктор бургера (DnD)
│   ├── burger-ingredients/  # Список ингредиентов
│   ├── ingredient-details/  # Детали ингредиента (модалка)
│   ├── modal/           # Универсальная модалка (portal)
│   ├── order-details/   # Детали заказа (модалка)
│   ├── order-info/      # Информация о заказе
│   ├── orders-feed/     # Лента заказов
│   ├── order-stats/     # Статистика заказов
│   └── protected-route/ # Защищённые маршруты
├── pages/               # Страницы (home, login, register, feed, profile, ...)
├── services/            # Redux
│   ├── store.ts         # Конфигурация стора
│   ├── slices/          # Слайсы (auth, constructor, ingredients, order, feed, ...)
│   ├── middleware/       # WebSocket middleware
│   └── ws-actions/      # Action creators для WS
├── shared/hooks/        # Кастомные хуки
└── utils/               # API, типы, утилиты
```

---

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка в `dist/` |
| `npm run deploy` | Деплой на GitHub Pages |
| `npm run test` | Unit-тесты (Vitest) |
| `npm run cypress` | E2E-тесты headless |
| `npm run cypress:open` | E2E-тесты с GUI |
| `npm run lint` | Все линтеры |
| `npm run commit` | Коммит по Conventional Commits |

---

## Тестирование

### Unit-тесты (Vitest)

Покрыты все Redux-слайсы:
- `auth-slice` — авторизация (checkAuth, login, register, updateUser, logout)
- `constructor-slice` — конструктор бургера (setBun, addFilling, removeFilling, moveFilling)
- `ingredients-slice` — загрузка ингредиентов (async thunk)
- `order-slice` — создание заказа (async thunk)
- `currentIngredient-slice` — текущий ингредиент
- `feed-slice` — лента заказов (WebSocket)
- `profile-feed-slice` — заказы пользователя (WebSocket)

### E2E-тесты (Cypress)

- Открытие/закрытие модалки ингредиента (крестик + overlay)
- Drag-and-drop ингредиентов в конструктор
- Создание заказа с проверкой номера

---

## Алиасы путей

```ts
'@'           → './src'
'@components' → './src/components'
'@pages'      → './src/pages'
'@utils'      → './src/utils'
```
