import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // constructor(private afs: AngularFirestore) {}
  // /* add todo */
  // addTodo(todo: Todo) {
  //   todo.id = this.afs.createId();
  //   return this.afs.collection('/todos').add(todo);
  // }
  // /* get all todos */
  // getTodos() {
  //   return this.afs.collection('/todos').snapshotChanges();
  // }
  // /* delete todo */
  // deleteTodo(todo: Todo) {
  //   return this.afs.doc('/todos/' + todo.id).delete();
  // }
  // /* update todo */
  // updateTodo(todo: Todo) {
  //   this.deleteTodo(todo);
  //   this.addTodo(todo);
  // }

  db_link =
    'https://todo-57587-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json';

  constructor(private https_client: HttpClient) {
    this.getTodos();
  }

  addTodo(todo: Todo) {
    todo.id = todo.title.replace(' ', '-');
    this.https_client
      .post(this.db_link, todo)
      .subscribe((response) => console.log(response));
  }

  getTodos() {
    return this.https_client.get(this.db_link);
  }
}
