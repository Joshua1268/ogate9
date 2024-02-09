import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdChevronLeft } from 'react-icons/md';
import {MdChevronRight} from 'react-icons/md';
import { FaEdit, FaTrash } from 'react-icons/fa';
import BaseLayout from "../../layout/BaseLayout";
import { MdModeEdit } from 'react-icons/md';

// Utilisez l'icône dans un bouton
<button>
  <MdModeEdit /> Modifier
</button>

const Clients = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({nom:'',prenoms:'',email:'',numero:'',password:'',profil:'' });
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({nom:'',prenoms:'',email:'',numero:'',password:'',profil:'' }); // Ajoutez un état pour le formulaire de modification
  const [showEditForm, setShowEditForm] = useState(false); // Ajoutez un état pour afficher/masquer le formulaire de modification
  const [page, setPage] = useState(0); // La page commence à 0
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherlistclients?page=${page}&param=&taille=20`) // Param est vide et taille est 20
      .then(response => {
        setData(response.data.donnee.users); // Modifiez cette ligne pour extraire typebiens
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setIsLoading(false);
      });
  }, [page]);
  const fetchData = () => {
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherlistclients?page=${page}&param=&taille=20`) // Param est vide et taille est 20
      .then(response => {
        setData(response.data.donnee.users); // Modifiez cette ligne pour extraire typebiens
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSubmit = (event) => {
  event.preventDefault();
  axios.post(`http://185.98.139.246:9090/ogatemanagement-api/admin/enregistrerutilisateur`, form)
    .then(response => {
      setMessage({ text: 'Enregistré avec succès', type: 'success' });
      setShowForm(false);
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      setForm({ id: '', designation: '',typeInfoAddionnelle:'' }); // Réinitialisez le formulaire
      fetchData(); // Actualisez les données
    })
    .catch(error => {
      setMessage({ text: 'Erreur lors de l\'ajout', type: 'error' });
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      console.error('There was an error!', error);
    });
};

const handleEditSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post(`http://185.98.139.246:9090/ogatemanagement-api/admin/enregistrerutilisateur`, editForm); // Utilisez editForm ici
    setMessage({ text: 'Modifié avec succès', type: 'success' });
    setShowEditForm(false);
    setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
    setEditForm({ nom:'',prenoms:'',email:'',numero:'',password:'',profil:'' }); // Réinitialisez le formulaire de modification
    fetchData(); // Actualisez les données
  } catch (error) {
    setMessage({ text: 'Erreur lors de la modification', type: 'error' });
    setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
    console.error('There was an error!', error);
  }
};

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://185.98.139.246:9090/ogatemanagement-api/admin/supprimerinfoadditionnelle/${id}`);
      setMessage({ text: 'Supprimé avec succès', type: 'success' });
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      fetchData(); // Actualisez les données
    } catch (error) {
      setMessage({ text: 'Erreur lors de la suppression', type: 'error' });
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      console.error('There was an error!', error);
    }
  };
  const changeEtat = async (id) => {
    try {
       await axios.post(`http://185.98.139.246:9090/ogatemanagement-api/admin/changeretatcompte/${id}`);
      
        setMessage({ text: 'Le statut du compte a été modifié avec succès', type: 'success' });
      
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      fetchData(); // Actualisez les données
    } catch (error) {
      setMessage({ text: 'Erreur lors de la modification du statut du compte', type: 'error' });
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      console.error('There was an error!', error);
    }
  };


  

  return (
    <BaseLayout>  
      <div className="w-full py-8 px-5">
          <h1 className="text-3xl text-black font-bold">Clients</h1>
          
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primary/10 h-12">
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Numéro</th>
              <th className="px-4 py-2">Type de compte</th>
              <th className="px-4 py-2">Etat</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
    <tr>
      <td colSpan="6" className="border px-4 py-2 text-center">
        <div className="flex justify-center items-center w-full h-full">
        <svg aria-hidden="true" class="w-8 h-8 text-blue-600 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#D3D3D3"/>
         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#219EF9"/>
        </svg>

        </div>
      </td>
    </tr>
  ):          
  (Array.isArray(data) && data.length > 0 ? data.map((item) => (
    <tr key={item.id} className="bg-gray-100">
      <td className="border px-4 py-2 text-center">{item.nom}</td>
      <td className="border px-4 py-2 text-center">{item.numero}</td>
      <td className="border px-4 py-2 text-center">{item.typeCompte}</td>
      <td className="border px-4 py-2 text-center">
        {item.enabled ? 
          <span>🟢</span> /* Icon active */ : 
          <span>🔴</span> /* Icon desactive*/
        }
      </td>

      <td className="border px-4 py-2 text-center">
        
        <button onClick={() => handleDelete(item.id)} className=" hover:bg-red-600 text-black font-bold py-1 px-2 rounded">
          <FaTrash />
        </button>
        <button onClick={() => changeEtat(item.id)} className=" hover:bg-primary text-black font-bold py-1 px-2 rounded">
        <MdModeEdit />
        </button>
      </td>
    </tr>
  )) : (
    <tr>
      <td colSpan="7" className="border px-4 py-2 font-medium text-red-500 text-center">Aucun élément trouvé</td>
    </tr>
  )
  )}
</tbody>

        </table>
  

       
      <div className="flex justify-center mt-4">
      <button onClick={() => setPage(page > 0 ? page - 1 : page)} className="bg-primary hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 flex items-center justify-center rounded-full p-2 text-1xl text-white transition duration-200 hover:cursor-pointer dark:text-white">
        <MdChevronLeft/>
        </button>
        <span className="text-2xl">{page + 1}</span>
        <button onClick={() => setPage(page + 1)} className="bg-primary hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 flex items-center justify-center rounded-full p-2 text-1xl text-white transition duration-200 hover:cursor-pointer dark:text-white">
        <MdChevronRight />
        </button>
      </div>
    
    
    </BaseLayout>
  );
 
};

export default Clients;
