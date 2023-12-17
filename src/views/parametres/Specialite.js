import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {MdChevronLeft } from 'react-icons/md';
import {MdChevronRight} from 'react-icons/md';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Specialite = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: '', designation: '' });
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({ id: '', designation: '' }); // Ajoutez un état pour le formulaire de modification
  const [showEditForm, setShowEditForm] = useState(false); // Ajoutez un état pour afficher/masquer le formulaire de modification
  const [page, setPage] = useState(0); // La page commence à 0

  useEffect(() => {
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/rechercherlistespecialitesparpage?page=${page}&param=&taille=20`) // Param est vide et taille est 20
      .then(response => {
        setData(response.data.donnee.typebiens); // Modifiez cette ligne pour extraire typebiens
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [page]);
  const fetchData = () => {
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/rechercherlistespecialitesparpage?page=${page}&param=&taille=20`) // Param est vide et taille est 20
      .then(response => {
        setData(response.data.donnee.typebiens); // Modifiez cette ligne pour extraire typebiens
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
  axios.post(`http://185.98.139.246:9090/ogatemanagement-api/admin/enregistrerspecialite`, form) // Supprimez ${form.id} d'ici
    .then(response => {
      setMessage({ text: 'Enregistré avec succès', type: 'success' });
      setShowForm(false);
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      setForm({ id: '', designation: '' }); // Réinitialisez le formulaire
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
    await axios.post(`http://185.98.139.246:9090/ogatemanagement-api/admin/enregistrerspecialite`, editForm); // Utilisez editForm ici
    setMessage({ text: 'Modifié avec succès', type: 'success' });
    setShowEditForm(false);
    setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
    setEditForm({ id: '', designation: '' }); // Réinitialisez le formulaire de modification
    fetchData(); // Actualisez les données
  } catch (error) {
    setMessage({ text: 'Erreur lors de la modification', type: 'error' });
    setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
    console.error('There was an error!', error);
  }
};

  const handleChange = (event) => {
    setForm({ ...form, designation: event.target.value });
  };

  const handleEditChange = (event) => {
    setEditForm({ ...editForm, designation: event.target.value }); // Utilisez setEditForm ici
  };

  const handleEdit = (item) => {
    setEditForm(item); // Utilisez setEditForm ici
    setShowEditForm(true); // Affichez le formulaire de modification
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://185.98.139.246:9090/ogatemanagement-api/admin/supprimerspecialite/${id}`);
      setMessage({ text: 'Supprimé avec succès', type: 'success' });
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      fetchData(); // Actualisez les données
    } catch (error) {
      setMessage({ text: 'Erreur lors de la suppression', type: 'error' });
      setTimeout(() => setMessage(null), 4000); // Faites disparaître le message après 4 secondes
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setShowForm(!showForm)}>
          Ajouter
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-primary/10 h-12">
            <th className="px-4 py-2">Designation</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item, index) => (
            <tr key={index} className="bg-gray-100">
              <td className="border px-4 py-2 text-center">{item.designation}</td>
              <td className="border px-4 py-2 text-center">
                <button onClick={() => handleEdit(item)} className="hover:bg-primary hover:primary text-black font-bold py-1 px-2 rounded mr-2">
                <FaEdit />
                </button>
                <button onClick={() => handleDelete(item.id)} className="hover:bg-red-600 text-black font-bold py-1 px-2 rounded">
                <FaTrash />
                </button>
              </td>
            </tr>
          )) : <tr><td colSpan="3" className="border px-4 py-2 font-medium text-red-500  text-center">Aucun élément trouvé</td></tr>}
        </tbody>
      </table>
      {showForm && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowForm(false)}></div>
          <dialog open className="modal flex items-center justify-center">
            <div className="modal-box rounded-lg max-w-md bg-white p-6  relative mx-auto">
              <button type="button" className="absolute right-0 top-0 m-3" onClick={() => setShowForm(false)}>×</button>
              <h3 className="font-bold text-xl text-black">
                Formulaire d'ajout
              </h3>
              <form className="py-4" onSubmit={handleSubmit}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Désignation</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Désignation"
                    value={form.designation}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Soumettre</button>
              </form>
            </div>
          </dialog>
        </>
      )}
       {showEditForm && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowEditForm(false)}></div>
          <dialog open className="modal flex items-center justify-center">
            <div className="modal-box rounded-lg max-w-md bg-white p-6  relative mx-auto">
              <button type="button" className="absolute right-0 top-0 m-3" onClick={() => setShowEditForm(false)}>×</button>
              <h3 className="font-bold text-xl text-black">
                Formulaire de modification
              </h3>
              <form className="py-4" onSubmit={handleEditSubmit}>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Désignation</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Désignation"
                    value={editForm.designation}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Soumettre</button>
              </form>
            </div>
          </dialog>
        </>
      )}
      {message && (
        <div className={`text-white px-6 py-4 border-0 rounded relative mb-4 mt-4 bg-${message.type === 'success' ? 'green' : 'red'}-500`}>
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            {message.text}
          </span>
          <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={() => setMessage(null)}>
            <span>× </span>
          </button>
        </div>
      )}
      <div className="flex justify-center mt-4">
      <button onClick={() => setPage(page > 0 ? page - 1 : page)} className="bg-primary hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 flex items-center justify-center rounded-full p-2 text-1xl text-white transition duration-200 hover:cursor-pointer dark:text-white">
        <MdChevronLeft/>
        </button>
        <span className="text-2xl">{page + 1}</span>
        <button onClick={() => setPage(page + 1)} className="bg-primary hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 flex items-center justify-center rounded-full p-2 text-1xl text-white transition duration-200 hover:cursor-pointer dark:text-white">
        <MdChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Specialite;
