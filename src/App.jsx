import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import Auth from './components/Auth';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  const addPost = (newPost) => {
    const postWithMetadata = {
      ...newPost,
      id: Date.now(),
      author: user ? user.username : 'Anonymous',
      likes: 0,
      comments: [],
      reposts: 0,
    };
    setPosts([postWithMetadata, ...posts]);
    console.log('New post added:', postWithMetadata);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ));
  };

  const handleRepost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, reposts: post.reposts + 1 } : post
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Mini Weibo</h1>
      {user ? (
        <>
          <PostForm onSubmit={addPost} />
          <PostList 
            posts={posts} 
            onLike={handleLike}
            onComment={handleComment}
            onRepost={handleRepost}
          />
        </>
      ) : (
        <Auth onLogin={setUser} />
      )}
    </div>
  );
}

export default App;