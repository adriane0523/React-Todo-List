import React, { useState,useEffect } from 'react';

import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

/**  /*  <p className="App-intro">; test{req.apiResponse}</p> } */
function App() {
  const[req, setreq] = useState({});
 
  const[inputText, setInputText] =  useState("");
  const[todos, setTodos] = useState([]);
  const[status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect( ()=>{
    fetch("http://localhost:3000/testAPI")
        .then(res => res.text())
        .then(res => setreq({ apiResponse: res }));
        console.log(req)
  }, []);;




  useEffect( ()=>{
    getLocalTodos();
  }, []);;


  useEffect(()=> {
    filiterHandler();
    saveLocalTodos();
  }, [todos, status ]);


  const filiterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter( todo=> todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;

    }
  };

  const saveLocalTodos = () => {

    localStorage.setItem("todos", JSON.stringify(todos));
   

  };

  const getLocalTodos = () => {
    if(localStorage.getItem ('todos') === null){
      localStorage.setItem("todos", JSON.stringify([]));

    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
    
      setTodos(todoLocal);
    }

    
  }

  


  return (

    <div className="App">
      <header>
  
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TodoList</title>
    <link
      href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
      integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
      crossOrigin="anonymous"
    />
    <link rel="stylesheet" href="./style.css" />

      <h1>Adriane's To Do List</h1>

      
      </header>

      <Form setInputText={setInputText}
       inputText = {inputText}
        todos={todos}
         setTodos={setTodos}
         setStatus = {setStatus}
   
         />
      <TodoList setTodos={setTodos}    
      todos={todos}
            filteredTodos = {filteredTodos}  />
       
    </div>
  );
}

export default App;
