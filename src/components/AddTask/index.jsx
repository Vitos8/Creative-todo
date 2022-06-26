import {React, useState} from 'react';
import addSvg from '../../assets/img/add.svg';
import './AddTask.scss';
import axios from 'axios';
import {API} from "../Api";

let AddTask = ({list, onAddTask, withoutEmpty}) => {
     const [visibleModal, setVisibleModal] = useState(false);
     const [inputValue, setinputValue] = useState('');

     let addTask = () => {
          if (!inputValue) {
               alert('Enter a name of the task !')
          }  

          let obj = {
               name: inputValue,
               completed: false,
               listId: list.id
          }

          axios.post(`${API}/tasks`, obj).then(({data}) => {
               onAddTask(list.id, data)
               setVisibleModal(false);
               setinputValue('');
          })
          
     };

     return (
          <div className='add-task'>               
               {!visibleModal && !withoutEmpty ?               
               <div  onClick={() => setVisibleModal(true)} className="add-task__row">
                    <img src={addSvg} alt="addSvg" className="add-task__img" />
                    <h4 className="add-task__title">New task</h4>
               </div> : null}
               {visibleModal ? <div className="add-task-modal">
                    <input onChange={(e) => setinputValue(e.target.value)} value={inputValue} placeholder={'Task text'} type="text" className="add-task-modal__input" />
                    <div className="add-task-modal__buttons">
                         <button onClick={addTask} className="add-task-modal__btn-add">Add task</button>
                         <button onClick={() => setVisibleModal(false) } className="add-task-modal__btn-cancel">Cancel</button>
                    </div>
               </div> : null
               }
          </div>
          
     )
}

export default AddTask;