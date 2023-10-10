# Review 
## Tasks
* Fix Documentation -  [npm start: Starts the production server.](file:///README.md:19)
    * In reality, it is not starting the production server  - `cross-env NODE_ENV=development webpack-dev-server  --mode development --open`
* Merge files to 1 file called **http-api.js** and remove duplicated code
  * [delete.js](src/api/delete.js)
  * [get.js](src/api/get.js)
  * [patch.js](src/api/patch.js)
  * [post.js](src/api/post.js)
  * [token.js](src/api/token.js)
* Add ability to create ToDo with `Enter` key on keyboard
* Make webpack entry point only one file
