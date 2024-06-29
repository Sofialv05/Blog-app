[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15320196&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

# Architecture Blog API Documentation

## User Endpoints

List of available endpoints:

- `POST /add-user`
- `POST /login`

### 1. POST /add-user

Description:
In order to use this feature, login is required beforehand. Only users with the Admin role can register staff members.

Request:

- headers:

```json
{
    "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
    "username": "string",
    "email": "string",
    "passsword": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

Response (_201 - Created_)

```json
{
    "id": "number",
    "email": "string"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Please provide a valid email address"
}

OR

{
    "message": "This email is already in use"
}

OR

{
    "message": "email is required"
}

OR

{
    "message": "password is required"
}

OR

{
    "message": "Password must be at least 5 characters"
}
```

Response (_401 - Unaouthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_403 - Forbidden_)

```json
{
    "message": "Unauthorized"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 2. POST /login

Description:
The login feature allows access to registered users with the role staff or admin. Users with the staff or admin role can need to login first in order to access some features like create, edit, and delete posts.

- body:

```json
{
    "email": "string",
    "passsword": "string"
}
```

Response (_200 - OK_)

```json
{
    "access_token": "string"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Email is required"
}

OR

{
    "message": "Password is required"
}

```

Response (_401 - Unauthorized_)

```json
{
    "message": "Email has not been registered"
}

OR

{
    "message": "Invalid password"
}

```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

&nbsp;

## Post Endpoints

List of available endpoints:

- `GET /posts`
- `POST /posts`
- `GET /posts/:postId`
- `PUT /posts/:postId`
- `PATCH /posts/:postId/img`
- `DELETE /posts/:postId`

### 1. GET /posts

Description:
Get all posts from database with the author's data. Login is required to access this endpoint.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (_200 - OK_)

```json
[
    {
        "id": "number",
        "email": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "number",
        "Author": {
            "id": "number",
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
    }
]
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 2. POST /posts

Description:
Create a post and save it to database. Login is required to access this endpoint.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "number"
}
```

Response (_201 - Created_)

```json
{
    "id": "number",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "number",
    "AuthorId": "number",
    "createdAt": "date",
    "updatedAt": "date",
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Title is required"
}

OR

{
    "message": "Content is required"
}

OR

{
    "message": "Category is required"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 3. GET /posts/:postId

Description:
Get and return a post data by post's id in database. Login is required to access this endpoint.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (_200 - OK_)

```json
{
    "id": "number",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "number",
    "AuthorId": "number"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Post not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 4. PUT /posts/:postId

Description:
Update one post that already exists in database. Login is required to access this endpoint. Staff user has no permission on updating other staff user's post.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "number"
}
```

Response (_200 - OK_)

```json
{
    "id": "number",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "number",
    "AuthorId": "number"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Title is required"
}

OR

{
    "message": "Content is required"
}

OR

{
    "message": "Category is required"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_403 - Forbidden_)

```json
{
    "message": "Unauthorized"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Post not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 5. PATCH /posts/:postId/img

Description:
Only update image in one post that already exists in database. Login is required to access this endpoint. Staff user has no permission on updating other staff user's post.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
    "imgUrl": "string"
}
```

Response (_200 - OK_)

```json
{
    "id": "number",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "number",
    "AuthorId": "number"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_403 - Forbidden_)

```json
{
    "message": "Unauthorized"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Post not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 6. DELETE /posts/:postId

Description:
Delete one post that already exist in database. Login is required to access this endpoint. Staff user has no permission on deleting other staff user's post.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (_200 - OK_)

```json
{
"message": "Success deleting post with id <post_id>"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_403 - Forbidden_)

```json
{
    "message": "Unauthorized"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Post not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

## Category Endpoints

List of available endpoints:

- `GET /categories`
- `POST /categories`
- `PUT /categories/:categoryId`

### 1. GET /categories

Description:
Show all available categories. Login is required to access this endpoint.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (_200 - OK_)

```json
[
    {
        "id": "number",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 2. POST /categories

Description:
Create a new category name. Login is required to access this endpoint.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
    "name": "string"
}
```

Response (_201 - Created_)

```json
{
    "id": "number",
    "name": "string"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Category name is required"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 3. PUT /categories/:categoryId

Description:
Update a category name that already exists in database. Login is required to access this endpoint.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
    "name": "string"
}
```

Response (_200 - OK_)

```json
{
    "id": "number",
    "name": "string"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Category name is required"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Unauthenticated"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Category not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

## Public Endpoints

List of available endpoints:

- `GET /pub/posts`
- `GET /pub/posts/:postId`

### 1. GET /pub/posts

description:
Get all posts data for public.

Response (_200 - OK_)

```json
{
    "page": "number",
    "data": [
                {
                    "id": "number",
                    "title": "string",
                    "content": "text",
                    "imgUrl": "string",
                    "CategoryId": "number",
                    "AuthorId": "number"
             }
        ],
    "totalData":"number",
    "totalPage": "number",
    "dataPerPage": "number"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 2. GET /pub/posts/:postId

description:
Get one post data for public.

Response (_200 - OK_)

```json
{
    "id": "number",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "number",
    "AuthorId": "number"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Category not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```
