import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TodosService } from '../../services/todos-service.service';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input('todo') todoProps: TodoInterface;
  editingText: string;
  @ViewChild('textInput') textInput: ElementRef;

  constructor(private TodosService: TodosService) {}

  removeTodo(): void {
    this.TodosService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.TodosService.toggleIsComplete(this.todoProps.id);
  }

  setTodoInEditMode(): void {
    this.TodosService.setEditModeOn(this.todoProps.id);
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    }, 0);
    this.editingText = this.todoProps.text;
  }

  changeTodo(): void {
    this.TodosService.saveEditedTodo(this.todoProps.id, this.editingText);
    this.editingText = '';
  }
}
