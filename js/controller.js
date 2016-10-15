  (function(angular) {
    // 获取 TodoApp 模块，给该模块添加控制器
    var app = angular.module('TodoApp')

    app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
      $scope.title = '任务列表'
      $scope.text = ''
      $scope.todoFilter = {}
      $scope.todos = [
        { id: 1, text: '吃饭', completed: false },
        { id: 2, text: '睡觉', completed: false },
        { id: 3, text: '打豆豆', completed: true },
        { id: 4, text: '写代码', completed: false },
        { id: 5, text: '约会', completed: true },
        { id: 6, text: 'hello world', completed: true }
      ]

      // 使用 ng 之后，写代码就只需要关注你的业务就可以了
      $scope.remove = function(id) {
        // 根据id找到其在数组中的索引
        // forEach some every
        var index = -1

        // some 方法，只要其中一个遍历执行函数返回 true，some 直接调用结束
        $scope.todos.some(function(todo, i) {
          if (todo.id === id) {
            index = i
            return true
          }
          // 函数如果不 return ，会返回 undefined，也就是 false，所以如果上面的条件不匹配
          // some 函数就会继续遍历下一个元素
        })

        if (index === -1) {
          return $window.alert('该项不存在')
        }

        // 根据索引从数组中删除具体的元素
        $scope.todos.splice(index, 1)
      }

      $scope.clearAllCompleted = function() {
        // 千万不要在遍历数组的过程去删除，代码有问题
        // $scope.todos.forEach(function(todo, index) {
        //   if (todo.completed) {
        //     $scope.todos.splice(index, 1)
        //   }
        // })

        // 将你需要的数据筛选出来
        var unCompleteds = []
        $scope.todos.forEach(function(todo, index) {
          if (!todo.completed) {
            unCompleteds.push(todo)
          }
        })

        // 给原数组重新赋值即可
        $scope.todos = unCompleteds

      }

      $scope.save = function() {
        if ($scope.text.trim().length === 0) {
          return
        }
        var maxId = 0
        $scope.todos.forEach(function(todo) {
          if (todo.id > maxId) {
            maxId = todo.id
          }
        })
        var todo = {
          id: ++maxId,
          text: $scope.text,
          completed: false
        }
        $scope.todos.push(todo)
        $scope.text = ''
      }
    }])

  })(angular)
