// require("dotenv").config();
const express = require("express");
const https = require("https");
const app = express();
const routes = require("./Routes/index");

app.use(express.json());
app.use(routes);

// app.get("/", async (req, res) => {
//     // console.log(req._construct)
//     res.send(routes)
// });

app.get("/book", async (req, resOg) => {
  // console.log(req._construct)
  const obj = https.get(
    "https://openlibrary.org/works/OL45804W.json",
    (res) => {
      let data = [];
      const headerDate =
        res.headers && res.headers.date ? res.headers.date : "no response date"
      console.log("Status Code:", res.statusCode)
      console.log("Date in Response header:", headerDate)
      res.on("data", (chunk) => {
        data.push(chunk)
      });

      res.on("end", () => {
        console.log("Response ended: ", JSON.parse(Buffer.concat(data).toString()));
        resOg.send(Buffer.concat(data).toString())
      })
    }
  );


});

app.all("*", function (req, res) {
  res.status(404).send("Sorry, this is an invalid URL.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
