import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {useRouter} from 'next/router';

// Importar el estado global de la app desde del context
import { useTasks } from '../context/taskContext';

const TaskFormPage = () => {

   // Definir estado del componente
   const [task, setTask] = useState({
      title: '',
      description: ''
   });

   // Importar funciones para crear y editar tareas
   const { createTask, updateTask, tasks } = useTasks()

   // Destructurando el useRouter
   const { push, query } = useRouter();


   // Crear funcion para recibir el cambio en los datos del formulario - parecido al v-model
   const handleChange = (e) => {
      const {name, value} = e.target
      setTask({...task, [name]: value});
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      if(!query.id){
         createTask(task.title, task.description);
      } else {
         updateTask(query.id, task);
      }

      push('/')
   }

   // Obteniendo datos por la URL
   useEffect(() => {
      if(query.id){
         const taskFound = tasks.find(task => task.id === query.id)
         setTask({title: taskFound.title, description: taskFound.description});
      }
   }, [])

   return (
      <Layout>
         <div className="flex justify-center items-center h-full">
            <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4 w-1/3">
               <h1 className="mb-5 text-2xl font-bold text-center">{query.id ? 'Editar tarea': 'Crear Tarea'}</h1>
               <input 
                  type="text" 
                  name="title"
                  placeholder="Escribir título"
                  className="bg-gray-800 focus:outline-none focus:text-gray-100 w-full py-3 px-4 mb-5"
                  onChange={handleChange}
                  value={task.title}
               />
               <textarea 
                  rows="2" 
                  placeholder="Escribir descripción"
                  className="bg-gray-800 focus:outline-none focus:text-gray-100 w-full py-3 px-4 mb-5"
                  name='description'
                  onChange={handleChange}
                  value={task.description}
               ></textarea>
   
               <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30" disabled={!task.title} >
                  Guardar
               </button>
            </form>
         </div>
      </Layout>
   )
}

export default TaskFormPage;
