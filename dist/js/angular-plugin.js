angular.module("angular-plugin").directive(
	"includeComponents",
	function(PluginMenuService,$route,$templateCache,$controller,$compile) {
		console.log($route);
		return {
			scope: {
				path : "@"
			},
			link: function(scope, el, attr, ctrl,transclude) {
				var items = PluginMenuService.get(scope.path);
				if(items.length > 0) {
					items.forEach(
						function(each) {
							
							templ = $templateCache.get(each.templateUrl);
							var child = $(templ)							
							el.append(child);
							var controller = $controller(each.controller, {});
							var link = $compile(child.contents());

							childScope = scope.$new();
							
							childScope[each.controllerAs] = controller;
							childScope["component"] = each;
							childScope.$watch("component.visible", function(a,b,c,d) { if(a) { child.show() } else { child.hide() } });
							
							child.data('$ngControllerController', controller);
							
							console.log(child);
							
							link(childScope);
						}
					);
				}
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
				if(items.length > 0) {
					items.forEach(function(each){
						transclude(function(transEl,transScope) {
							transScope.item = each;
							transScope.children = PluginMenuService.get(each.path);
							el.parent().append(transEl);
						});
					});
				} else {
					transclude(function(transEl,transScope) {
						el.hide();
					});
				}
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
        	addItem : function(path,name,item) {

        		item.path = path+name;

        		$rootScope.$on("$locationChangeSuccess", function(e,u) { item.active = $location.path().startsWith(item.path);});
        		routeProvider.when(item.path,item);
        		
        		if(item['visible'] == 'undefined') {
        			item.visible = true;
        		}

        		item.active = $location.path().startsWith(item.path);
        		console.log(item.active);
        		
        		menus[path] = menus[path] || {children:[],path:path};
	    		menus[path].children.push(item);
	    		menus[path+name] = menus[path+name] || {children:[]};
        	},
	    	setDefault : function(item) {
	    		routeProvider.otherwise(item);
	    	},
        	addRoute : function(path,item) {
        		routeProvider.when(path,item);
        	},
	    	setDefault : function(item) {
	    		routeProvider.otherwise(item);
	    	}
    	}
     });
