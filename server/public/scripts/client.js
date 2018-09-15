const taskApp = angular.module('TaskApp', []);

taskApp.controller('TaskController', ['$http', function ($http) {
    let vm = this;
    vm.tasks = [];
    vm.newTask = {};
    vm.lists = [];
    vm.newList = {};

    vm.getTasks = function () {
        $http.get('/tasks').then(function (response) {
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
        $http.post('/tasks', vm.newTask).then(function (response) {
            console.log(response);
            vm.getTasks();
        }).catch(function (error) {
            alert('Error posting task to database.')
        })
    }

    vm.deleteTask = function (_id) {
        $http({
            method: 'DELETE',
            url: '/tasks',
            params: _id
        }).then(function (response) {
            console.log(response);
            vm.getTasks();
        }).catch(function (error) {
            alert('Error deleting task from database.')
        })
    }
    vm.editCompleted = function (task) {
        $http.put('/tasks', task).then(function (response) {
            console.log(response);
            vm.getTasks();
        }).catch(function (error) {
            alert('Error editing task.')
        })
    }
    vm.editTask = function (task) {
        if (task.editBool) {
            $http.put('/tasks', task).then(function (response) {
                console.log(response);
                vm.getTasks();
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
            vm.newList.name = response;
            $http.post('/lists', vm.newList).then(function (response) {
                console.log(response);
                vm.getLists();
            }).catch(function (error) {
                alert('Error posting list to database.')
            })
        })
    }
    vm.getLists();
}])