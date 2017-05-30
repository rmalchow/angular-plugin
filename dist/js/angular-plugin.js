angular.module("angular-plugin",["ngRoute"]);


angular.module("angular-plugin")
.config(function($routeProvider,$locationProvider) {
		$locationProvider.hashPrefix('');
		angular.module("angular-plugin").routeProvider = $routeProvider;
});
angular.module("angular-plugin").directive(
	"includeComponents",
	function(PluginComponentService) {
		return {
			transclude: 'element',
			scope: {
				path : "@"
			},
			link: function(scope, el, attr, ctrl, transclude) {
				var items = PluginComponentService.get(scope.path);
				items.forEach(function(each){
					transclude(function(transEl,transScope) {
						transScope.item = each;
						el.parent().append(transEl);
					});
				});
			}
		}
	});
angular.module("angular-plugin").directive(
	"menuItem",
	function(PluginMenuService) {
		return {
			transclude: 'element',
			scope: {
				path : "@"
			},
			link: function(scope, el, attr, ctrl, transclude) {
				var items = PluginMenuService.get(scope.path);
				items.forEach(function(each){
					transclude(function(transEl,transScope) {
						transScope.item = each;
						transScope.children = PluginMenuService.get(each.path);
						el.parent().append(transEl);
					});
				});
			}
		}
	});
angular.module("angular-plugin").service("PluginComponentService" , function() {
    	
    	var components = {};

        return {
        	get : function(path) {
	    		console.log("getting: ",path);
	    		console.log("getting: ",components[path]);
        		return components[path].children;
        	},
        	addItem : function(path,component) {
        		console.log("adding: "+path,component);
        		components[path] = components[path] || {children:[]};
	    		components[path].children.push(component);
	    		console.log("now: ",components[path]);
        	}
    	}
     });

angular.module("angular-plugin").service("PluginMenuService" , function($route,$rootScope,$location) {
    	
    	var routeProvider = angular.module("angular-plugin").routeProvider;
    	
    	var menus = {};
    	
        return {
        	goto : function(route) {
        		if($location.path!=route) {
        			$location.path(route);
        		}
        	},
        	get : function(path) {
        		if(!menus[path]) {
        			return [];
        		}
        		return menus[path].children;
        	},
        	addItem : function(path,name,item,view) {

        		routeProvider.when(path+name,view);
        		
        		if(item['visible'] == 'undefined') {
        			item.visible = true;
        		}
        		
        		item.active = false;
        		item.path = path+name;
        		
	    		$rootScope.$on("$locationChangeSuccess", function(e,u) { item.active = $location.path().startsWith(path+name);});
        		menus[path] = menus[path] || {children:[],path:path};
	    		menus[path].children.push(item);
	    		menus[path+name] = menus[path+name] || {children:[]};
	    		
	    		console.log(JSON.stringify(menus, null, 2));
	    		
        	},
	    	setDefault : function(view) {
	    		routeProvider.otherwise(view);
	    	},
        	addRoute : function(path,view) {

        		routeProvider.when(path,view);
        	},
	    	setDefault : function(view) {
	    		routeProvider.otherwise(view);
	    	}
    	}
     });
