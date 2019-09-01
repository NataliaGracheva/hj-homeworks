'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector(".comments");
  const commentNodes = list.map(createComment);
  const fragment = commentNodes.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  commentsContainer.appendChild(fragment);
}

function createComment(comment) {
  const photo = document.createElement("div");
  photo.className = "photo";
  photo.setAttribute("title", comment.author.name);
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.style.backgroundImage = `url('${comment.author.pic}')`;
  photo.appendChild(avatar);

  const commentBlock = document.createElement("div");
  commentBlock.className = "comment-block";
  const commentText = document.createElement("p");
  commentText.className = "comment-text";
  //добавляем текст с учетом переводов строк
  commentText.innerText = comment.text;
  commentBlock.appendChild(commentText);

  const bottomComment = document.createElement("div");
  bottomComment.className = "bottom-comment";
  const commentDate = document.createElement("div");
  commentDate.className = "comment-date";
  commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');
  bottomComment.appendChild(commentDate);

  const commentActions = document.createElement("ul");
  commentActions.className = "comment-actions";
  const complain = document.createElement("li");
  complain.className = "complain";
  complain.textContent = 'Пожаловаться';
  commentActions.appendChild(complain);
  const reply = document.createElement("li");
  reply.className = "reply";
  reply.textContent = 'Ответить';
  commentActions.appendChild(reply);
  bottomComment.appendChild(commentActions);
  commentBlock.appendChild(bottomComment);


  const commentWrap = document.createElement("div");
  commentWrap.className = "comment-wrap";
  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);
  return commentWrap;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);


