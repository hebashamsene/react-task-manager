import './App.css';
import TodoList from './component/TodoList';
import TodosProvider, { TodosContext } from './contexts/TodosContext';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from './contexts/ToastContext';
// import {TodosProvider} from "./contexts/TodosContext";

const theme=createTheme({
  palette:{
    primary:{
      main:"#880e4f"
    }
  }
})
const initialTodos=[
    {
        id:uuidv4(),
        title:"المهمة الأولى",
        description:"التفاصيل المهمة الأولى",
        isCompleted:false
    },
    {
        id:uuidv4(),
        title:"المهمة الثانية",
        description:"التفاصيل المهمة الثانية",
        isCompleted:false
    },
    {
        id:uuidv4(),
        title:"المهمة الثالثة",
        description:"التفاصيل المهمة الثالثة",
        isCompleted:false
    },
]
function App() {
    const [todos, setTodos] = useState(initialTodos);
  return (
      <ThemeProvider theme={theme}>
        <TodosProvider>
         <ToastProvider>
          <div className='App' 
              style={{display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    height:"100vh",
                    background:"#191b1f",
                    direction:"rtl"
                    }}>
                      <TodoList />
          </div>
        </ToastProvider> 
        </TodosProvider>
      </ThemeProvider>
  );  
}

export default App;
