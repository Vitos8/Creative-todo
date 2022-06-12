import React from "react";
import List from "./List/index";
import listSvg from "../assets/img/list.svg";
import addSvg from "../assets/img/add.svg";
import AddFolder from "./List/AddFolder";
import closeSvg from '../assets/img/close.svg';
import Loading from './Loading';


function Sidebar({colors, lists, onAddList, onRemoveFolder, onClickItem, active, onClickAllTasks}) {

     return (
          <div className="todo__sidebar">
               <List
                    items={[
                         {
                              icon: listSvg,
                              name: "All tasks",
                              close: true,
                         },
                    ]}
                    onClickAllTasks={onClickAllTasks}
                    allTasks={true}
                    active={active}
               />
               {lists ? 
               ( <List
                    items={lists}
                    onRemoveFolder={onRemoveFolder}
                    onClickItem={onClickItem}
                    active={active}
               />) : <Loading/>}
               <AddFolder addSvg={addSvg}  closeSvg={closeSvg}  colors={colors} lists={lists} onAddList={onAddList}  />
          </div>
     );
}

export default Sidebar;
