import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  /* add todo */
  addTodo(todo: Todo) {
    todo.id = this.afs.createId();
    return this.afs.collection('/todos').add(todo);
  }

  /* get all todos */
  getTodos() {
    return this.afs.collection('/todos').snapshotChanges();
  }

  /* delete todo */
  deleteTodo(todo: Todo) {
    return this.afs.doc('/todos/' + todo.id).delete();
  }

  /* update todo */
  updateTodo(todo: Todo) {
    this.deleteTodo(todo);
    this.addTodo(todo);
  }
}
