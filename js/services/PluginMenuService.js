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
