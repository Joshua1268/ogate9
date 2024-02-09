import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdChevronLeft } from 'react-icons/md';
import {MdChevronRight} from 'react-icons/md';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Typedocument = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: '', designation: '' });
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({ id: '', designation: '' }); // Ajoutez un état pour le formulaire de modification
  const [showEditForm, setShowEditForm] = useState(false); // Ajoutez un état pour afficher/masquer le formulaire de modification
  const [page, setPage] = useState(0); // La page commence à 0
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    axios.get(`http://185.98.139.246:9090/ogatemanagement-api/admin/rechercherlistetypedocumentsparpage?page=${page}&param=&taille=20`)
      .then(response => {
        setData(response.data.donnee.typeDocuments); // Modifier pour extraire typeDocuments
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setIsLoading(false);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSubmit = (event) => {
  event.preventDefault();
  axios.post(`http://185.98.139.246:9090/ogatemanagement-api/admin/enregistrertypedocument`, form) // Supprimez ${form.id} d'ici
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
    await axios.post(`http://185.98.139.246:9090/ogatemanagement-api/admin/enregistrertypedocument`, editForm); // Utilisez editForm ici
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
      await axios.delete(`http://185.98.139.246:9090/ogatemanagement-api/admin/supprimertypedocument/${id}`);
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
  (Array.isArray(data) && data.length > 0 ? (
    data.map((item, index) => (
      <tr key={index} className="bg-gray-100">
        <td className="border px-4 py-2 text-center">{item.designation}</td>
        <td className="border px-4 py-2 text-center" >
          <button onClick={() => handleEdit(item)} className=" hover:bg-primary text-black font-bold py-1 px-2 rounded mr-2">
          <FaEdit />
          </button>
          <button onClick={() => handleDelete(item.id)} className="hover:bg-red-600 text-black font-bold py-1 px-2 rounded">
          <FaTrash />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="border px-4 py-2 font-medium text-red-500 text-center">
        {data.length === 0 ? 'Aucun élément trouvé' : 'Chargement en cours...'}
      </td>
    </tr>
  )
 )}
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

export default Typedocument;
