import React, { useState } from 'react';
import axios from 'axios';

import './NewPost.css';

const newPost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: 'Max',
  });

  const postHandler = () => {
    axios.post('/posts', post)
      .then(response => {
        console.log(response.data)
      })
  }

  return (
    <div className="NewPost">
      <h1>Add a Post</h1>
      <label>Title</label>
      <input type="text" value={post.title} onChange={e => setPost({...post, title: e.target.value })} />
      <label>Content</label>
      <textarea rows="4" value={post.content} onChange={e => setPost({...post, content: e.target.value })} />
      <label>Author</label>
      <select value={post.author} onChange={e => setPost({...post, author: e.target.value })}>
        <option value="Max">Max</option>
        <option value="Manu">Manu</option>
      </select>
      <button onClick={postHandler}>Add Post</button>
    </div>
  );
};

export default newPost;
