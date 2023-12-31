import React, { useEffect, useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [formValue, setFormValue] = useState({});
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/PaigesTo-doList")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos(data);
      });
  },[]);
//   useEffect(() => {
//     fetch("http://assets.breatheco.de/apis/fake/todos/user/PaigesTo-doList", {
//       method: "PUT",
//       body: JSON.stringify(todos),
//       headers: { "Content-type": "application/json" },
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => console.log(res))
//       .catch((err) => {
//         console.log(err);
//       });
//   },[todos]);
  const addTodo = () => {
    // setTodos([...todos, formValue]);
    let todosArr = todos
    todosArr.push(formValue)
    console.log(todosArr)
    fetch("https://assets.breatheco.de/apis/fake/todos/user/PaigesTo-doList", {
      method: "PUT",
      body: JSON.stringify(todosArr),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
       setTodos([...todosArr])
       console.log(res)})
      
      .catch((err) => {
        console.log(err);
      });
};

    const inputChange = (e) => {
      setFormValue({ label: e.target.value, done: false });
    };
console.log(todos)
    const removeTodo = (index) => {
    //   setTodos((todo) => {
    //     return todo.filter((item, i) => i !== index);
    //   });
        let filtered = todos.filter((item, i) => i !== index)
        console.log(filtered)
        fetch("https://assets.breatheco.de/apis/fake/todos/user/PaigesTo-doList", {
            method: "PUT",
            body: JSON.stringify(filtered),
            headers: { "Content-type": "application/json" },
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
             setTodos([...filtered])
             console.log(res)})
            
            .catch((err) => {
              console.log(err);
            });
    };
    return (
      <div>
        <div className="form-container">
          <input onChange={inputChange} type="text" />
          <button onClick={addTodo}>Add To-do</button>
        </div>
        <h2>Todos</h2>
        {todos.length
          ? todos.map((item, index) => {
              return (
                <h6>
                  {item.label}
                  <button onClick={() => removeTodo(index)}>X</button>
                </h6>
              );
            })
          : null}
      </div>
    );
};
export default Todo;