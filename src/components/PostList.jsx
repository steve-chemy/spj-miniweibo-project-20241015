import React, { useState } from 'react';

function PostList({ posts, onLike, onComment, onRepost }) {
  const [commentText, setCommentText] = useState('');

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-blue-200">
          <p className="text-gray-700 text-base mb-4">{post.content}</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {post.images.slice(0, 9).map((image, imgIndex) => (
              <img key={imgIndex} src={image} alt={`Post image ${imgIndex + 1}`} className="w-full h-24 object-cover rounded" />
            ))}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>By: {post.author}</span>
            <div>
              <button onClick={() => onLike(post.id)} className="mr-2 hover:text-blue-500">
                👍 {post.likes}
              </button>
              <button onClick={() => onRepost(post.id)} className="mr-2 hover:text-green-500">
                🔁 {post.reposts}
              </button>
              <span>💬 {post.comments.length}</span>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={() => {
                if (commentText.trim()) {
                  onComment(post.id, commentText);
                  setCommentText('');
                }
              }}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Comment
            </button>
          </div>
          {post.comments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-bold mb-2">Comments:</h4>
              {post.comments.map((comment, index) => (
                <p key={index} className="text-gray-600 mb-1">{comment}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;