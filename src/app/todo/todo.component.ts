import { Component,EventEmitter,Input, Output } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
@Input() todo!:Task;
@Output() toggleFinish = new EventEmitter()
@Output() deleteTodo = new EventEmitter()
@Output() editTodo = new EventEmitter()
editing:boolean = false
constructor(){}

onCheckboxChange(todoId:number) {
 this.toggleFinish.emit(todoId)
}

delete(todoId:number){
  this.deleteTodo.emit(todoId)
}
edit(todoId:number,task:string){
  this.editTodo.emit({todoId,task})
  this.editing = false;
}
}
