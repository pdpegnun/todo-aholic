// todoController
angular.module('todoController', [])

// inject the Todo service factory into our controller
.controller('mainController', ['$scope', '$http', 'Todos', function ($scope, $http, Todo) {
    $scope.formData = {};
    $scope.loading = true;

    // Cuando se cargue la página, pide del API todos los TODOs
    Todo.get()
        .success(function (data) {
            $scope.loading = false;
            $scope.todos = data;
//            console.log(data)
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function () {
        if ($scope.formData.text != undefined) {
            $scope.loading = true;
            Todo.create($scope.formData)
                .success(function (data) {
                    $scope.loading = false;
                    $scope.formData = {};
                    $scope.todos = data;
//                    console.log(data)
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }else{
            alert('Por favor, escriba una tarea primero.');
        }
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.deleteTodo = function (id) {
        $scope.loading = true;
        Todo.delete(id)
            .success(function (data) {
                $scope.loading = false;
                $scope.todos = data;
//                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };
    }])