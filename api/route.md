# Route

## General

All routes are located in the directory `/src/routes/` and are loaded on start by a the [lambert-server](https://www.npmjs.com/package/lambert-server) package.

The HTTP API path is generated automatically based on the folder structure, so it is important that you name your files accordingly.

If you want to use URL Params like `:id` in e.g. `/users/:id` you need to use `#` instead of `:` for the folder/filename, because of file naming issues on windows.

`index.ts` files **won't** serve `/api/index` and instead alias the parent folder e.g. `/api/`

Your file needs to default export a [express.Router\(\)](https://expressjs.com/de/4x/api.html#router):

```typescript
import { Router } from express
const router = Router();
export default router;
```

Now you can just use any regular express function on the router variable e.g:

```typescript
router.get("/", (req, res) => {});
router.post("/", (req, res) => {});
router.get("/members", (req, res) => {});
```

## Authentication

Every request must contain the authorization header except the `/login` and `/register` route.

To access the user id for the token of the request use `req.user_id`

## Body Validation

We use a custom body validation logic from lambert-server to check if the JSON body is valid.

To import the function from `/src/util/instanceOf.ts` use:

```typescript
import { check } from "/src/util/instanceOf";
```

Now you can use the [middleware](http://expressjs.com/en/guide/using-middleware.html) `check` for your routes by calling check with your Body Schema.

```typescript
router.post("/", check(...), (req,res) => {});
```

### Schema

A Schema is a Object Structure with key-value objects that checks if the supplied body is an instance of the specified class.

```typescript
{ id: String, roles: [String] }
```

_Notice if you use e.g. BigInt even if you can't supply it with JSON, it will automatically convert the supplied JSON number/string to a BigInt._

_Also if you want to check for an array of, just put the type inside `[]`_

#### Optional Parameter

You can specify optional parameters if you prefix the key with a `$` \(dollar sign\) e.g.: `{ $captcha: String }`, this will make the captcha property in the body optional.

#### Limit String length

Additionally import the class `Length` from instanceOf and specify the type by making a new `Length` Object taking following parameters:

```typescript
import { Length } from "/src/util/instanceOf";
const min = 2;
const max = 32;
const type = String;

{ username: new Length(min: number, max: number, type) }
```

this will limit the maximum string length to the `min` and `max` value.

### Example:

```typescript
import { check, Length } from "/src/util/instanceOf";
const SCHEMA = { username: new Length(2, 32, String), age: Number, $posts: [{ title: String }] }
app.post("/", check(SCHEMA), (req, res) => {});
```

## Throw Errors

If the body validation fails it will automatically throw an error.

The `errors` structure is a key-value Object describing what field contained the error:

```javascript
{
    "code": 50035,
    "message": "Invalid Form Body",
    "errors": {
        "email": {
            "_errors": [
                {
                    "message": "Email is already registered",
                    "code": "EMAIL_ALREADY_REGISTERED"
                }
            ]
        },
        "username": {
            "_errors": [
                {
                    "message": "Must be between 2 - 32 in length",
                    "code": "BASE_TYPE_BAD_LENGTH"
                }
            ]
        }
    }
}
```

To manually throw a `FieldError` import `FieldErrors`

```typescript
import { FieldErrors } from /src/util/instanceOf
```

To make sure your errors are understood in all languages translate it with [i18next](https://www.i18next.com/translation-function/essentials) and `req.t`

So after you have checked the field is invalid throw the `FieldErrors`

```typescript
throw FieldErrors(( login: { message: req.t("auth:login.INVALID_LOGIN"), code: "INVALID_LOGIN" }});
```

