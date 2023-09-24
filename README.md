# DSA Handbook
<ul>
  <li>Clone the project</li>
  <li>In both the directories(client and server) run the command : npm i</li>
  <li>Create a mongoDB database with the name : "dsaHandbook"</li>
  <li>Create two collection in the database, with names : "users", "problems"</li>
  <li>Create a .env file in the directory server</li>
  <li>set a following values in the .env file
    <ul>
      <li>MONGODB_URI=&lt;Paste your mongoDB connection URL&gt;</li>
      <li>PORT=5000</li>
      <li>JWT_SECRET=&lt;enterSecretCode&gt;</li>
      <li>NODE_ENV=development</li>
    </ul>
  </li>
</ul>
<p>
    prerequisite : you need to have installed nodemon, or else
    <ul>
        <li>Go to directory server</li>
        <li>Go to package.json</li>
        <li>Set the value of "start" : "node app.js"</li>
        <br>
        <li>OR</li>
        <br>
        <li>For the directory server, run the command : node app.js</li>
    </ul>
</p>
<h3>In both the directory, run the command : npm start</h3>