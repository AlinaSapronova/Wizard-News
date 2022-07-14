const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
const timeAgo = require('node-time-ago');

app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
  <div class="news-list">
  <header><img src="/logo.png"/>Wizard News</header>
  ${posts
    .map(
      (post) => `
    <div class='news-item'>
          <p>
          <span class="news-position">
          <a href="/posts/${post.id}">▲${post.title}</a> 
          <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${timeAgo(post.date)}
          </small>
        </div>`
    )
    .join("")}
    </div>
  </body>
</html>`;
  res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    next()
  }else{
  res.send(`<!DOCTYPE html>
  <html>
  <head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
  <div class="news-list">
  <header><img src="/logo.png"/>Wizard News</header>
  <div class='news-item'>
  <p>
  <span class="news-position"></span>${post.title} <small>(by ${post.name})</small>  
   </p>
   <p>${post.content}</p>
  <small class="news-info">
   ${post.date}
  </small>
</div>
</div>
</body>
</html>`
  );
  

}})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send('404 Error: Page not found!')
})

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
