import { Component, OnInit } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { TodosService } from '../../services/todos-service.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  AllTodos: Observable<TodoInterface[]>;
  areAllTodosSelected$: Observable<boolean>;

  constructor(private TodosService: TodosService) {
    this.AllTodos = this.TodosService.todos$;
    this.areAllTodosSelected$ = this.TodosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
  }

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) this.TodosService.addTodoBulk(JSON.parse(savedTodos));
    this.TodosService.todos$.subscribe((e) => {
      if (e.length >= 0) localStorage.setItem('todos', JSON.stringify(e));
    });
  }

  toggleAllTodos(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.TodosService.toggleAll(target.checked);
  }
}
