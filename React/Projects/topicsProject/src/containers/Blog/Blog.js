import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

const blog = () => {
  const [postState, setPostState] = useState([]);
  const [postId, setPostId] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios.get('/posts').then((response) => {
      const limitedResponse = response.data.slice(0, 4); // irá limitar em até 4 dados
      const postWithAuthor = limitedResponse.map((post) => {
        return {
          ...post,
          author: 'Igor',
        };
      });
      setPostState(postWithAuthor);
    }).catch(error => {
      console.log(error)
      setHasError(true);
    });
  }, []);

  const postSelectedHandler = (id) => {
    setPostId(id);
  };

  let posts = <p>Something went wrong</p>
  if (!hasError) {
    posts = postState.map((post) => {
      return <Post key={post.id} title={post.title} author={post.author} clicked={() => postSelectedHandler(post.id)} />;
    });
  }

  return (
    <div>
      <section className="Posts">
        {posts}
      </section>
      <section>
        <FullPost id={postId} />
      </section>
      <section>
        <NewPost />
      </section>
    </div>
  );
};

export default blog;
