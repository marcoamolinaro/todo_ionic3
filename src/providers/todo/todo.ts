import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private todos = [];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  getTodos() {
    return this.todos;
  }

  getArchivedTodos() {
    return this.archivedTodos;
  }

  addTodo(todo: any) {
    this.todos.push(todo);
  }

  editTodo(todo: any, todoIndex: any) {
    this.todos[todoIndex] = todo;
  }

  archiveTodo(todoIndex: any) {
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    this.archivedTodos.push(todoToBeArchived);
  }
}
