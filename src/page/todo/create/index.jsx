import React,  { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from '../list/styles';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import { PRIORITY } from '../../../constants';

const defaultData = {
  id: 0,
  title: '',
  description: '',
  dueDate: new Date(),
  priority: 0,
  isChecked: false,
  isExpand: false,
  errorTitle: '',
}

const Create = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [todoItem, setTodoItem] = useState(defaultData);

  const handleChangeValue = (field, value) => {
    setTodoItem({ ...todoItem, [field]: value });
  };

  const handleChangeTitle = (event) => {
    handleChangeValue('title', event.target.value);
  }

  const handleChangeDescription = (event) => {
    handleChangeValue('description', event.target.value);
  }

  const handleChangePriority = (event) => {
    handleChangeValue('priority', event.target.value);
  }

  const handleChangeDate = (value) => {
    handleChangeValue('dueDate', value);
  }

  const handleCreateData = () => {
    if(!todoItem.title) {
      setTodoItem({ ...todoItem, errorTitle: 'This field is required' });
      return;
    }
    const dataFromLocalStorage = localStorage.getItem('data');
    let todoData  = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [];
    const ids = todoData.map(item => item.id);
    const idMax = ids.length !== 0 ? Math.max(...ids) : 0 ;
    todoData.unshift({ ...todoItem, id: idMax + 1 });
    todoData.sort((item1, item2) => {
      const date1 = new Date(item1.dueDate);
      const date2 = new Date(item2.dueDate);
      return date1.getTime() - date2.getTime();
    });
    localStorage.setItem('data', JSON.stringify(todoData));
    setTodoItem(defaultData);
    navigate('/todo/list');
  };

  return(
    <>
      <CssBaseline />
      <Container maxWidth="md" >
        <Box pt={2} pb={2} sx={{ bgcolor: '#eee', height: '100vh' }} >
          <Typography variant="h5" gutterBottom component="div" className={classes.title}>
            Create To Do
          </Typography>
          <Box p={2}  mt={2}>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Title"
                variant="outlined"
                value={todoItem.title}
                onChange={(event) => handleChangeTitle(event)}
                onFocus={() => setTodoItem({ ...todoItem, errorTitle: '' })}
              />
              <FormHelperText error>{todoItem.errorTitle}</FormHelperText>
            </Box>
            <Box mb={2}>
              <TextareaAutosize
                minRows={10}
                placeholder="Description"
                value={todoItem.description}
                style={{ width: '100%', padding: 10 }}
                onChange={(event) => handleChangeDescription(event, todoItem)}
              />
            </Box>
            <Box mb={2} display='flex' justifyContent='space-between'>
              <Box flex='0 0 50%' pr={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due date"
                    defaultValue={todoItem.dueDate}
                    value={todoItem.dueDate}
                    onChange={(newValue) => handleChangeDate(newValue, todoItem)}
                    minDate={defaultData.dueDate}
                    renderInput={(params) => <TextField  className={classes.textBox} {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box flex="0 0 50%" pl={1}>
                <FormControl className={classes.selectPriority}>
                  <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={todoItem.priority}
                    label="Priority"
                    onChange={(event) =>handleChangePriority(event) }
                  >
                    {PRIORITY.map(item => (
                      <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Button variant="contained" fullWidth onClick={handleCreateData}>Create</Button>
          </Box>      
        </Box>
      </Container>
    </>
  );
};

export default Create;