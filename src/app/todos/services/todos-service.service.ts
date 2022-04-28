import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<TodoInterface[]>([]);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: uuid(),
      isEditing: false,
    };
    this.todos$.next([...this.todos$.getValue(), newTodo]);
  }

  addTodoBulk(todos: TodoInterface[]): void {
    this.todos$.next(todos);
  }

  removeTodo(id: string): void {
    this.todos$.next(this.todos$.getValue().filter((todo) => todo.id !== id));
  }

  toggleIsComplete(id: string): void {
    const x = this.todos$.getValue();
    x.filter((todo) => todo.id === id)[0].isCompleted = !x.filter(
      (todo) => todo.id === id
    )[0].isCompleted;
    this.todos$.next(x);
  }

  toggleAll(checkAll: boolean): void {
    this.todos$.next(
      this.todos$.getValue().map((todo) => ({
        ...todo,
        isCompleted: checkAll,
      }))
    );
  }

  setEditModeOn(id: string): void {
    const x = this.todos$.getValue();
    x.filter((todo) => todo.id === id)[0].isEditing = true;
    this.todos$.next(x);
  }

  setEditModeOff(id: string): void {
    const x = this.todos$.getValue();
    x.filter((todo) => todo.id === id)[0].isEditing = false;
    this.todos$.next(x);
  }

  saveEditedTodo(id: string, newTodoValue: string): void {
    const x = this.todos$.getValue();
    x.filter((todo) => todo.id === id)[0].text = newTodoValue;
    this.todos$.next(x);
    this.setEditModeOff(id);
  }
}
