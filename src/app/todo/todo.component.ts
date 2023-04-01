import { Component,ElementRef,EventEmitter,Input, Output, ViewChild } from '@angular/core';
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

@ViewChild('editpanal', { static: false }) editpanal: ElementRef<HTMLInputElement>|undefined;

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
enableEdit(){
  this.editing = !this.editing;
  setTimeout(()=>{this.editpanal?.nativeElement.focus()},0)
}
}
