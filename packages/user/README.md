# User Package - Authentication

Ez a csomag teljes körű Bearer token alapú authentikációt biztosít a frontend alkalmazáshoz.

## Funkciók

- ✅ Login (POST /api/auth/login)
- ✅ Logout (POST /api/auth/logout)
- ✅ Get Current User (GET /api/auth/me)
- ✅ Token kezelés (localStorage)
- ✅ Route guards (védett route-ok)
- ✅ Auto redirect ha nincs authentikáció
- ✅ Axios interceptors (automatikus Bearer token)

## Fájlok

### Services

**`services/authService.ts`**
- Login, logout, me végpontok
- Token tárolás/törlés
- Axios instance Bearer token-nal

**`services/userService.ts`**
- Admin user CRUD műveletek
- Bearer token authentikáció

### Views

**`views/Login.vue`**
- Login form
- Validációs hibák megjelenítése
- Automatikus redirect dashboard-ra

**`views/Profile.vue`**
- Bejelentkezett user adatai
- User groups megjelenítése
- Logout funkció

### Composables

**`src/composables/useAuth.ts`**
- Vue composable az auth state kezeléséhez
- Login, logout, fetchUser metódusok
- Reaktív user és isAuthenticated state

### Router

**`router/index.ts`**
- Login route (guest only)
- Protected routes (requiresAuth: true)
- Auth guards

**`src/router/guards.ts`**
- authGuard: védett route-ok ellenőrzése
- guestGuard: csak nem bejelentkezett usereknek

## Használat

### Login

```typescript
import { useAuth } from '@/composables/useAuth'

const { login, user, isAuthenticated } = useAuth()

// Login
await login('user@example.com', 'password')

// Check if authenticated
if (isAuthenticated.value) {
  console.log('User:', user.value)
}
```

### Logout

```typescript
const { logout } = useAuth()

await logout()
// Automatikusan törli a tokent és redirectel a login oldalra
```

### Protected Routes

```typescript
// router/index.ts
{
  path: '/admin',
  component: AdminLayout,
  meta: { requiresAuth: true } // Csak bejelentkezett userek érhetik el
}
```

### API hívások

A `userService` és `authService` automatikusan hozzáadja a Bearer tokent minden kéréshez:

```typescript
import { userService } from '@user/services/userService'

// Automatikusan hozzáadja: Authorization: Bearer {token}
const users = await userService.getAll()
```

### Manuális token használat

```typescript
import { authService } from '@user/services/authService'

const token = authService.getToken()
const user = authService.getStoredUser()
const isAuth = authService.isAuthenticated()
```

## API válaszok

### Login Success (200)
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "email_verified": true,
    "user_groups": []
  },
  "token": "1|AbCdEfGhIj...",
  "token_type": "Bearer"
}
```

### Login Error (422)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["These credentials do not match our records."]
  }
}
```

### Me Success (200)
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "email_verified": true,
    "user_groups": [...]
  }
}
```

## Automatikus funkciók

### 401 Unauthorized kezelés

Ha bármely API hívás 401-et ad vissza:
1. A token automatikusan törlődik
2. User kijelentkezik
3. Redirect login oldalra

```typescript
// Axios interceptor - authService.ts
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### Token auto-include

Minden API hívás automatikusan tartalmazza a Bearer tokent:

```typescript
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## Környezeti változók

A server URL a `.env` fájlban állítható be:

```env
VITE_SERVER_URL=http://127.0.0.1:8000
```

## Route védelem

```typescript
// Védett route
{
  path: '/users',
  component: UserIndex,
  meta: { requiresAuth: true }
}

// Guest only (pl. login)
{
  path: '/login',
  component: Login,
  meta: { guestOnly: true }
}
```

## Példa használat

```typescript
// 1. Bejelentkezés
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()
await login('user@example.com', 'password')
// → Redirect to /dashboard

// 2. User adatok lekérése
const { user, fetchUser } = useAuth()
await fetchUser()
console.log(user.value)

// 3. Kijelentkezés
const { logout } = useAuth()
await logout()
// → Redirect to /login

// 4. API hívások
import { userService } from '@user/services/userService'
const users = await userService.getAll() // Bearer token auto-added
```

## Komponensek

### Login Component

Használat a template-ben:
```vue
<template>
  <Login />
</template>

<script setup>
import Login from '@user/views/Login.vue'
</script>
```

### Profile Component

```vue
<template>
  <Profile />
</template>

<script setup>
import Profile from '@user/views/Profile.vue'
</script>
```

## Biztonság

- ✅ Bearer token localStorage-ban
- ✅ HTTPS ajánlott production-ben
- ✅ Token auto-refresh nincs implementálva (minden login új tokent generál)
- ✅ XSS védelem: ne injectálj user inputot innerHTML-be
- ✅ CORS: backend-en be kell állítani

## Troubleshooting

### Token nem adódik hozzá a requesthez
- Ellenőrizd, hogy a token localStorage-ban van-e: `localStorage.getItem('auth_token')`
- Nézd meg a Network tab-ot a DevTools-ban

### 401 Unauthorized error
- Token lejárt vagy érvénytelen
- User nincs bejelentkezve
- Backend sanctum config probléma

### CORS error
- Backend `config/cors.php` beállítások
- `supports_credentials: true` kell
