const timeAgo = require("node-time-ago");


module.exports = (posts) => `<!DOCTYPE html>
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

