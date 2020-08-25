# ShoppList

A simple app to track the products you need to buy.

## Technologies used:

- React
- MongoDB
- Express

## Usage

Install dependencies

> `npm install`

### MongoDB Setup

Create your /config/default.json file to include the correct MongoDB URI and JWT secret key.

### Run Server and Client

`npm run dev`

# ShopList API

## Register User:

- Request: Add New user

  - Headers:

    > `Content-type: application/json`

  - Body:
    > `{ "name": "", "email": "", "password": "" }`

- Response:
  - Body:
    > `{ "token": "" }`

## Login User:

- Request: Login with credentials to receive JWT token

  - Headers:

    > `Content-type: application/json`

  - Body:
    > `{ "email": "", "password": "" }`

- Response:
  - Body:
    > `{ "token": "" }`

## Add new Shopping item:

- Request: Add new Item to shopping list

  - Headers:

    > `Content-type: application/json`  
    > `x-auth-token: ""`

  - Body:
    > `{ "item": "","quantity": "", "type": "" }`

- Response:
  - Body:
    > `{ "item": {} }`

## Update Item

- Request: Update existing Item

  - ID Parameter:

    > `id: (number) - Id of the personal item you wish to update`

  - Headers:

    > `Content-type: application/json`  
    > `x-auth-token: ""`

  - Body:
    > `{ "item": "","quantity": "", "type": "" }`

- Response:
  - Body:
    > `{ "item": {} }`

## Delete Item

- Request: Delete existing Item

  - ID Parameter:

    > `id: (number) - Id of the personal item you wish to remove`

  - Headers:
    > `x-auth-token: ""`

- Response:
  - Body:
    > `{ "msg": "Item Deleted" }`

# Website ScreenShot

![ShoppingList](https://github.com/NejcPivec/ShoppList/blob/master/images/shoppList.png)

# Online Website

[ShoppList](https://sleepy-reef-18567.herokuapp.com/register)
