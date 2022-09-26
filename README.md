# random-name-gen-app
A demonstration project that has an API backend that binds to an instance of a MongoDB database and an HTML front end, all running from the same code base. The behavior of the UI is that it generates and stores a random name according to a series of button clicks.


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

`<port_number>` is the number of the port for the web server.

---

`Step 5:` Access the front-end web page:

`http://localhost:8080/`

![1 40-05](https://user-images.githubusercontent.com/1110569/192336149-68a1e69d-9689-477d-9047-8e3899b933c3.png)
