# 📘 Documentação da API

[⬇️ Baixar Collection Postman](./api-financeira.postman_collection.json)

## `POST /auth/login`

- **Operation ID**: `AuthController_login`
- **Parâmetros de rota/query:** nenhum
- **Body (JSON):**
  - `email`: `string` (ex: `user@example.com`)
  - `password`: `string` (ex: `123456`)
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `POST /auth/register`

- **Operation ID**: `AuthController_register`
- **Parâmetros de rota/query:** nenhum
- **Body (JSON):**
  - `email`: `string` (ex: `user@example.com`)
  - `password`: `string` (ex: `123456`)
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `POST /categories`

- **Operation ID**: `CategoriesController_create`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:** nenhum
- **Body (JSON):**
  - `name`: `string` (ex: `Luz`)
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `GET /categories`

- **Operation ID**: `CategoriesController_findAll`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:** nenhum
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `GET /categories/{id}`

- **Operation ID**: `CategoriesController_findOne`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `PUT /categories/{id}`

- **Operation ID**: `CategoriesController_update`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body (JSON):**
  - `name`: `string` (ex: `Luz`)
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `DELETE /categories/{id}`

- **Operation ID**: `CategoriesController_remove`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `POST /transactions`

- **Operation ID**: `TransactionsController_create`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:** nenhum
- **Body (JSON):**
  - `type`: `string`
  - `date`: `string` (ex: `2025-12-31T20:59:59-03:00`)
  - `amount`: `number` (ex: `100.15`)
  - `categoryId`: `number` (ex: `1`)
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `GET /transactions`

- **Operation ID**: `TransactionsController_findAll`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:** nenhum
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `GET /transactions/getTotalBalance`

- **Operation ID**: `TransactionsController_getTotalBalance`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:** nenhum
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `GET /transactions/{id}`

- **Operation ID**: `TransactionsController_findOne`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `PUT /transactions/{id}`

- **Operation ID**: `TransactionsController_update`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body (JSON):**
  - `type`: `string`
  - `date`: `string` (ex: `2025-12-31T20:59:59-03:00`)
  - `amount`: `number` (ex: `100.15`)
  - `categoryId`: `number` (ex: `1`)
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `DELETE /transactions/{id}`

- **Operation ID**: `TransactionsController_remove`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `GET /transactions/{id}/attachments`

- **Operation ID**: `TransactionsController_findAllAttachments`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---

## `PUT /transactions/{id}/attachments`

- **Operation ID**: `TransactionsController_uploadAttachments`
- **Auth**: Requer header `Authorization: Bearer <token>`
- **Parâmetros de rota/query:**
  - `id` (path): `number`
- **Body:** nenhum
- **Response 200/201:**

```json
{
  "statusCode": 200,
  "data": {}
}
```

---
