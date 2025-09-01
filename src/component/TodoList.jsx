import { Box, Button, Checkbox, List, ListItem, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";


function TodoList({todoList,deleteTodo,editTodo,toggleComplete}){

    // States
    const[editIndex,setEditIndex] = useState(null);
    const[editValue, setEditValue] = useState('');

    // Edit todo
    const handleEdit =(index,todo)=>{
        if(editIndex===index) {
            editTodo(index,editValue);
            setEditIndex(null);
            setEditValue('');
        }
        else{
            setEditIndex(index);
            setEditValue(todo.text)
        }
    }

    return(
        <Box sx={{
            width:'400px',
            height:'300px',
            overflowY: 'auto',
            padding:'2px',
        }}>
            <List>
                {todoList.map((todo,index)=>{
                 return <ListItem key={index} disablePadding sx={{marginBottom:'20px'}}>
                    <Paper elevation={2}
                    sx={{width:'100%', padding:'2px', display:'flex', justifyContent:'space-between', alignItems:'center',
                       
                    }}
                    >
                    <Box display='flex' alignContent='center' gap={1}>
                        <Checkbox checked={todo.completed}
                        onChange={()=> toggleComplete(index)}
                        />
                        {editIndex===index ? (
                            <TextField size="small" value={editValue} onChange={(e)=>setEditValue(e.target.value)}/>
                        ) : (
                            <Typography
                            sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
                            >{todo.text}</Typography>
                        )}
                    </Box>    
                        
                        <Box display='flex'gap={1}>
                            <Button size="small" variant="outlined" onClick={()=>handleEdit(index,todo)}>{editIndex===index ? 'Save' : 'Edit'}</Button>
                            <Button size="small" variant="contained" color="error" onClick={()=>deleteTodo(index)}>Delete</Button>
                        </Box>
                    </Paper>
                        
                </ListItem> 
            
            })}
            </List>


        </Box>
        
        
            
      
        
       
    )
}

export default TodoList;