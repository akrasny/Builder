var assert = chai.assert;
var expect = chai.expect;

describe("The Auth service", function () {
    describe("Check username", function () {
        beforeEach(function () {
            module('MyTools');
            inject(function ($injector) {
                authSvc = $injector.get('AuthSvc');
                httpBackend = $injector.get('$httpBackend');
            });
        });

        it("should find the username", function () {
            httpBackend.expectGET("http://localhost:53333/api/Account/UsernameExists?username=someuser")
            .respond(200, true);

            authSvc.checkUsername('someuser', {
                success: function (data) {
                    expect(data).to.be.true;
                },
                error: function (data, status) {
                },
                finished: function () {
                }
            });

            httpBackend.flush();
        });

        it("should not find the username", function () {
            httpBackend.expectGET("http://localhost:53333/api/Account/UsernameExists?username=someotheruser")
            .respond(200, false);

            authSvc.checkUsername('someotheruser', {
                success: function (data) {
                    expect(data).to.be.false;
                },
                error: function (data, status) {
                },
                finished: function () {
                }
            });

            httpBackend.flush();
        });
    });
});