import react, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import TodoList from "./components/TodoList";
import TodoFrom from "./components/TodoFrom";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("/api/todos/")
      .then((res) => {
        setTodos(res.data);
      })
      .catch(() => {
        alert("something is wrong");
      });
  }, []);
  return (
    <div>
      <Navbar bg="light" style={{ marginBottom: "20px" }}>
        <Container>
          <Navbar.Brand href="#">Todo App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <TodoFrom todos={todos}  setTodos ={setTodos}/>
        <TodoList todos={todos} setTodos = {setTodos}/>
      </Container>
    </div>
  );
}

export default App;
