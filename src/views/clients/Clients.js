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

  useEffect(() => {
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherlistclients?page=${page}&param=&taille=20`) // Param est vide et taille est 20
      .then(response => {
        setData(response.data.donnee.users); // Modifiez cette ligne pour extraire typebiens
      })
      .catch(error => {
        console.error('There was an error!', error);
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
  {Array.isArray(data) && data.length > 0 ? data.map((item) => (
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
