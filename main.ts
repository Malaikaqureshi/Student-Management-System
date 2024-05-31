#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


//Define the Student Class
class Student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 100

    }

    //Method to enroll a student in a course
    enroll_course(course: string){
        this.courses.push(course);
    }

    //Method to view a Student Balance
    view_blance(){
        console.log(chalk.green(`Balance for ${this.name} : ${this.balance}`));
    }

    //Method to pay Student Fee
    pay_fee(amount: number){
        this.balance -= amount;
        console.log(chalk.green(`$${amount} Fee paid successfully for ${this.name}`));
        console.log(chalk.green(`Remaining Balance : $${this.balance}`));

    }

    //Method to display Student Status
    show_status(){
        console.log(chalk.magenta(`ID: ${this.id}`));
        console.log(chalk.magenta(`Name: ${this.name}`));
        console.log(chalk.magenta(`Courses: ${this.courses}`));
        console.log(chalk.magenta(`Balance: ${this.balance}`));
    }


}

//Defining a Student-Manager Class to manage Students
class Student_manager {
    students: Student[]

    constructor(){
        this.students = [];
    }

    //Method to add a new student
    add_student(name: string){
       let student = new Student(name);
       this.students.push(student);
       console.log(chalk.green(`Student: ${name} added successfully.Student ID: ${student.id}`));



    }

    //Method to enroll a Student in a course
    enroll_student(student_id: number, course: string){
        let student = this.find_student(student_id);
        if (student){
            student.enroll_course(course);
            console.log(chalk.green(`${student.name} enrolled in ${course} sucessfully`));

        }

    }

    //Method to view Student Balance
    view_student_balance(student_id: number){
        let student = this.find_student(student_id);
        if(student){
            student.view_blance()
        }
        else{
            console.log(chalk.red("Student not found.Please enter a correct Student ID"));
        }
        
    }

    // Method to find a student by student id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
        
    }

    //Method to pay Student fee
    pay_student_fee(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if(student){
            student.pay_fee(amount);
        }
        else{
            console.log(chalk.red("Student not found.Please enter a correct student ID"));
        }
       

    }

    //Method to display student status
    show_student_status(student_id: number){
      let student = this.find_student(student_id);
      if(student){
        student.show_status();

      }


    }
}

//Main function to run the program
async function main(){
    console.log(chalk.bold.blueBright("\n \t Welcome to 'CodeWithMalaika' - Student Management System\n\t"));
    console.log("-".repeat(60));


    let student_manager = new Student_manager();

    //While loop to keep program running
    while(true){

        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fee",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        //Using Switch case to handle user choice

        switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;


            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name:"student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;


               
           case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;


            case "Pay Fee":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                      
                    },
                    {
                        name: "amount",
                        type: "number",
                        mesage: "Enter the amount to pay"
                    }
                ]);
                student_manager.pay_student_fee(fee_input.student_id, fee_input.amount);
                break;

            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
                
            case "Exit":
                console.log(chalk.red("Exiting..."));
                process.exit()  
  
        }
        
    }
}

//Calling a main function
main();