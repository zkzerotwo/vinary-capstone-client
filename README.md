# Vinary Curated Experiences
Search recipes and curate beverage pairings to share with users



### 1. Working Prototype (to do later)
(Example) You can access a working prototype of the React app here: https://your-app-client.herokuapp.com/ and Node app here: https://your-app-server.herokuapp.com/



### 2. User Stories
This app is for two types of users: a visitor and a logged-in user

###### Landing Page (Importance - High) (Est: 1h)
* as a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it

###### Login Page (Importance - High) (Est: 3h)
* As a returning register user
* I want to enter my password and username to use this app,
* So I can have access to my account.

###### Sign Up (Importance - High)  (Est: 3h)
* As a visitor
* I want to register to use this app
* So I can create a personal account to view my Vinary Pairs

######  Home Page (Importance - High)  (Est: 2h)
* As a visitor
* I want to register to use this app
* So I can create a personal account to view my Vinary Pairs

######  Home Page (Importance - High)  (Est: 2h)

* As a visitor
* I want to search by keyword or dish name 
* so I can view dishes I might want to pair

######  Home Page (Importance - High)  (Est: 2h)

* As a visitor
* I want to sign up to save recipes and wine pairings
* so I can view my saved pairs later

######  Home Page (Importance - High)  (Est: 1h)

* As a logged-in user,
* I want to be able to preview the content of the app,
* So i can decide what section I want to navigate to.

######  Home Page (Importance - High)  (Est: 2h)

* As a logged-in user,
* I want to be able to search other users pairings
* So i can gain inspiration for their own pairings

######  Random Page (Importance - High)  (Est: 2h)

* As a visitor
* I want to find three random Vinary Pairs
* so I can see what pairings other users have created

###### Edit Page (Importance - High)  (Est: 2h)

* As a logged-in user,
* I want to be able to see all my Vinary Pairs
* So i can choose which one I want to edit

###### Edit Page (Importance - High)  (Est: 2h)

* As a logged-in user,
* I want to be able to return to and edit my Vinary Pairs
* So i can change and update them as my taste evolves



### 3. Functionality
The app's functionality includes:
* Every User has the ability to create an account
* Every User has the ability to search myAnimeList API
* Every User has the ability to save and name their list 
* Every User has the ability to search other users public lists
* Every User has the ability to save private lists
* Every User has the ability to search by genre, keyword, voice actor, character, airing, and user
* Every User has the ability to click a link to watch their show



### 4. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver



### 5. Wireframes
Landing Page
:-------------------------:
![Landing Page](/github-images/wireframes/landing.png)
Register Page
:-------------------------:
![Register Page](/github-images/wireframes/register.png)
Dashboard Page
:-------------------------:
![Dashboard Page](/github-images/wireframes/dashboard.png)
Search Results Page
:-------------------------:
![Search Results Page](/github-images/wireframes/search-results.png)



### 6. Front-end Structure - React Components Map 
* __Index.js__ (stateless)
    * __App.js__ (stateful)
        * __LandingPage.js__ (stateless)
            * __Navbar.js__ (stateless) 
            * __SearchBar.js__ (stateful)
                * __ResultBar.js__ (stateful) - receives props from __Searchbar.js__
                    * __DetailTrigger__ (stateful) - receives props from __ResultBar__
                    * __ExtendFlight__
         * __Login.js__ (stateful) -
        * __Register.js__ (stateful) -
        * __Dashboard__ (stateful)
            * __Navbar.js__ (stateless) 
            * __NewFlight__ (stateful)
            * __Flight__ (stateful) - receives props from __Dashboard__
                * __Pairs__ (stateful) - receives props from __Flight__
                     * __DetailTrigger__ (stateful) - receives props from __Flight__




### 7. Back-end Structure - Business Objects
*  Users (database table)
    * id (auto-generated)
    * user_name (email validation)
    * password (at least 8 chars, at least one alpha and a special character validation)
*  Flights (database table)
    * id (auto-generated)
    * flight_owner (foreign key to users list)
    * title (varchar 255 not null)
    * description (varchar 255 not null)
    * is_public (integer not null default 0)
* Pairs (database table)
    * id (auto-generated) 
    * flight_id (foreign key to flights list)
    * recipe_id (integer not null)
    * recipe_title (varchar 255 not null) (api)
    * recipe_image_url (varchar 255 not null) (api)
    * recipe_description (varchar 255 not null) (api)
    * servings (integer not null default 0) (api)
    * beverage_title (varchar 255 not null) (api)
    * beverage_description (varchar 255 not null) (api)
    * url (varchar 255 not null) (api)


