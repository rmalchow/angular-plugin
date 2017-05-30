module BaseModule
{
  export class Module
  {
    app: ng.IModule;
 
    constructor( name: string, modules: Array<string> ) {
      this.app = angular.module(name,modules );
    }
 
    addController( name: string, controller: Function ) {
      this.app.controller( name, controller );
    }

    addService( name: string, factory: Function ) {
      this.app.factory(name, factory);
    }
  }
}


module AngularPluginModule
{
  var angularPlugin = new BaseModule.Module( 'angular-plugin', ["ngRoute"] );
  angularPlugin.addService("menuService", function($routeProvider) {
      
      
      
      
        
        
  });
}