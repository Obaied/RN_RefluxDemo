import md5 from 'md5';

export default class Todo {
  constructor(text) {
    this.id         = md5(text.substring(0, 30));
    this.text       = text;
  }

  setFromObject(obj) {
    this.id         = obj.id;
    this.text       = obj.text;
  }

  static fromObject(obj) {
    let todo = new Todo(obj.text);
    todo.setFromObject(obj);
    return todo;
  }
}
