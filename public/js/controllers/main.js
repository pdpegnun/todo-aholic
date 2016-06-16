// todoController
angular.module('todoController', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.loading = true;

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/todos')
        .success(function (data) {
            $scope.loading = false;
            $scope.todos = data;
            console.log(data)
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function () {
        if ($scope.formData.text != undefined) {
            $scope.loading = true;
            $http.post('/api/todos', $scope.formData)
                .success(function (data) {
                    $scope.loading = false;
                    $scope.formData = {};
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error:' + data);
                });
        }else{
            alert("Por favor escriba una tarea primero.")
        }
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.deleteTodo = function (id) {
        $scope.loading = true;
        $http.delete('/api/todos/' + id)
            .success(function (data) {
                $scope.loading = false;
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };
}