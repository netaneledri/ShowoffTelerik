var app = angular.module('showoff',['ionic']);

app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('welcome',{
    	url : '/',
        templateUrl : 'views/welcome.html'
    }).state('feed',{
    	url : '/feed',
        templateUrl : 'views/feed.html'
    }).state('profile_basic',{
    	url : '/profile/basic',
        templateUrl : 'views/profile/basic.html'
    });
    
	
    $urlRouterProvider.otherwise('/');
});

/** Factories & Services **/
app.factory('Reddit', function($http) {
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
    $http.jsonp(url).success(function(data) {
      var items = data.data.children;
      for (var i = 0; i < items.length; i++) {
        this.items.push(items[i].data);
      }
      this.after = "t3_" + this.items[this.items.length - 1].id;
      this.busy = false;
    }.bind(this));
  };

  return Reddit;
});


/** Controllers **/

app.controller('MainController',function($scope,$state){
    $scope.shouldLeftSideMenuBeEnabled = function(){
    	return $state.current.url != '/';
    };
});

app.controller('WelcomeController',function($scope){
	
});

app.controller('ProfileController',function($scope){
    
    
});

app.directive('feedItem', function() {
    return {
        restrict : 'E',
        templateUrl : 'views/feed_item.html',
        link : function(scope,element,attrs){
            scope.id = 1;
            scope.picture = attrs.picture;
            scope.content = attrs.content;
        	var $p = $("p",element);
            $p.css({
                marginTop : parseInt(parseInt($p.height()) / 2) * -1,
                marginLeft : parseInt(parseInt($p.width()) / 2) * -1
            });
        }
    }
});

app.controller('FeedController',function($scope,$ionicSideMenuDelegate){
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    
	$scope.feedItemImageHeight = parseInt(window.innerWidth);
    
    $scope.items = [
        {
            id : 1,
            content : 'new amazing car',
            picture : 'img/car.jpg'
        },
        {
            id : 2,
            content : 'cool car',
            picture : 'img/car.jpg'
        },
        {
            id : 3,
            content : 'new amazing car :) thanks dad, I love you !',
            picture : 'img/car.jpg'
        },
        {
            id : 1,
            content : 'new amazing car',
            picture : 'img/car.jpg'
        },
        {
            id : 2,
            content : 'cool car',
            picture : 'img/car.jpg'
        },
        {
            id : 3,
            content : 'new amazing car :) thanks dad, I love you !',
            picture : 'img/car.jpg'
        },
        {
            id : 1,
            content : 'new amazing car',
            picture : 'img/car.jpg'
        },
        {
            id : 2,
            content : 'cool car',
            picture : 'img/car.jpg'
        },
        {
            id : 3,
            content : 'new amazing car :) thanks dad, I love you !',
            picture : 'img/car.jpg'
        },
        {
            id : 1,
            content : 'new amazing car',
            picture : 'img/car.jpg'
        },
        {
            id : 2,
            content : 'cool car',
            picture : 'img/car.jpg'
        },
        {
            id : 3,
            content : 'new amazing car :) thanks dad, I love you !',
            picture : 'img/car.jpg'
        }
    ];
    
    /**$scope.loadMore = function(){
        for(var i = 0; i < 5; i++){
            $scope.items.push('line ' + i + ' ' + Math.random());
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    
    $scope.$on('stateChangeSuccess', function() {
    	$scope.loadMore();
    });
    
    $scope.loadMore();**/
    
    
});