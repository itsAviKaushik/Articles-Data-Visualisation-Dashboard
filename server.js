// | ----------------------------------------------------------- |
// | ----------------------------------------------------------- |
// | --- Project Name :- MERN Stack Dashboard BlackCoffer ------ |
// | --- Author :- Avichal Kaushik ----------------------------- |
// | --- Author Email :- avichalkaushik0007@gmail.com ---------- |
// | ----------------------------------------------------------- |
// | ----------------------------------------------------------- |

// Importing the required packages.
const app = require("./app");
const dbConnect = require("./src/dbConnect");

const PORT = 8000;

// Connecting to our Database,
dbConnect();

// Setting up our app on the local server.
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});