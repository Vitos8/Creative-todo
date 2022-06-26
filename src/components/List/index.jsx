import {React, useState} from "react";
import Badge from "../Badge/index";
import "./List.scss";
import removeSvg from "../../assets/img/remove.svg";
import axios from "axios";
import {API} from "../Api";

function List({ items, onClick, onRemoveFolder, onClickItem, active, allTasks, onClickAllTasks }) {

     let removeFolder = (item) => {
          if ( window.confirm('Delete this folder ?')) {
               axios.delete(`${API}/lists/${item.id}`).then(()=> {
                    onRemoveFolder(item);
               });
          }
     };

     items.map(item => {
          return item.closeIcon = removeSvg;
     })
     
     let activeItem = active ? active.id : null;

     return (
          <ul onClick={onClick} className="menu__list">
               {items.map((item,index) => (
                         <li key={index} onClick={onClickItem && !allTasks ?  () => onClickItem(item) : !item?.addFolder ? () => onClickAllTasks()  : null} className={activeItem  === item?.id ? 'active' : item?.addFolder ? 'item' : null}>
                              {item.icon ? (
                                   (<img src={item?.icon} alt='list'/>)
                              ) : (
                                   <Badge  color={ item?.color?.name}/>
                              )}
                              <span>{item?.name}{item?.tasks && item?.tasks.length > 0 && ` (${item?.tasks.length})`}</span>
                              {  !item?.close && activeItem === item?.id  ?  (<img onClick={() => removeFolder(item)} className="close" src={item?.closeIcon} alt="closeSvg"/>)  : null}
                         </li>
               ))}
          </ul>
     );
}

export default List;
