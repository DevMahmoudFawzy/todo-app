import { NgModule } from '@angular/core';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListService } from './services/todo-list.service';

import { SharedModule } from '../shared/modules/shared.module';
import { TodoAddComponent } from './components/todo-add/todo-add.component';


@NgModule({
  declarations: [TodoListComponent, TodoAddComponent],
  imports: [
    SharedModule,
    TodoListRoutingModule
  ],
  providers: [TodoListService]
})
export class TodoListModule { }
