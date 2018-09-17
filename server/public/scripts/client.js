const taskApp = angular.module('TaskApp', []);

taskApp.controller('TaskController', ['$http', function ($http) {
    //declare variables for use throughout controller
    let vm = this;
    vm.tasks = [];
    vm.newTask = {};
    vm.lists = [];
    vm.newList = {};
    vm.currentList = 'All Tasks';
    vm.deleteUI = false;
    vm.todaysDate = new Date;
    //end variables

    //ajax requests to server for task objects
    vm.getTasks = function () {
        $http({
            method: 'GET',
            url: '/tasks',
        }
        ).then(function (response) {
            vm.tasks = response.data;
        }).catch(function (error) {
            alert('Error getting tasks from server.')
        })
    }
    vm.addTask = function () {
        vm.newTask.memberlist = vm.currentList;
        $http.post('/tasks', vm.newTask).then(function (response) {
            console.log(response);
            if (vm.currentList == 'All Tasks') {
                vm.getTasks();
            }
            else {
                vm.getTasksByList();
            }
        }).catch(function (error) {
            alert('Error posting task to database.')
        })
    }
    vm.deleteTask = function (_id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Task successfully deleted.", {
                        icon: "success",
                    });
                    $http({
                        method: 'DELETE',
                        url: '/tasks',
                        params: _id
                    }).then(function (response) {
                        console.log(response);
                        if (vm.currentList == 'All Tasks') {
                            vm.getTasks();
                        }
                        else {
                            vm.getTasksByList();
                        }
                    }).catch(function (error) {
                        alert('Error deleting task from database.')
                    })
                } else {
                    swal("Task has not been deleted.");
                }
            });
    }

    vm.editTask = function (task) {
        if (task.editBool) {
            $http.put('/tasks', task).then(function (response) {
                if (vm.currentList == 'All Tasks') {
                    vm.getTasks();
                }
                else {
                    vm.getTasksByList();
                }
                task.editBool = false;
            }).catch(function (error) {
                alert('Error editing task.')
            })
        }
        else {
            task.editBool = true;
        }
    }

    vm.editCompleted = function (task) {
        $http.put('/tasks', task).then(function (response) {
            console.log(response);
            if (vm.currentList == 'All Tasks') {
                vm.getTasks();
            }
            else {
                vm.getTasksByList();
            }
        }).catch(function (error) {
            alert('Error editing task.')
        })
    }
    //end ajax requests for task objects

    //get requests for tasks using currentList as mongo find param
    vm.getTasksByListButton = function () {
        vm.currentList = event.currentTarget.innerHTML;
        $http({
            method: 'GET',
            url: '/tasks',
            params: { memberlist: vm.currentList }
        }
        ).then(function (response) {
            vm.tasks = response.data;
        }).catch(function (error) {
            alert('Error getting tasks from server.')
        })
    }
    vm.getTasksByList = function () {
        $http({
            method: 'GET',
            url: '/tasks',
            params: { memberlist: vm.currentList }
        }
        ).then(function (response) {
            vm.tasks = response.data;
        }).catch(function (error) {
            alert('Error getting tasks from server.')
        })
    }
    // end get tasks by list

    //ajax requests for list objects
    vm.addList = function () {
        swal({
            text: 'New List',
            content: 'input',
            button: {
                text: 'Submit',
                closemodal: false,
            },
        }).then(function (response) {
            if (response == '') {
                swal('New list name cannot be empty.');
            }
            else if (response.length > 15) {
                swal('List names must be shorter than 15 characters.');
            }
            else if (vm.lists.length > 6) {
                swal('You cannot have more than 7 user created lists.');
            }
            else {
                vm.newList.name = response;
                $http.post('/lists', vm.newList).then(function (response) {
                    console.log(response);
                    vm.getLists();
                }).catch(function (error) {
                    alert('Error posting list to database.')
                })
            }
        })

    }

    vm.getLists = function () {
        $http.get('/lists').then(function (response) {
            vm.lists = response.data;
        }).catch(function (error) {
            alert('Error getting lists from server.')
        })
    }

    vm.deleteList = function () {
        let listToDelete = event.currentTarget.innerHTML;
        $http({
            method: 'DELETE',
            url: '/lists',
            params: { name: listToDelete }
        }).then(function (response) {
            $http({
                method: 'DELETE',
                url: '/tasks/listdelete',
                params: { memberlist: listToDelete }
            }).then(function (response) {
                console.log(response);
                vm.deleteUI = false;
                vm.getLists();
                vm.getTasks();
                vm.currentList = 'All Tasks';
            }).catch(function (error) {
                alert('Error deleting tasks from database.')
            })
        }).catch(function (error) {
            alert('Error deleting list from database.')
        })
    }
    //end list ajax requests

    //show the button to delete a list
    vm.toggleDeleteUI = function () {
        vm.deleteUI = !vm.deleteUI;
    }

    //compare dates to see if due date is passed already
    vm.compareDates = function (taskDueDate) {
        let taskDate = new Date(taskDueDate);
        if (taskDate.getTime() < vm.todaysDate.getTime()) {
            return true;
        }
        else {
            return false;
        }
    }

    //compare dates with the purpose of determining if they match
    vm.alsoCompareDates = function (taskDueDate) {
        let taskDate = new Date(taskDueDate);
        if (taskDate.getFullYear() == vm.todaysDate.getFullYear()) {
            if (taskDate.getMonth() == vm.todaysDate.getMonth()) {
                if (taskDate.getDate() == vm.todaysDate.getDate()) {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }

    //checks if current tab is 'All Tasks'
    vm.allTasksChecker = function () {
        if (vm.currentList == 'All Tasks') {
            return true;
        }
        else {
            return false;
        }
    }

    //give current selected tab an active class
    vm.changeActiveTab = function () {
        console.log('in change active');
        tablinks = document.getElementsByClassName("tabButton");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
            console.log('in loop')
        }
        event.currentTarget.className += " active";

    }

    //long and complicated sweet alert function to take and validate new task input
    vm.sweetAlert = function () {
        swal({
            text: 'Set Task',
            content: 'input',
            button: {
                text: 'Next',
                closemodal: false,
            },
        }).then(function (response) {
            if (response != '') {
                vm.newTask.task = response;
                swal({
                    text: 'Set Due Date',
                    content: 'input',
                    button: {
                        text: 'Next',
                        closemodal: false,
                    }
                }).then(function (response) {
                    if (response != '') {
                        vm.newTask.due = response;
                        swal({
                            text: 'Set a Category',
                            content: 'input',
                            button: {
                                text: 'Submit',
                                closemodal: false,
                            }
                        }).then(function (response) {
                            if (response != '') {
                                vm.newTask.category = response;
                                vm.addTask();
                            }
                            else {
                                swal('Category input is required.');
                            }
                        })
                    }
                    else {
                        swal('Date input is required');
                    }
                })
            }
            else {
                swal('Task input is required');
            }
        })
    }

    //getting variables from DB on page load
    vm.getLists();
    vm.getTasks();
}])