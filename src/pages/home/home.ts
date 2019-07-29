import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../../pages/archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  reorderIsEnabled = false;

  constructor(private toastTodoCtrl: ToastController, private todoProvider: TodoProvider, public navCtrl: NavController, public alertController: AlertController) {
    this.todos = this.todoProvider.getTodos();
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event: any) {
    reorderArray(this.todos, $event);
  }

  gotoArchivePage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  archiveTodo(todoIndex: any) {
    this.todoProvider.archiveTodo(todoIndex);
  }

  openTodoAlert() {
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter your todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData)=> {
            let todoText: any;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);

            addTodoAlert.onDidDismiss(() => {
              let addTodoToast = this.toastTodoCtrl.create({
                message: "Added Todo",
                duration: 2000
              });
              addTodoToast.present();
            });
          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
