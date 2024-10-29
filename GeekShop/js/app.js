// Definimos el módulo principal de AngularJS
var app = angular.module("GeekShopApp", []);

// Definimos un controlador para manejar los datos y funciones
app.controller("MainController", function($scope) {
  // Inicializamos variables con la directiva ng-init
  $scope.greeting = "¡Bienvenido a nuestra página!";

  // Lista de ejemplos para un formulario
  $scope.usuarios = [
    { nombre: "Carlos", email: "carlos@example.com" },
    { nombre: "Ana", email: "ana@example.com" }
  ];

  // Variable para manejar los datos del formulario de inicio de sesión
  $scope.loginData = {
    username: '',
    password: ''
  };

  // Función de inicio de sesión (aún sin backend, solo para mostrar cómo funcionaría)
  $scope.login = function() {
    if ($scope.loginForm.$valid) {
      alert("Inicio de sesión exitoso para: " + $scope.loginData.username);
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  };

  // Variable para manejar el formulario de registro
  $scope.registerData = {
    username: '',
    email: '',
    password: ''
  };

  // Función para manejar el registro
  $scope.register = function() {
    if ($scope.registerForm.$valid) {
      alert("Usuario registrado: " + $scope.registerData.username);
      $scope.usuarios.push({nombre: $scope.registerData.username, email: $scope.registerData.email});
      $scope.registerData = {}; // Limpiar los campos del formulario después del registro
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  };

  // Caja de comentarios (solo interfaz gráfica)
  $scope.comentario = "";
  $scope.comentarios = [];
  $scope.agregarComentario = function() {
    if ($scope.commentForm.$valid) {
      $scope.comentarios.push($scope.comentario);
      $scope.comentario = ""; // Limpiar el campo de texto
    }
  };
});
