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

## Areas
- Create Area
POST url: `http://localhost:3000/api/area`
```json
{
    "title": "College",
    "description": "Finanace area for saving my finanace things"
}
```

- Update Area
PUT url: `http://localhost:3000/api/area/6507ef103024377de7457a1f`
```json
{
    "title": "NEw Life"
}
```

- Delete Area
DELETE url : `http://localhost:3000/api/area/6507ef103024377de7457a1f`
```json
{
    "uid": "6507eeb53024377de7457a1b"
}
```
- Get Area
GET url: `http://localhost:3000/api/area/`
