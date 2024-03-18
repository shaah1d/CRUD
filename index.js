const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data
const { v4: uuid } = require('uuid');
var methodOverride = require('method-override')


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    { id: uuid(), username: "user.1",        comment: "Great job!"       },
    { id: uuid(), username: "john.doe.42",   comment: "Awesome work!"    },
    { id: uuid(), username: "alice.123",     comment: "I love it!"       },
    { id: uuid(), username: "tech.guru.007", comment: "Impressive!"      },
    { id: uuid(), username: "coding.ninja",  comment: "Fantastic job!"   },
    { id: uuid(), username: "user_99",       comment: "Well done!"       },
    { id: uuid(), username: "web.dev.22",    comment: "Keep it up!"      },
    { id: uuid(), username: "software.m3",   comment: "This is amazing!" },
    { id: uuid(), username: "designer.365",  comment: "Brilliant work!"  },
    { id: uuid(), username: "art_lover.007", comment: "Incredible!"      }
];


app.get('/comments', (req,res) => {
    res.render('comments/index', {comments: comments});
})
app.get('/comments/new', (req,res) => {
    res.render('comments/new');
})
app.post('/comments', (req,res) => {
    const { username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
   res.redirect('/comments');
})
app.get('/comments/:id', (req,res) => {
    const { id } = req.params;
const comment = comments.find(c=> c.id === (id))
res.render('comments/show', {comment});

})
app.get('/comments/:id/edit', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c=> c.id === (id))
  res.render('comments/edit', {comment});
})
app.patch('/comments/:id', (req,res) => {
    const { id } = req.params;
    const foundComment = comments.find(c=> c.id === (id))
    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})
app.delete('/comments/:id', (req,res) => {
   const { id } = req.params;
   comments = comments.filter(c => c.id !== id);
   res.redirect('/comments');
})
app.listen(3000, () => {
    console.log("ON PORT 3000");
})
