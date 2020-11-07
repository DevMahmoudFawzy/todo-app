import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoListService {

    constructor(
        private http: HttpClient
    ) { }

    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${environment.apiURL}/todo`);
    }

    addTodo(todoText): Observable<Todo> {
        return this.http.post<Todo>(`${environment.apiURL}/todo`, { id: 0, content: todoText, checked: false });
    }

    updateTodo(todoId, newTodo): Observable<Todo> {
        return this.http.put<Todo>(`${environment.apiURL}/todo/${todoId}`, newTodo);
    }

    deleteTodo(todoId): Observable<any> {
        return this.http.delete(`${environment.apiURL}/todo/${todoId}`);
    }
}
