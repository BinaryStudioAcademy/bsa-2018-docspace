## All spaces:

```
GET /api/spaces
```
Result:
```js
{
    "_id": ObjectId,
    "name": String,
    "ownerId": ObjectId,
    "description": String,
    "categories": [{
        "_id": ObjectId,
        "name": String
    }]
}
```
## One space:

```
GET /api/spaces/:id
```
Result:
```js
{
    "_id": ObjectId,
    "name": String,
    "key": String,
    "owner": {
        "_id": ObjectId,
        "firstName": String,
        "lastName": String
    },
    "description": String,
    "categories": [{
        "_id": ObjectId,
        "name": String
    }],
    "isDeleted": Boolean,
    "blogId": ObjectId,
    "homePage": ObjectId,
    "pages": [{
        "_id": ObjectId,
        "title": String
    }],
    "history": [ObjectId],
    "rights": {
        "groups": [ObjectId],
        "users": [ObjectId]
    }
}
```

## Create space:

```
POST /api/spaces/
```
Required params:
```js
{
    "name": String,
    "key": String,
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

