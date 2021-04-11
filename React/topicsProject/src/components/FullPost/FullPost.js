import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './FullPost.css';

const fullPost = (props) => {
  const [postState, setPostState] = useState(null);

  useEffect(() => {
    if (props.id) {
      if(!postState || (postState && postState.id !== props.id)) {
        axios.get('/posts/' + props.id).then((response) => {
          setPostState(response.data);
        });
      }
    }
  });

  let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
  if (props.id) {
    <p style={{ textAlign: 'center' }}>Loading...</p>;
  }
  if (postState) {
    post = (
      <div className="FullPost">
        <h1>{postState.title}</h1>
        <p>{postState.body}</p>
        <div className="Edit">
          <button className="Delete">Delete</button>
        </div>
      </div>
    );
  }
  return post;
};

export default fullPost;
