import { createContext, useContext, useState } from 'react';
import {v4 as uuid} from 'uuid'

// Crear Context
export const TaskContext = createContext();

// Usar el context
export const useTasks = () => {
   return useContext(TaskContext);
}

// Proveer datos del contexto a los componentes hijo
export const TaskProvider = ({children}) => {

   // Definiendo el estado general de la app en el context
   const [tasks, setTasks] = useState([
      {id: '1', title: 'Tarea 1', description: 'Desc 1'},
   ]);

   // Funcion para crear tareas en el context
   const createTask = (title, description) => {
      setTasks([...tasks, {title, description, id: uuid()}]);
   }

   // Funcion para editar tareas
   const updateTask = (id, updatedTask) => {
      setTasks([...tasks.map(task => task.id === id ? {...task, ...updatedTask} : task)])
   }

   // Funcion para borrar tareas
   const deleteTask = (id) => {
      setTasks([...tasks.filter((task) => task.id !== id)]);
   }

   return (

      <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
         {children}
      </TaskContext.Provider>
   )
}
