# PC Worth Fullstack Developer Assessment

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- pnpm
- MySQL

## Getting Started

### Backend

```bash
cd server
composer install
cp .env.example .env
php artisan key:generate
```

Update the database credentials in `backend/.env`, then run:

```bash
php artisan migrate
php artisan passport:client --personal
php artisan serve
```

The API will be available at `http://localhost:8000`.

### Frontend

```bash
cd client
pnpm install
pnpm dev
```

The app will be available at `http://localhost:5173`.

## Testing the API

1. Open Postman and connect your workspace to the repo
2. Postman will detect the `postman/Product Manager API/` collection automatically
3. Run **Register** or **Login** request to save the bearer token to `{{token}}` automatically
4. All protected requests will use the saved token from there
