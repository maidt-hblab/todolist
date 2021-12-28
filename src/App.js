import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { TodoList, TodoCreate } from './page/todo';
import Home from './page/home';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from "./config/theme";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="todo/list" element={<TodoList/>} />
            <Route path="todo/create" element={<TodoCreate/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
