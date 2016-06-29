'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableHighlight
} from 'react-native';

import TodoModel from './Todo';
import TodoActions from './actions';
import TodoStore from './TodoStore';
import Reflux from 'reflux';

class RefluxDemo extends Component {

  constructor(props){
    super(props);

    this._onChangeText  = this._onChangeText.bind(this);
    this._onSubmit      = this._onSubmit.bind(this);
    this._onTodosChange = this._onTodosChange.bind(this);

    this.state = {
      text: '',
      todos: []
    };
  }

  //#3
  _onTodosChange(todos) {
    this.setState({todos});
  }

  componentDidMount() {
    this.unsubscribe = TodoStore.listen(this._onTodosChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onChangeText(text) {
    this.setState({text});
  }

  _onSubmit() {
    let todo = new TodoModel(this.state.text);

    //#1
    TodoActions.createTodo(todo);

    Alert.alert(
      'Reflux Demo',
      "Todo Accepted",
      [
        {text: 'OK', onPress: () => { }}
      ]
    )
  }

  _onClear() {
    TodoActions.clearAllTodos();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textField}
          onChangeText={this._onChangeText}>
        </TextInput>

        <Text>{' '}</Text>
        <Text>{' '}</Text>

        <TouchableHighlight
          onPress={this._onSubmit}>
          <Text>{'Submit Todo'}</Text>
        </TouchableHighlight>

        <Text>{' '}</Text>
        <Text>{' '}</Text>

        <TouchableHighlight
          onPress={this._onClear}>
          <Text>{'Clear Todos'}</Text>
        </TouchableHighlight>

        <Text>{' '}</Text>
        <Text>{' '}</Text>
        <Text>{' '}</Text>
        <Text>{' '}</Text>

        <Text>{`Length of saved todos: ${this.state.todos.length}`}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textField: {
    backgroundColor: 'tan',
    height: 60
  },
});

AppRegistry.registerComponent('RefluxDemo', () => RefluxDemo);
