# locationtracker

Follow this steps for setting up this service.

1. Clone the project
2. Please do npm install
3. Pleas make sure you are running mongodb server in your local machine with default port. If it's running in different server, please update production.js, development.js in environment folder. There is db configuration there.
4. Finally node server.js.

You are done and for testing 

http://localhost:3000/api/sayhello

you will get JSON response

{
	"status": true,
	"message": "Hello world!"
}