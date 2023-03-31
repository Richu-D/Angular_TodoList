import { Component, OnDestroy, OnInit} from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  text = "";

  todoList:Task[] =[]
  ngOnInit(): void {
     let todoList:Task[] = JSON.parse(localStorage.getItem("todoList")!) 
     if(todoList){
      this.todoList = todoList;
     }
  }
  ngOnDestroy() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
  addTodo(){
    if(this.text.trim()){
      let newTodo:Task = {
        id:Math.floor(Math.random()*100000000),
        task:this.text,
        isFinished:false
      }
      this.todoList.push(newTodo)
      this.text = ""
    }
    this.ngOnDestroy()
  }
  deleteTodo(todoId:number){
    this.todoList = this.todoList.filter((todo)=>{
      if(todo.id===todoId){
        return false;
      }
      return true;
    })
    this.ngOnDestroy()
  }
  editTodo({todoId,task}:{todoId:number,task:string}){
   this.todoList = this.todoList.filter(todo=>{
    if(todo.id === todoId){
      todo.task = task;
    }
    return todo;
   })
   this.ngOnDestroy()
  }
  toggleFinish(todoId:number){
    this.todoList.map(todo=>{
      if(todo.id === todoId){
        todo.isFinished = !todo.isFinished;
      }
      return todo;
    })
    this.ngOnDestroy()
  }
  removeAllFinishedTodo(){
    this.todoList = this.todoList.filter(todo=>{
      if(todo.isFinished==true){
        return false;
      }
      return true;
    })
    this.ngOnDestroy()
  }
  leftTodo(){
    let nonFinished = this.todoList.reduce((count:number,todo:Task)=>{
      if(!todo.isFinished){
        return count = count + 1
      }
      return count;
    },0)
    if(nonFinished){
      return `${nonFinished} item left`
    }
    return `Nothing is left to finish`
  }
}
