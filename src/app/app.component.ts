import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo';
import { DataService } from './services/data.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChildren('list_of_todos') list_of_todos!: QueryList<ElementRef>;
  @ViewChildren('list_of_todo_titles')
  list_of_todo_titles!: QueryList<ElementRef>;

  is_editing = false;
  editing_index = -1;

  todo_list: any[] = [];

  todo_form: any = FormGroup;

  constructor(private fb: FormBuilder, private data_service: DataService) {}

  ngOnInit() {
    this.todo_form = this.fb.group({
      id: ['', []],
      title: [{ value: '', disabled: false }, [Validators.required]],
    });

    this.data_service
      .getTodos()
      .pipe(take(1))
      .subscribe((value) => {
        Object.values(value).forEach((todo) => this.todo_list.push(todo));
        console.log('Retrieved todo list from database');
      });
  }

  addTodos() {
    this.data_service.addTodo(this.todo_form.value);

    this.todo_list.push(this.todo_form.value);
    this.todo_form.reset();
  }

  getTodos() {
    // this.data_service.getTodos().subscribe((response) => console.log(response));
  }

  editTodo(i: number) {
    /* reset all fields to uneditable */
    for (let j = 0; j < this.list_of_todos.length; j++) {
      this.list_of_todos.get(j)!.nativeElement.contentEditable = false;
    }
    this.list_of_todos.get(i)!.nativeElement.contentEditable = true;
    this.editing_index = i;
    this.is_editing = true;
  }

  deleteTodo(i: number) {
    this.todo_list.splice(i, 1);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.is_editing === true) {
      /* new value */
      console.log(
        this.list_of_todo_titles.get(this.editing_index)!.nativeElement
          .innerText
      );

      /* reset all fields and set to uneditable */
      this.list_of_todos.get(
        this.editing_index
      )!.nativeElement.contentEditable = false;
      this.is_editing = false;
      this.editing_index = -1;
    }
  }
}
