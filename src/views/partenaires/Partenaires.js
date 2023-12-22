import React, { useState } from 'react';
import BaseLayout from "../../layout/BaseLayout";

// Importez les images depuis le dossier assets/images
import immobImage from '../../assets/images/immob.jpg';
import mobiImage from '../../assets/images/mobi.jpg';

function Partenaires() {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <BaseLayout>
      <div style={{ textAlign: 'center' }}>
        {/* Utilisez les images importées comme sources */}
        <div>
          <img src={immobImage} alt="Post 1" style={{ maxWidth: '100%' }} />
          <div>
            <button onClick={handleLike}>Like</button>
            <p>{likes} likes</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Write a comment..."
              onKeyDown={(e) => e.key === 'Enter' && handleComment(e.target.value)}
            />
            {comments.map((comment, i) => <p key={i}>{comment}</p>)}
          </div>
        </div>

        <div>
          <img src={mobiImage} alt="Post 2" style={{ maxWidth: '100%' }} />
          <div>
            <button onClick={handleLike}>Like</button>
            <p>{likes} likes</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Write a comment..."
              onKeyDown={(e) => e.key === 'Enter' && handleComment(e.target.value)}
            />
            {comments.map((comment, i) => <p key={i}>{comment}</p>)}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Partenaires;
