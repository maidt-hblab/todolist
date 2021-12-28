import React,  { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useStyles from './styles';
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
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import AddIcon from '@mui/icons-material/Add';
import { PRIORITY } from '../../../constants';
import Snackbar from '@mui/material/Snackbar';

const List = () => {
  const dataFromLocalStorage = localStorage.getItem('data');
  const todoData  = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage): [];
  const [todoList, setTodoList] = useState(todoData);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [search, setSearch] = useState('');

  const classes = useStyles();

  const navigate = useNavigate();

  const getDataFromLocalStorage = ()  => {
    const dataFromLocalStorage = localStorage.getItem('data');
    const todoData = dataFromLocalStorage ? JSON.parse(dataFromLocalStorage): [];
    return todoData;
  }

  const updateDataTodoItem = (item, index, field, value) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    const newItem = { ...item, [field]: value}
    newList.splice(index, 0, newItem);
    setTodoList(newList);
  }

  const updateDataToDoItemLocalStorage = (item, field, value) => {
    const todoData = getDataFromLocalStorage();
    const indexItemLocalStorage = todoData.findIndex(itemTodo => itemTodo.id === item.id);
    todoData.splice(indexItemLocalStorage, 1);
    const newItem = { ...item, [field]: value}
    todoData.splice(indexItemLocalStorage, 0, newItem);
    localStorage.setItem('data', JSON.stringify(todoData));
    reSearchData();
  }

  const handleUpdateDataToLocalStorage =  (index) => {
    const item = todoList[index];
    if(!item.title) {
      updateDataTodoItem(item, index, 'errorTitle', 'This field is required');
      return;
    }
    updateDataTodoItem(item, index, 'errorTitle', '');
    updateDataToDoItemLocalStorage(item, 'errorTitle', '');
    setOpenSnackbar(true);
  }

  const onExpandItem = (item, index) => {
    updateDataTodoItem(item, index, 'isExpand', !item.isExpand);
    updateDataToDoItemLocalStorage(item, 'isExpand', !item.isExpand);
  };


  const changCheckedValue = (item, index) => {
    updateDataTodoItem(item, index, 'isChecked', !item.isChecked);
    updateDataToDoItemLocalStorage(item, 'isChecked', !item.isChecked);
  }

  const handleChangeTitle =(event, item,  index) => {
    const value = event.target.value
    updateDataTodoItem(item, index, 'title', value);
  }

  const handleChangeDescription = (event, item, index) => {
    const value = event.target.value
    updateDataTodoItem(item, index, 'description', value);
  }

  const handleChangePriority = (event, item, index) => {
    const value = event.target.value;
    updateDataTodoItem(item, index, 'priority', value);
  }

  const handleChangeDate = (value, item, index) => {
    updateDataTodoItem(item, index, 'dueDate', value);
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  }

  const reSearchData = () => {
    const todoData  = getDataFromLocalStorage();
    let todoDataFilter = [...todoData];
    if (search) {
      todoDataFilter =  todoData.filter(item => item.title.includes(search))
    }
    setTodoList(todoDataFilter);
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      reSearchData();
    }
  };

  

  const onRemoveItem = (item) => {
    const data = getDataFromLocalStorage();
    const newListLocalStorage = [...data];
    const indexItemLocalStorage = newListLocalStorage.findIndex(itemTodo => itemTodo.id === item.id);
    newListLocalStorage.splice(indexItemLocalStorage, 1);
    localStorage.setItem('data', JSON.stringify(newListLocalStorage));
    reSearchData();
  };

  
  const doneAllItemChecked = () => {}

  const removeAllItemChecked = () => {
    const data = getDataFromLocalStorage();
    const listTodoDataNotCheck = data.filter(item => !item.isChecked);
    localStorage.setItem('data', JSON.stringify(listTodoDataNotCheck));
    reSearchData();
  }
  
  const isShowActionBuck = todoList.some(item => item.isChecked);

  const renderAction = () => {
    return (
      <Box display='flex' justifyContent='space-between' alignItems='center' position='absolute' bottom="20px" width="100%">
        <Typography variant="subtitle1" gutterBottom component="div" className={classes.title}>
          Bulk Action:
        </Typography>
        <Box display='flex'>
          <Box pr={1}>
            <Button variant="contained" onClick={doneAllItemChecked}>Done</Button>
          </Box>
          <Box pl={1}>
            <Button color='secondary' variant="contained" onClick={removeAllItemChecked}>Remove</Button>
          </Box>
        </Box>
      </Box>
    );
  }

  const renderNoData = () => {
    return (
      <Box display="flex" justifyContent="center" alignItems='center' >
        <Box mr={2}>
          No data
        </Box>
      </Box>
    );
  }

  const renderListTodo = (item, index) => {
    return (
      <Box mb={2} key={index} className={classes.wrapItemTodo}>
        <Box p={2} 
          borderBottom={`${item.isExpand ? '1px solid #ccc': 'unset'}`}
          display='flex' justifyContent="space-between"
        >
          <FormControlLabel 
            control={<Checkbox size="small"
            checked={item.isChecked}
            onChange={() => changCheckedValue(item, index)}/>}
            label={item.title}
          />
          <Box display='flex'>
            <Box pr={1}>
              <Button color='info' variant="contained" onClick={() => onExpandItem(item, index)}>Detail</Button>
            </Box>
            <Box pl={1}>
              <Button color="secondary" variant="contained" onClick={() => onRemoveItem(item)}>Remove</Button>
            </Box>
          </Box>
        </Box>
        {item.isExpand && (
          <Box p={2}  mt={2}>
            <Box mb={2}>
              <TextField
                fullWidth
                placeholder="Title"
                variant="outlined"
                value={item.title}
                onChange={(event) => handleChangeTitle(event, item, index)}
                onFocus={() => updateDataTodoItem(item, index, 'errorTitle', '')}
              />
              <FormHelperText error>{item.errorTitle}</FormHelperText>
            </Box>
            <Box mb={2}>
              <TextareaAutosize
                minRows={10}
                placeholder="Description"
                value={item.description}
                style={{ width: '100%', padding: 10 }}
                onChange={(event) => handleChangeDescription(event, item, index)}
              />
            </Box>
            <Box mb={2} display='flex' justifyContent='space-between'>
              <Box flex='0 0 50%' pr={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due date"
                    defaultValue={item.dueDate}
                    value={item.dueDate}
                    onChange={(newValue) => handleChangeDate(newValue, item, index)}
                    minDate={new Date()}
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
                    value={item.priority}
                    label="Priority"
                    onChange={(event) =>handleChangePriority(event, item, index) }
                  >
                    {PRIORITY.map(item => (
                      <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Button variant="contained" fullWidth onClick={() => handleUpdateDataToLocalStorage(index)}>Update</Button>
          </Box>
        )}
      </Box>
    );
  }
  
  return(
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <Box pt={2} pb={10} sx={{ minHeight: '100vh' }} position='relative'>
        <Typography variant="h5" gutterBottom component="div" className={classes.title}>
          To Do List
        </Typography>
        <Box  mb={2} display='flex' >
          <Box mr={2} flex={1}>
            <TextField
                fullWidth
                placeholder="Search..."
                variant="outlined"
                value={search}
                onChange={handleChangeSearch}
                onKeyPress={onKeyPress}
              />
          </Box>
          <Button variant="contained" endIcon={<AddIcon />} onClick={() => navigate('/todo/create')}>
            Create
          </Button>
        </Box>
          {todoList.length ? todoList.map((item, index) => renderListTodo(item, index)) :  renderNoData()}
          {isShowActionBuck && renderAction()}
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Update Success !"
        />
      </Container>
    </>
  );
};

export default List;