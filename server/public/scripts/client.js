const taskApp = angular.module('TaskApp', []);

taskApp.controller('TaskController', ['$http', function($http){
    let vm = this;
    vm.tasks = [];
    vm.newTask = {};

    vm.getTasks = function(){
        $http.get('/tasks').then( function(response) {
            vm.tasks = response.data;
        }).catch(function(error){
            alert('Error getting tasks from server.')
        })  
    }

    vm.addTask = function(){
        $http.post('/tasks', vm.newTask).then( function(response) {
            console.log(response);
            vm.getTasks();
        }).catch(function(error){
            alert('Error posting task to database.')
        })  
    }

    vm.deleteTask = function(_id){
        $http({
            method: 'DELETE',
            url: '/tasks', 
            params: _id
        }).then( function(response) {
            console.log(response);
            vm.getTasks();
        }).catch(function(error){
            alert('Error deleting task from database.')
        })  
    }

    vm.editTask = function(task){
        if (task.editBool){
            $http.put('/tasks', task).then( function(response) {
                console.log(response);
                vm.getTasks();
                task.editBool = false;
            }).catch(function(error){
                alert('Error editing task.')
            })  
        }
        else {
            task.editBool = true;
        }
    }

    vm.getTasks();
}])