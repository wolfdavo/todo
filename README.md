# Welcome to Task App

## Setup Instructions

### Step 1 - Populate information about *you*

In the info folder, you will find 3 .txt files. Fill them out with the information described in the title in whatever format you'd like.

### Step 2 - Download Dependencies

Open a terminal window to this folder, and run ```npm i```
This will install the deps needed for the app.

### Step 3 - Run the app

To run the app, simply type ```npm run start``` in a terminal at this folders location.

</br>

## Usage

This app is designed to be a super simple, optimized to-do list that does smart auto-prioritizing for you. It will keep 10 auto-generated task suggestions in your backlog all the time so you never run out of things to do. If a task is AI generated, it will have a ✨.

### Adding a todo

When something pops up that you need to get done, just type ```/todo I need to get my emails done or something similar in here``` while the app is running and it will add it to you backlog of tasks.

### Getting Current Task

This app is designed to give you one, most important task at a time. To see the current task, use the ```/current``` command.

### Marking current task as complete

When you are done with the current task, type ```/done``` to mark it as complete and get the next one.

### View task backlog

If you'd like to see all the tasks you have in the queue, with their priority scores, use the ```/backlog``` command.

</br>

## All Commands

```/todo [task description: string]``` -- Add new task to backlog

```/current``` -- Get current task

```/done``` -- Mark current task as complete

```/backlog``` -- Print the full backlog of todos

```/skip``` -- Skip the current task but keep it in the backlog

```/donow``` -- Select a task from the backlog to do now (overrides current task)

```/day``` -- Logs a nice readout of the tasks you did today

```/score``` -- Prints out your score

```/inspire``` -- A personalized inspirational message

```/delete``` -- Select tasks from backlog to delete
