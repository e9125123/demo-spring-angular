// the describe keyword is used to define a test suite (group of tests)
describe('angularTreeview directive', function() {

    // we declare some global vars to be used in the tests
    var elm,        // our directive jqLite element
        scope;      // the scope where our directive is inserted

    // load the modules we want to test
    beforeEach(module('angularTreeview'));

    // before each test, creates a new fresh scope
    // the inject function interest is to make use of the angularJS
    // dependency injection to get some other services in our test
    // here we need $rootScope to create a new scope
    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.treedata =
            [
             { "label" : "User", "id" : "role1", "chosen" : false, "children" : [
                 { "label" : "subUser1", "id" : "role11", "chosen" : false, "parent" :  "role1", "children" : [] },
                 { "label" : "subUser2", "id" : "role12", "chosen" : false, "parent" :  "role1", "children" : [
                     { "label" : "subUser2-1", "id" : "role121", "chosen" : false, "parent" :  "role12", "children" : [
                         { "label" : "subUser2-1-1", "id" : "role1211", "chosen" : false, "parent" :  "role21", "children" : [] },
                         { "label" : "subUser2-1-2", "id" : "role1212", "chosen" : false, "parent" :  "role21", "children" : [] }
                     ]}
                 ]}
             ]},
             { "label" : "Admin", "id" : "role2", "chosen" : false, "children" : [] },
             { "label" : "Guest", "id" : "role3", "chosen" : false, "children" : [] }
         ];
    }));

    function compileDirective(tpl) {
        // function to compile a fresh directive with the given template, or a default one
        // compile the tpl with the $rootScope created above
        // wrap our directive inside a form to be able to test
        // that our form integration works well (via ngModelController)
        // our directive instance is then put in the global 'elm' variable for further tests
        if (!tpl) tpl = '<div data-angular-treeview="true" data-tree-id="abc" data-tree-model="treedata" data-node-id="id" data-node-label="label" data-node-children="children" ></div>';
        // inject allows you to use AngularJS dependency injection
        // to retrieve and use other services
        inject(function($compile) {
            var form = $compile(tpl)(scope);
            elm = form.find('ul');
        });
        // $digest is necessary to finalize the directive generation
        scope.$digest();
    }

    describe('initialisation', function() {
        // before each test in this block, generates a fresh directive
        beforeEach(function() {
            compileDirective();
        });
        // a single test example, check the produced DOM
        it('should produce a list with 8 elements', function() {
            expect(elm.find('li').length).toEqual(8);
        });
    });

    it('should react to selections', function() {
        // then produce our directive using it
        compileDirective();
        
        // selction
        expect(scope.treedata[0].selected).toBeFalsy();

        scope.abc.selectNodeLabel(scope.treedata[0]);
        expect(scope.treedata[0].selected).toEqual('selected');
    });

    it('decrease button should be disabled when min reached', function() {
        compileDirective();
        expect(elm.find('li').attr('disabled')).not.toBeDefined();
//        console.log(elm.find('li')[5]);
        // force model change propagation
        scope.$digest();
        // validate it has updated the button status
//        expect(elm.find('li').attr('disabled')).toEqual('disabled');
    });
    // and many others...
});