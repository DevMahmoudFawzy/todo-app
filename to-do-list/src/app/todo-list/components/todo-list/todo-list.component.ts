import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { TodoListService } from '../../services/todo-list.service';
import { Todo } from '../../models/todo.model';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  date: any = {};
  currentEdit = -1;
  originalValue = '';
  editedValue = '';

  constructor(
    private todoService: TodoListService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getAllTodos().subscribe(
      (data: any) => {
        this.todos = data.todos;
        this.date.dayNumber = data.date.dayNumber;
        this.date.month = data.date.month;
        this.date.year = data.date.year;
        this.date.dayName = data.date.dayName;
      }
    );
  }

  checkTodo(todoId) {
    const selectedTodoIndex = this.todos.findIndex(t => t.id == todoId);
    if (selectedTodoIndex === -1) {
      return;
    }
    this.todos[selectedTodoIndex].checked = !this.todos[selectedTodoIndex].checked;
    this.todoService.updateTodo(todoId, this.todos[selectedTodoIndex]).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  onEditTodo(content, id) {
    this.currentEdit = id;
    this.originalValue = content;
    this.editedValue = content;
  }

  cancelEdit() {
    this.currentEdit = -1;
    this.editedValue = '';
  }

  onUpdate(id, checked) {
    this.currentEdit = -1;

    this.todoService.updateTodo(id, { content: this.editedValue, checked }).subscribe(
      (res) => {
        this.getTodos();
      }
    );
  }

  deleteTodo(todoId) {
    this.todoService.deleteTodo(todoId).subscribe(
      (res) => {
        console.log(res);
        this.getTodos();
      }
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
