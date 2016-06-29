'use strict';

import { 
  AsyncStorage 
} from 'react-native';

import Reflux from 'reflux';
import TodoActions from './actions';
import Todo from './Todo';

const TODO_KEY = '@RefluxDemo:key';

var todoStore = Reflux.createStore({
  init() {
    this._todos = [];
    this._loadTodos().done();

    this.listenTo(TodoActions.createTodo, this.createTodo);
    this.listenTo(TodoActions.clearAllTodos, this.clearAllTodos);
  },

  async _loadTodos() {
    try {
      var val = await AsyncStorage.getItem(TODO_KEY);
      if (val === null) {
        console.info(`${TODO_KEY} not found on disk`)
        return;
      }

      this._todos = JSON.parse(val)
        .map((todoObj) => {
          return Todo.fromObject(todoObj);
        });
        this.emit();
    } catch (error) {
      console.error(`AsyncStorage error: ${error.message}`);
    }
  },

  async _writeTodos() {
    try {
      await AsyncStorage.setItem(TODO_KEY, JSON.stringify(this._todos));
    } catch (error) {
      console.error(`AsyncStorage error: ${error.message}`);
    }
  },

  clearAllTodos() {
    this._todos = [];
    this.emit();
  },

  emit() {
    this._writeTodos().done();
    this.trigger(this._todos);
  },

  //#2
  createTodo(todo) {
    this._todos.push(todo);
    this.emit();
  }
});

module.exports = todoStore;
