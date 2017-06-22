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
        		routeProvider.when(item.path,view);
        		
        		if(item['visible'] == 'undefined') {
        			item.visible = true;
        		}
        		if(item['active'] == 'undefined') {
        			item.active = false;
        		}
        		
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
