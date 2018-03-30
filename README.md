# Quantified Self Express API

### Endpoints
Base URL:
```
https://quantified-self-api-express.herokuapp.com
```

Food Endpoints:
```
GET /api/v1/foods - returns all foods currently in the database

GET /api/v1/foods/:id - returns the food object with the specific :id you've passed in or 404 if the food is not found

POST /api/v1/foods - allows creating a new food with the parameters:
{ food: { name: "Name of food here", calories: "Calories here"} }

PATCH /api/v1/foods/:id - allows one to update an existing food with the parameters:
{ food: { name: "Name of food here", calories: "Calories here"} }

DELETE /api/v1/foods/:id - will delete the food with the id passed in. If the food can't be found, a 404 will be returned.

```
Meal Endpoints:
```
GET /api/v1/meals - returns all the meals in the database along with their associated foods

GET /api/v1/meals/:meal_id/foods - returns all the foods associated with the meal with an id specified by :meal_id or a 404 if the meal is not found

POST /api/v1/meals/:meal_id/foods/:id - adds the food with :id to the meal with :meal_id

DELETE /api/v1/meals/:meal_id/foods/:id - removes the food with :id from the meal with :meal_id
```

### Initial Setup
```
git clone https://github.com/JosiMcClellan/qs-express-api/
cd qs-express-api
npm install
npm run start:dev
```
then visit http://localhost:3000

### Running the Server
To see your code in action, fire up a development server with:
```
npm run start:dev
```
Once the server is running, visit http://localhost:3000 in your browser.

### Running the Tests
```
npm test
```
