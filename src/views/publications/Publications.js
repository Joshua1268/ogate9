import React, { useState } from 'react';
import BaseLayout from "../../layout/BaseLayout";
const samplePosts = [
  {
    title: 'Maison de rêve',
    body: 'Magnifique maison avec vue panoramique.',
    imageUrl: 'https://example.com/maison.jpg',
  },
  {
    title: 'Appartement moderne',
    body: 'Appartement élégant en plein centre-ville.',
    imageUrl: 'https://example.com/appartement.jpg',
  },
  // Ajoutez autant d'objets que nécessaire avec des liens d'images différents
];

function Publications() {
  const [posts] = useState(samplePosts);

  return (
    <BaseLayout>
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          {post.imageUrl && <img src={post.imageUrl} alt={`Post ${index}`} style={{ maxWidth: '100%' }} />}
        </div>
      ))}
    </div>
    </BaseLayout>
  );
}

export default Publications;
