# Backend

Backend Folder for Second Brain Project

## APIs for User Authentication 

- To Signup

Request Type: `POST` 
Request URL: `http://127.0.0.1:3000/signup`
```json
{
    "username":"dhruv",
    "email": "dhruvdabhi101@gmail.com",
    "password": "123456789"
}
```
It will request JsonWebToken. Store it in the Localstorage


- To Login

Request Type: `POST`
Request URL: `http://127.0.0.1:3000/signin`
```json
{
    "username":"dhruv",
    "password": "123456789"
}
```
It will request JsonWebToken. Store it in the Localstorag
