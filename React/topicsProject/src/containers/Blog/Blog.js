import React, { useEffect } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

const blog = () => {
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(post => {
        console.log(post)
      })
  })

  return (
    <div>
      <section className="Posts">
        <Post />
        <Post />
        <Post />
      </section>
      <section>
        <FullPost />
      </section>
      <section>
        <NewPost />
      </section>
    </div>
  );
};

export default blog;
