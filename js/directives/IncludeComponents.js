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