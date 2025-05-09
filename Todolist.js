const prompt = require("prompt-sync")();

let todos=[];




function ViewTask()
{
    if (todos.length==0)
    {
        console.log("Your Todo List is Empty!");
    }
    else
     console.log(todos);
}
function AddTask()
{
   let task=prompt("Enter the task ")
   todos.push(task)
   console.log(todos)
   
}
function deleteTask()
{
    if(todos.length==0){
        console.log("Todos List is Empty")
        return;
    }
    let del =parseInt(prompt("Enter the task number you want to delete "))
          for (let i in todos){
            if(parseInt(i)===del){
                todos.splice(i,1)
                console.log("Task Deleted")
                break;
            }

          }
   
}
let check=true
while(check){
console.log("\n==== TO-DO LIST MENU ====");
console.log("1. View Tasks");
console.log("2. Add Task");
console.log("3. Delete Task");
console.log("4. Exit");
let choice=parseInt(prompt("Enter Your Choice "))
switch(choice){
    case 1:
        ViewTask();
        break;
    case 2:
        AddTask();
        break;
    case 3:
        deleteTask();
        break;
    case 4:
          console.log("Exiting the To-do List. Goodbye!");
          check=false;
          break;
    default:
        console.log("Invalid Input! Try Again.")
}
}
