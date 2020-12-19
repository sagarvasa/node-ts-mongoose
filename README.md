# node-ts-mongoose
APIs in Node.js with typescript language and mongoose ODM

# Steps to start and configure server
1. Clone/Fork the repo in your workspace
2. Install the dependancies using `npm install`
3. Set up .env file at a root level
4. Run your mongodb server and change configuration at src/config/mongodb.js if applicable
5. Run linting and prettier script using `npm run lint` (optional)
6. Run command `npm start` to start the server locally
7. Use `npm run docker:build` & `npm run docker:run` to build and run on docker

# API
1. Load Movies from external URL
curl --location --request POST 'http://localhost:3000/v1/api/movies/load/all.json'

2. Get Movies by release year
curl --location --request GET 'http://localhost:3000/v1/api/movies.json?releaseYear=2011&offset=1&limit=5'

3. Get Movie by id
curl --location --request GET 'http://localhost:3000/v1/api/movies/5fde333090a848649e144102.json'

4. Update Movie by id
curl --location --request PUT 'http://localhost:3000/v1/api/movies/5fde333090a848649e144102.json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "actor2": "SRK"
}'

5. Delete Movie by id
curl --location --request DELETE 'http://localhost:3000/v1/api/movies/5fde333090a848649e144102.json' \
--data-raw ''

6. Create Movie by id
curl --location --request POST 'http://localhost:3000/v1/api/movies.json' \
--header 'Content-Type: application/json' \
--data-raw '{
        "title": "180",
        "releaseYear": "2011",
        "locations": "Polk & Larkin Streets",
        "productionCompany": "SPI Cinemas",
        "director": "jayendra",
        "writer": "Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba",
        "actor1": "Siddarth",
        "actor2": "Nithya Menon",
        "actor3": "Priya Anand",
        "createdAt": "2020-12-19T17:06:56.905Z",
        "updatedAt": "2020-12-19T17:06:56.905Z"
    }'

Note: All movies are fetched from external URL and then saved in the DB. If external URL is not working, then please use below curl. These API will load the data from seeder and then insert it in DB

curl --location --request POST 'http://localhost:3000/v1/api/movies/seeder/load.json' \
--data-raw ''