ABOUT:

- API created with NestJs

HOW TO BUILD/RUN:

- make sure you configure your .env file as the .env.example
- make sure you run 'npm i' to install all node modules
- then simply run 'nest start' in your terminal

Issues:

- Here I intend to be completely honest with the dificulties I had during this project:
  - Prior to yesterday's Telegram message I wasn't aware of the need of RabbitMQ, after some investigating and learning I was able to implement it!
  - Prior to today's test I wasn't aware of the need for Nest.Js and had never used it, so it took me some time to figure it out (I think I handled it quite well, but not as comfortably as I would be with Express.js)
  - Since I used a lot of time trying to learn RabbitMQ and NestJs, I didn't have the time implement testing, which is something I value a lot and if I had time would have done using JEST and Supertest for the integration and JEST for the unit, I was able to manually test using Thunderclient and the results were good, but a test coverage is essential to avoid corner cases and to help maintance and further development.
# trial-payever
