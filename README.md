# random-name-gen-app
A demonstration project that has an API backend using MongoDB and an HTML front end, all running from the same server. 


## Get up and running

`Step 1:` Get the code:

`git clone https://github.com/reselbob/random-name-gen-app.git`

---

`Step 2:` Add an entry to `.env`:

`MONGODB_URL=<connection_string_url_to_mongodb_server>`

---

`Step 3:` Install the dependencies:

`npm install`

---

`Step 4:` Start the server:

`node server.js`

By default, the app runs on port `8080`

To change the port on which the web server is listening, add the following to the `.env` file in the root of the project's working directory:

`SERVER_PORT=<port_number>`

WHERE

**`<port_number>` is the number of the port for the web server.

---

`Step 5:` Access the front-end web page:

`http://localhost:3090/`
