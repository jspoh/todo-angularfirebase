import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  todo_list = [
    {
      id: '1',
      title: 'Dummy data 1',
    },
    {
      id: '2',
      title: 'Dummy data 2',
    },
  ];

  todo_form: any = FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.todo_form = this.fb.group({
      title: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.todo_form.value);

    this.todo_list.push(this.todo_form.value);
    this.todo_form.reset();
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
