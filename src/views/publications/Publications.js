import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseLayout from "../../layout/BaseLayout";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherpublicationparpage?page=${page}&taille=20`)
      .then(response => {
        setIsLoading(false);
        setPublications(response.data.donnee.publications);
      })
      .catch(error => {
        console.error('Error fetching publications:', error);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <BaseLayout>
      <div className="overflow-y-scroll h-screen-3/4 px-3">
        <h1 className="text-3xl font-bold mb-4 py-8 px-3">Publications</h1>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <svg aria-hidden="true" className="w-8 h-8 text-blue-600 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#D3D3D3"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#219EF9"/>
            </svg>
          </div>
        ) : (
          publications.map(publication => (
            <div key={publication.id} className="mb-4">
              <h2 className="text-xl font-semibold">{publication.description}</h2>
              <p>Localisation: {publication.localisation}</p>
              <p>Date de publication: {publication.datePublication}</p>
              <p>Prix: {publication.prix}</p>
          
              {/* Affichage des fichiers */}
              {publication.fichiers.map(fichier => (
                <div key={fichier.id}>
                  {fichier.typeFichier === "IMAGE" && (
                    <img src={`http://185.98.139.246:9090/ogatemanagement-api/admin/file/download/${fichier.id}`} alt={fichier.nom} className="max-w-full h-auto mb-2" />
                  )}
                  {fichier.typeFichier === "VIDEO" && (
                    <video controls className="max-w-full h-auto mb-2">
                      <source src={`http://185.98.139.246:9090/ogatemanagement-api/admin/file/download/${fichier.id}`} type="video/mp4" />
                      Votre navigateur ne prend pas en charge la lecture de vidéos.
                    </video>
                  )}
                  {fichier.typeFichier === "DOCUMENT" && (
                    <a href={`http://185.98.139.246:9090/ogatemanagement-api/admin/file/download/${fichier.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mb-2 block">{fichier.nom}</a>
                  )}
                </div>
              ))}
              {/* Vous pouvez ajouter d'autres détails de la publication ici */}
              <hr className="my-2" />
            </div>
          ))
        )}
      </div>
    </BaseLayout>
  );
};

export default Publications;
