import React, {useEffect, useState} from "react";
import axios from "axios";

import List from "./index.jsx";
import Badge from "../Badge/index.jsx";
import './List.scss';
import './addFolder.scss';
import {API} from "../Api";

function AddFolder({ addSvg, closeSvg, colors, onAddList, lists }) {
     const [visibleModal, setVisibleModal] = useState(false);
     const [badgeActive, setBadgeActive] = useState(3);
     const [isLoading, setIsLoading] = useState(false);
     const [inputValue, setinputValue] = useState('');

     useEffect(()=>{
          if(Array.isArray(colors)){
               setBadgeActive(colors[0].id);
          }
     },[colors]);

     let onClose = () => {
          setVisibleModal(false);
          setinputValue('');
          setBadgeActive(colors[0].id)
     }

     let addFolder = () => {
          if (!inputValue) {
               return alert('Enter a name of the folder')
          }
          if(lists.length === 6){
               return alert("You can't add more folders, the max number of folders is 6 !               (The max number of tasks is endlessly ! )");
          }

          setIsLoading(true);
          axios.post(`${API}/lists`, {name:inputValue, colorId: badgeActive})   
          .then(({data})=>{
               let color = colors.filter(c => c.id ===  badgeActive)[0].name;
               let listObj = {...data, color:{name:color}}
               onAddList(listObj);
               onClose();
          }).finally(() => {
               setIsLoading(false);
          });
     };

     return (
          <div  >
               <List
                    onClick={() => setVisibleModal(true)}
                    items={[
                         {
                              icon: addSvg,
                              name: "Add folder",
                              addFolder: true,
                              close: true,
                         },
                    ]}
               />
               {visibleModal && (
                    <div className="add-folder-modal ">
                         <input maxLength={30} onChange={e => setinputValue(e.target.value)} value={inputValue} placeholder="Folder name" className="add-folder-modal__input"/>
                         <div className="close"><img onClick={onClose} src={closeSvg} alt='close'></img></div>
                         <div className="add-folder-modal__row">
                         {colors.map((color) => {
                              return <Badge onClick={() => setBadgeActive(color.id)} key={color.id} color={color.name} className={badgeActive === color.id && 'badge-active'}/>
                         })}
                         </div>
                         <button onClick={addFolder} type="submit" className="add-folder-modal__btn">{isLoading ? '...Adding' : 'Add'}</button>
                    </div>
               ) }
          </div>
     );
}

export default AddFolder;


