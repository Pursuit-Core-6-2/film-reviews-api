# Films Reviews API
This Server/API is intended to be used by fellows to practice making network requests, learn about HTTP status codes, their uses and differences, learn about query parameters and body data sent to appropriate endpoints. 

More specifically this server is used for extending the [`unit_2_assessment`](https://github.com/joinpursuit/unit_2_assessment) by adding the possibility to permanently safe film reviews.

## Dependencies
  * `node`
  * `npm`
  * PostgreSQL / `psql`
  * Postman (optional)

## Setup

### Local

1. After cloning this repo install dependencies with:

    ```sh
    npm install
    ```

2. Make sure you have Postgres running in your machine. Revise [`db/films_reviews_api_db.sql`](db/films_reviews_api_db.sql)
and make sure the lines that drop, create and connect to a database are uncommented. Create database and 
tables with:

    ```sh
    psql -f db/films_reviews_api_db.sql
    ```
3. Dev server will run at `http://localhost:3100`. Start it with:

    ```sh
    npm run start:dev
    ```

### Deployment
This server is to be deployed to Heroku. You will need a Heroku account and the Heroku
CLI to follow this steps.

1. Once this repository has been cloned to your machine and while you are inside its
directory. To create a Heroku app and automatically add a `heroku` remote to your repo, run. 
    ```sh
    heroku apps:create <your_app_name>
    ```

2. Provide the Heroku app with a Postgres database with
    ```sh
    heroku addons:create heroku-postgresql:hobby-dev -a <your_app_name>
    ```

3. To create the tables in the database, take a look at [`db/films_reviews_api_db.sql`](db/films_reviews_api_db.sql). For local development you would want to leave uncommented the lines that refer to creating, dropping and connecting to a database. For deployment you should comment those lines and leave only the drop and create table lines. Find more [here](https://devcenter.heroku.com/articles/heroku-postgresql).
    ```sh
    cat db/films_reviews_api_db.sql | heroku pg:psql -a <your_app_name>
    ```

4. Push this repo to Heroku to be deployed
    ```sh
    git push heroku master 
    ```
    or if you want to push a feature branch of the repo
    ```sh
    git push heroku feature_branch:master
    ```
5. To test the API using Postman create a Postman environment and add the environment variable `server_address`. Set it's value to the url heroku gave your app e.g. `https://films-reviews.herokuapp.com`. More on this [here](https://learning.getpostman.com/docs/postman/environments_and_globals/intro_to_environments_and_globals/).

    Test the API with this Postman collection. Click to Download: 
    
    [![Run in Postman](https://run.pstmn.io/button.svg)](TODO) 

6. Once verified what everything works share the url with the class and let them play with it. Your url should look something similar to: `https://films-reviews.herokuapp.com`

## API Docs

### Resources
* apps
* reviews

### Endpoints

#### Apps
| Method | Endpoint                 | Query Params          | Use                             | 
|--------|--------------------------|-----------------------|---------------------------------|
| `POST` | `/apps/register`         || Register an app to be granted access to the API. This endpoint will assign your app and `id` that will need to be used for subsequent requests when storing film reviews. Body data must contain `owner_name` (your name), `owner_email`(your pursuit email) and `app_name` (a name for your app).
| `GET`  | `/apps/<owner-email>`    || Use to retrieve your App id `by` using the email you registered the app with.

#### reviews
| Method   | Endpoint           | Query Params          | Use                             | 
|----------|--------------------|-----------------------|---------------------------------|
| `POST`   | `/reviews`         || Add a new review. Body data must contain `app_id`, `film_id`, `reviewer_username` and `text`
| `GET`    | `/reviews`         | `film-id`, `app-id`
| `GET`    | `/reviews/<review-id>` || TODO
| `PUT`    | `/reviews/<review-id>` || TODO
| `PATCH`  | `/reviews/<review-id>` || TODO
| `DELETE` | `/reviews/<review-id>` || TODO
