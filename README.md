# backendjobhub

## Backend for a job platform openings built using NodeJs with Express, Prisma, MySql database and TypeScript. ##

Because the login flow was built with firebase, the lib firebase-admin was used to validate the jwt token.

At first, and because of the low entities, this project was started with MongoDb database, but as it got bigger I had necessity to switch
to a swl database. So, using the repository pattern the changes in the code was very low, and this change was fast. 
The code for the MongoDb was NOT removed.

For the real-time notifications was used socket.io.


