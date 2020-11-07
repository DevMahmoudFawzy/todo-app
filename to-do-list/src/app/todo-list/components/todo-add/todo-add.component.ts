import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { TodoListService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private todoService: TodoListService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  addTodo(todo) {
    this.todoService.addTodo(todo).subscribe(
      (res) => {
        console.log(res);
        this.refresh.emit(true);
        this.modalService.close('custom-modal-1');
      }
    );
  }

}
