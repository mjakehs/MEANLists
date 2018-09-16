const taskApp = angular.module('TaskApp', []);

taskApp.controller('TaskController', ['$http', function ($http) {
    let vm = this;
    vm.tasks = [];
    vm.newTask = {};
    vm.lists = [];
    vm.newList = {};
    vm.currentList = 'All Tasks';
    vm.deleteUI = false;
    vm.todaysDate = new Date;

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

    vm.getLists = function () {
        $http.get('/lists').then(function (response) {
            vm.lists = response.data;
        }).catch(function (error) {
            alert('Error getting lists from server.')
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
    vm.editCompleted = function (task) {
        $http.put('/tasks', task).then(function (response) {
            console.log(response);
            if (currentList = 'All Tasks') {
                vm.getTasks();
            }
            else {
                vm.getTasksByList();
            }
        }).catch(function (error) {
            alert('Error editing task.')
        })
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
vm.getTasks();

vm.sweetAlert = function () {
    swal({
        text: 'Set Task',
        content: 'input',
        button: {
            text: 'Next',
            closemodal: false,
        },
    }).then(function (response) {
        vm.newTask.task = response;
        swal({
            text: 'Set Due Date',
            content: 'input',
            button: {
                text: 'Next',
                closemodal: false,
            }
        }).then(function (response) {
            vm.newTask.due = response;
            swal({
                text: 'Set a Category',
                content: 'input',
                button: {
                    text: 'Submit',
                    closemodal: false,
                }
            }).then(function (response) {
                vm.newTask.category = response;
                vm.addTask();
            })
        })
    })
}
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
            return
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

vm.openDeleteUI = function () {
    vm.deleteUI = true;
}

vm.compareDates = function (taskDueDate) {
    let taskDate = new Date(taskDueDate);
    if (taskDate.getTime() < vm.todaysDate.getTime()) {
        return true;
    }
    else {
        return false;
    }
}

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
vm.getLists();
}])