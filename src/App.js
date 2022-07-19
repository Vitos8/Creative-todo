import React, { useState, useEffect } from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";

import { Tasks, Sidebar } from "./components";
import NotFound from "./components/NotFound";
import {API} from "./components/Api";



function App() {
    const [lists, setlists] = useState(null);
    const [colors, setColors] = useState(null);
    const [active , setActive] = useState(null);
    const [tasks , setTasks] = useState(0);
    let navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${API}/lists?_expand=color&_embed=tasks`).then(({ data }) => {
                setlists(data);
            });
        axios.get(`${API}/colors`).then(({ data }) => {
            setColors(data);
        });

    axios.get(`${API}/tasks`).then(({data}) => {
        setTasks(data.length);
    });

    }, []);
    
    let setActivePath = (item, path) => {
        setActive(item);
        return navigate(path);            
    };

    let onAddList = (obj) => {
        let newList = [...lists, obj];
        setlists(newList);
        setActivePath(obj, `/lists/${obj.id}`);
    }; 

    let onAddTask = (listId, obj) => {
        let newList = lists.map(item => {
            if (item.id === listId ) {
                item.tasks ? item.tasks = [...item.tasks, obj] : item.tasks = [obj];
            } 
            return item;
        })
        setlists(newList);
    }; 

    let onRemoveFolder = (item) => {
            let newList = lists.filter(list => list.id !== item.id);
            let newActiveItem = newList.length > 0 && newList[newList.length-1] ;
            setlists(newList);
            setActivePath(newActiveItem, `/lists/${newActiveItem.id}`)
    };    

    let onClickAllTasks =  () => {    
        setActivePath(null, '/')        
        window.location.reload();                                                                
    };

    let onClickTitle = (obj) => {
        setActivePath(obj, `/lists/${obj.id}`)
    };

    let onClickItem = (item) => {
        setActivePath(item, `/lists/${item.id}`)                                                                        
    };

    let onEditTitle = (id, newTitle) => {
        let newList = lists.map(item => {
            if ( item.id === id) {
                item.name = newTitle;
            }
            return item;
        })
        setlists(newList);
    };

    const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
    if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
            if (task.id === taskId) {
            task.completed = completed;
        }
            return task;
        });
    }
        return list;
    });
    setlists(newList);
    axios.patch(`${API}/tasks/` + taskId, {
        completed
    })
    .catch(() => {
            alert('Не удалось обновить задачу');
        });
    };

    let onRemoveTask = (listId, taskId) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.filter(task => {
                    return task.id !== taskId;
                })
            }
                return list;
            }); 
            setlists(newList);
    };


    return (
    <>
        <div className="todo">
            <Sidebar
                colors={colors}
                lists={lists}
                onAddList={onAddList}
                onRemoveFolder={onRemoveFolder}
                onClickItem={onClickItem}
                active={active}
                onClickAllTasks={onClickAllTasks}
            /> 
            <div className='todo__tasks'>
                <Routes>
                    <Route exact path="/" element={tasks  ? lists?.map(list => {
                            if (list?.tasks?.length > 0) {
                                return <Tasks onRemoveTask={onRemoveTask} onCompleteTask={onCompleteTask} onClickTitle={onClickTitle} key={list.id}  onAddTask={onAddTask} onEditTitle={onEditTitle} list={list}  withoutEmpty={true} />
                            }
                            }            
                        ) : <NotFound/>} />
                        <Route  path="/lists/:id" element={active ? <Tasks onRemoveTask={onRemoveTask} onCompleteTask={onCompleteTask} onAddTask={onAddTask} onEditTitle={onEditTitle} list={active ? active : lists[0] } /> :  <NotFound/>} />
                </Routes>
            </div>  
        </div>
        <footer className="footer">Created by Vitalik Golubovich</footer>
        </>
    );
}

export default App;