### 8. API Documentation
#### API Overview
```text
    /api
    .
    ├── /auth
    │   └── POST
    │       ├── /login
    ├── /users
    │   └── POST
    │       └── /
    |   └── GET
            └── /:user_id
    |    └── DELETE
            └── /:user_id
    ├── /flights
    │   └── GET
            ├── /
    │       ├── /:flight_id
        └── POST
    │       ├── /
        └── DELETE
    │       ├── /:flight_id
        └── PATCH
    │       ├── /:flight_id
    ├── /pairs
    │   └── GET
            ├── /
    │       ├── /:pair_id
        └── POST
    │       ├── /
        └── DELETE
    │       ├── /:pair_id
        └── PATCH
    │       ├── /:pair_id
```

##### POST `/api/auth/login`
```js
    // req.body
    {
        "user_name": "demo@gmail.com",
        "password": "Password1"
    }

    // res.body
    {
    "authToken": String,
        "userId": 1
    }
```

##### POST `/api/users/`
```js
    // req.body
    {
        "user_name": "demo@gmail.com",
        "password": "123456"
    }


    // res.body
    {
        "id": 1,
        "user_name": "demo@gmail.com"
    }
```
##### GET `/api/users`
```js
    // req.body
    {
      "id": 2,
      "user_name": 'peregrin.took@shire.com',
      "password": 'secret'
    }
```

##### GET `/api/flights`
```js
    // req.body
    {
     "id": 1,
    "title": "Spicy",
    "description": "How food with even spicier wine",
    "flight_owner": 2,
    "is_public": 0
    }
```

##### GET `/api/flights/:flight_id`
```js
    // req.body
    {
        "id": 1,
    "title": "Spicy",
    "description": "How food with even spicier wine",
    "flight_owner": 2,
    "is_public": 0
    }
```

##### POST `/api/flights`
```js
    // req.body
    {
    "title": "Spicy",
    "description": "How food with even spicier wine",
    "flight_owner": 2,
    "is_public": 0
    }
```

##### PATCH `/api/flights/:flight_id`
```js
    // req.body
    {
    "id": 1,
    "title": "Spicy",
    "description": "How food with even spicier wine",
    "flight_owner": 2,
    "is_public": 0
    }
```

##### DELETE `/api/flights/:flight_id`
```js
    // req.body
    {
     "id": 1
    }
```

##### GET `/api/pairs`
```js
    // req.body
    {
     "id": 1,
    "mal_id": 6969,
    "pair_description": "A lovely advnture of two lovers star crossed through time.",
    "flight_id": 1,
    "pair_type": "manga",
    "pair_name": "Naruto 2: Electric Boogaloo",
    "url": "https://myanimelist.net/manga/42/Dragon_Ball",
    "image_url": "https://cdn.myanimelist.net/images/manga/2/54545.jpg"
    }
```

##### GET `/api/pairs/:pair_id`
```js
    // req.body
    {
     "id": 1,
    "flight_id": 7,
    "recipe_id": 492564,
     "recipe_title": "Falafel Burgers with Feta Cucumber Sauce",
    "recipe_image_url": "https://spoonacular.com/recipeImages/falafel-burgers-with-feta-tzatziki-sauce-492564.jpg",
    "servings": 6,
    "beverage_title": "Milkshake",
    "beverage_description": "f",
    "url": "https://www.cinnamonspiceandeverythingnice.com/falafel-burgers-with-feta-tzatziki-sauce/"
    }
```

##### POST `/api/pairs`
```js
    // req.body
    {
    "flight_id": 7,
    "recipe_id": 492564,
    "recipe_title": "Falafel Burgers with Feta Cucumber Sauce",
    "recipe_image_url": "https://spoonacular.com/recipeImages/falafel-burgers-with-feta-tzatziki-sauce-492564.jpg",
     "servings": 6,
    "beverage_title": "Milkshake",
    "beverage_description": "f",
    "url": "https://www.cinnamonspiceandeverythingnice.com/falafel-burgers-with-feta-tzatziki-sauce/"
    }
```

##### PATCH `/api/pairs/:pair_id`
```js
    // req.body
    {
     "id": 1,
    "flight_id": 7,
    "recipe_id": 492564,
     "recipe_title": "Falafel Burgers with Feta Cucumber Sauce",
    "recipe_image_url": "https://spoonacular.com/recipeImages/falafel-burgers-with-feta-tzatziki-sauce-492564.jpg",
    "servings": 6,
    "beverage_title": "Milkshake",
    "beverage_description": "f",
    "url": "https://www.cinnamonspiceandeverythingnice.com/falafel-burgers-with-feta-tzatziki-sauce/"
    }
```

##### DELETE `/api/pairs/:pair_id`
```js
    // req.body
    {
     "id": 1
    }
```



### 9. Screenshots (to do later)
Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing.png)
Register Page
:-------------------------:
![Register Page](/github-images/screenshots/register.png)
Dashboard Page
:-------------------------:
![Dashboard Page](/github-images/screenshots/dashboard.png)
Search Results Page
:-------------------------:
![Search Results Page](/github-images/screenshots/search-results.png)



### 10. Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Add a random flight functionality
* Use another API to match beverages to the pairings
* Load newly registered users with a complimentary flight



### 11. How to run it
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test