import { Component } from '@angular/core';
import { TodosService } from '../../services/todos-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  text: string = '';

  constructor(private TodosService: TodosService) {}

  addTodo(): void {
    if (this.text.trim().length === 0) return;
    this.TodosService.addTodo(this.text);
    this.text = '';
  }
}
