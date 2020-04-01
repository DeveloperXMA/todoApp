import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DeleteIcon from '@material-ui/icons/Delete';
import { Switch } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

export default class addTodo extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      todos: [],
      newTodo: "",
      textSet: new Set()
    };
  }

  componentDidMount() {
    // const todos = localStorage.getItem('todos');
    // console.log(todos)
    // if (todos !== null && todos.length > 0) {
    //   this.setState({
    //     todos
    //   })
    // }
    let localTodos = JSON.parse(localStorage.getItem('todos'));
    if (localTodos !== null || localTodos.length > 0) {
      this.setState({
        todos: localTodos
      })
    }
  }
  
  setNewToDo = (e) => {
    this.setState({
      newTodo: e.target.value
    })
  }

  addTodoItem = (e) => {
    e.preventDefault();
    // It will prevent the user from clicking the input box multiple times

    if (this.state.newTodo === "" || this.state.textSet.has(this.state.newTodo)) {
      return;
    }

    this.setState({
      todos: [
        ...this.state.todos,
        {
          text: this.state.newTodo,
          isCompleted: false
        }
      ]
    })
    this.state.textSet.add(this.state.newTodo)
  }

  toggleTodo = (el) => {
    let newTodo = [];
    this.state.todos.map((item) => {
      if (item.text !== el.text) {
        newTodo.push(item);    
      } else {
        item.isCompleted = !item.isCompleted;
        newTodo.push(item);
      }
    })
    this.setState({
      todos: newTodo
    })
  }

  deleteTodo = (item) => {
    const newTodos = this.state.todos.filter((todo) => {
      if (todo.text !== item.text) return todo;
    })
    this.setState({
      todos: newTodos
    })
  }

  saveToLocal = () => {
    console.log(this.state.todos)
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  render() {
    return (
      <>
      <form noValidate autoComplete="off">
        <Grid 
          container
          justify="space-around"
          direction="row"
          alignItems="flex-end">
          <Grid item xs={8}>
            <TextField fullWidth id="todoItem" label="todoItem" value={this.state.newTodo} onBlur={this.setNewToDo} onChange={this.setNewToDo}/>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={this.addTodoItem}>
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </form>
      <List subheader={<ListSubheader>Your Action Items</ListSubheader>} className="list-root">
        {this.state.todos.map((item, index) => {
          return (
            <ListItem key={item.text}>
              <ListItemIcon>
                <DeleteIcon onClick={() => this.deleteTodo(item)} />
              </ListItemIcon>
              <ListItemText id={item.text} primary={item.text} className={item.isCompleted? 'finish' : 'ongoing'}></ListItemText>
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={() => this.toggleTodo(item)}
                  checked={item.isCompleted}
                >
                </Switch>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={this.saveToLocal}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      </>
    )
  }
}