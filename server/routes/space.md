## All spaces:

```
GET /api/spaces
```
result:
```js
{
    "name": String,
    "isDeleted": Boolean,
    "ownerId": ObjectId,
    "description": String,
    "categories": [ObjectId],
    "homePageId": ObjectId,
    "blogId": ObjectId,
    "pages": [ObjectId],
    "history":[ObjectId],
    "rights": {
        "users": [ObjectId],
        "groups": [ObjectId],
        "anonymous": ObjectId,
    }
}
```
## One space:

```
GET /api/spaces/:id
```

## Create space:

```
POST /api/spaces/
```
Required params
```js
{
    "name": String,
    "ownerId": ObjectId
}
```

## Change space:

```
PUT /api/spaces/:id
```

## Delete space:

```
DELETE /api/spaces/:id
```

