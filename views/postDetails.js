const timeAgo = require("node-time-ago");

module.exports = (post) =>  `<!DOCTYPE html>
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
${timeAgo(post.date)}
</small>
</div>
</div>
</body>
</html>`
//create heroku