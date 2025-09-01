import { Box, Button, TextField } from "@mui/material"
import TodoList from "./component/TodoList"
import { useState } from "react"


function App() {
  // states
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('all');

  // Add new todo
  const handleAddTodo = (todo) => {
  if (!todo.trim()) {
    return alert("❌ Todo cannot be empty!");
  }

  if (todo.length > 20) {
    return alert("⚠️ Todo must be less than 20 characters!");
  }

  const regex = /^[a-zA-Z0-9 ]+$/;
  if (!regex.test(todo)) {
    return alert("❌ Only letters, numbers, and spaces are allowed!");
  }

  const newTodo = [...todoList, { text: todo.trim(), completed: false }];
  setTodoList(newTodo);
  setInputValue('');
};

  // Delete todo
  const handleDeleteTodo =(index)=>{
    const updateTodo = todoList.filter((_,i)=> i!==index )
    setTodoList(updateTodo);    
  }

  // Edit todo
  const handleEditTodo = (index, newValue)=>{
    const updateTodo = [...todoList];
    updateTodo[index]= {...updateTodo[index], text:newValue};
    setTodoList(updateTodo);
  }

  // Toggle complete
  const handleToggleComplete=(index)=>{
    const updateTodo = [...todoList];
    updateTodo[index].completed = !updateTodo[index].completed;
    setTodoList(updateTodo);
  }

  // Filter todos
  const filterTodos = todoList.filter((todo)=>{
    if(filter==='completed') return todo.completed;
    if(filter==='pending') return !todo.completed;
    return true;
  })

  
  return (
    <Box 
    display='flex' 
    alignItems='center' 
    flexDirection='column'
    gap={2}
    >
      <h3>TodoList</h3>
      <Box 
      display='flex' 
      alignItems='center' 
      gap={2}
      >
        <TextField 
        placeholder="Add Todo" 
        value={inputValue} 
        onChange={(e)=>setInputValue(e.target.value)} variant='outlined' 
        size="small"
        />
        <Button 
        onClick={()=>handleAddTodo(inputValue)} variant="contained" 
        color='primary'
        >Add Todo
        </Button>
      </Box>

<Box display='flex' gap={2} marginTop='10px'>
  <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={()=>setFilter('all')}>All</Button>
  <Button variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={()=> setFilter('completed')}>Completed</Button>
  <Button variant={filter === 'pending' ? 'contained' : 'outlined'} onClick={()=> setFilter('pending')}>Pending</Button>
</Box>


      <Box>
        <TodoList 
        todoList={filterTodos} 
        deleteTodo={handleDeleteTodo}
        editTodo={handleEditTodo}
        toggleComplete={handleToggleComplete} />
      </Box>
    </Box>
   
  )
}

export default App
