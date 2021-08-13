# group-project-3

notes:

client folder is a standed "create-react-app" installation. no changes have been made to any of these files

server folder is a modifed version of the "shop-shop" app from module 22.

the modifcations were to strip all models except for user, and the only queries and mutations in graphQL are user related:

    - querys:
        - user
    - mutations:
        - add user
        - update user
        - login

sensitive api info stored in heroku config vars:

    - MONGODB_URI -> the connection string for the database
    - JWT_SECRET -> the encryption phrase for the JWT token

Users:
you can see your database with "npm run seed". This will create 3 users, all users have password "12345"

    - spiderman@testmail.com
    - vulture@testmail.com
    - electro@testmail.com

heroku link

<https://infinite-cliffs-24778.herokuapp.com/>
