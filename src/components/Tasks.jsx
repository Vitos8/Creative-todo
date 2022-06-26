import {React}from 'react';
import editSvg from '../assets/img/edit.svg';
import closeSvg from '../assets/img/close.svg';
import axios from 'axios';
import AddTask from './AddTask/index';
import './Badge/Badge.scss';
import {API} from './Api';

let Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onClickTitle,onCompleteTask, completed, onRemoveTask}) => {
     const onChangeCheckbox = (e, id) => {
          onCompleteTask (list.id, id, e.target.checked);
     };

     let editTitle = ( ) => {
          let newTitle = window.prompt('Type new title', list.name);

          if ( newTitle) {
               onEditTitle(list.id, newTitle);
               axios.patch(`${API}/lists/${list.id}`, {
                    name: newTitle,
               }).catch( () => {
                    alert("Can't update a new name !")
               })
          }
     }

     let onRemove = (id) => {
          onRemoveTask(list.id, id);
          axios.delete(`${API}/tasks/${id}`).catch(() => {
               alert("Can't delete this task !")
          })
     };


     return (
          <>
               <h2 onClick={() => withoutEmpty ? onClickTitle(list) : null} className={`todo__tasks-title  ${list?.color?.name}`}>{list?.name}
               <img onClick={editTitle} className='todo__tasks-img' src={!withoutEmpty ? editSvg : null} alt=''/></h2>
               <div className="todo__tasks-items">
                    {list.tasks ? list.tasks.map(task => (
                         <div className="todo__tasks-item"  key={task?.id}>
                         <div className='checkbox'>
                              <input id={`task-${task?.id}`} type="checkbox"   checked={completed}   onChange={(e) => onChangeCheckbox(e,task?.id)}/>
                              <label htmlFor={`task-${task?.id}`}>
                              <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </label>
                         </div> 
                         <input  readOnly maxLength='15' value={task.name} className={`todo__tasks-name ${task.completed && 'line'}`}/>
                         <img src={closeSvg} alt="closeSvg" className='todo__tasks-close' onClick={() => onRemove(task.id)} />
                    </div>      
                    )) : null}
                    <AddTask list={list} onAddTask={onAddTask} withoutEmpty={withoutEmpty}/>
               </div>
          </>
     )
}
export default Tasks;