const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
const postList = require("./views/postList");
const postDetails = require("./views/postDetails") ;


app.use(express.static(__dirname + "public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  
  res.send(postList(posts));
});

app.get('/posts/:id', (req, res) => {
  const post = postBank.find(req.params.id);
  if (!post.id) {
    next()
  }else{
  res.send(postDetails (post));
  

}})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send('404 Error: Page not found!')
})

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
