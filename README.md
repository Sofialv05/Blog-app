[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15320196&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

# Blog API Documentation

## Post Endpoints

List of available endpoints:

- `GET /posts`
- `POST /posts`
- `GET /posts/:postId`
- `PUT /posts/:postId`
- `DELETE /posts/:postId`

### 1. GET /posts

Description:
Get all posts from database and return them

Response (_200 - OK_)

```json
[
    {
        "id": "number",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "number",
        "AuthorId": "number",
    }
]
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 2. POST /posts

Description:
Create a post and save it to database

Response (_201 - Created_)

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
    "message": "Validation Error"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### GET /posts/:postId

Description:
Get and return a post data by post's id in database

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
    "message": "Post not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```
