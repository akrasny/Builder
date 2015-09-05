var assert = chai.assert;
var expect = chai.expect;
var webApiServer = "http://localhost:53333";
var user = {
    FirstName: 'FirstName',
    LastName: 'LastName',
    UserName: 'FirstName_LastName',
    Email: 'FirstName.LastName@gmail.com',
    Password: 'Q1wErcxghf',
    ConfirmPassword: 'Q1wErcxghf'
}

describe("The Auth service", function () {
    describe("Test username", function () {
        beforeEach(function () {
            module('MyTools');
            inject(function ($injector) {
                authSvc = $injector.get('AuthSvc');
                httpBackend = $injector.get('$httpBackend');
            });
        });

        it("should find the username", function () {
            httpBackend.expectGET(webApiServer + "/api/Account/UsernameExists?username=someuser")
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
            httpBackend.expectGET(webApiServer + "/api/Account/UsernameExists?username=someotheruser")
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

    describe("Test email", function () {
        beforeEach(function () {
            module('MyTools');
            inject(function ($injector) {
                authSvc = $injector.get('AuthSvc');
                httpBackend = $injector.get('$httpBackend');
            });
        });

        it("should find the email", function () {
            httpBackend.expectGET(webApiServer + "/api/Account/EmailExists?email=someemail@gmail.com")
            .respond(200, true);

            authSvc.checkEmail('someemail@gmail.com', {
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

        it("should not find the email", function () {
            httpBackend.expectGET(webApiServer + "/api/Account/EmailExists?email=someotheremail@gmail.com")
            .respond(200, false);

            authSvc.checkEmail('someotheremail@gmail.com', {
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

    describe("Test registration", function () {
        it('should register and sign in user successfully', function () {
            httpBackend.expectPOST(webApiServer + "/api/Account/Register", user).respond(201, true);
            httpBackend.expectPOST(webApiServer + "/Token", 'grant_type=password&username=' + encodeURIComponent(user.UserName) +
                '&password=' + encodeURIComponent(user.Password)).respond(201);

            var spyRegisterSuccess = sinon.spy(),
                spyRegisterError = sinon.spy(),
                spySignInSuccess = sinon.spy(),
                spySignInError = sinon.spy(),
                spySignInFinished = sinon.spy();

            authSvc.register(user, { //on register
                success: spyRegisterSuccess,
                error: spyRegisterError
            }, { //on sign in
                success: spySignInSuccess,
                error: spySignInError,
                finished: spySignInFinished
            });

            httpBackend.flush();

            assert(spyRegisterSuccess.called, "Registration failed - registration success callback not called");
            assert(spySignInSuccess.called, "Registration failed - sign in success callback not called");
            assert(spySignInFinished.called, "Registration failed - sign in finish callback not called");
        });

        it('registration failed', function () {
            httpBackend.expectPOST(webApiServer + "/api/Account/Register", user).respond(400);

            var spyRegisterSuccess = sinon.spy(),
                spyRegisterError = sinon.spy(),
                spySignInSuccess = sinon.spy(),
                spySignInError = sinon.spy(),
                spySignInFinished = sinon.spy();

            authSvc.register(user, { //on register
                success: spyRegisterSuccess,
                error: spyRegisterError
            }, { //on sign in
                success: spySignInSuccess,
                error: spySignInError,
                finished: spySignInFinished
            });

            httpBackend.flush();

            assert(spyRegisterError.called, "Registration error callback not called");
        });
    });
});