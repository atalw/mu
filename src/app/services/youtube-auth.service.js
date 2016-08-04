"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Subject_1 = require('rxjs/Subject');
var YoutubeAuthService = (function () {
    function YoutubeAuthService(router) {
        this.router = router;
        this.isLoggedIn = false;
        this._isLoggedIn = new Subject_1.Subject();
        this.isLoggedIn$ = this._isLoggedIn.asObservable();
        if (localStorage.getItem('isLoggedIn') == 'true') {
            this.isLoggedIn = true;
        }
        this.options = {
            'client_id': '85957565874-ol40114mec08bm3lf3q9q3s9prv3pn0p.apps.googleusercontent.com',
            'scope': 'https://www.googleapis.com/auth/youtube',
            'immediate': false
        };
    }
    YoutubeAuthService.prototype.initAuth = function () {
        var _this = this;
        return this.loadAuth = new Promise(function (resolve) {
            return gapi.auth.init(function () {
                return gapi.auth.authorize(_this.options, function (response) {
                    _this.handleAuthResult(response);
                    resolve();
                });
            });
        });
    };
    YoutubeAuthService.prototype.checkAuth = function () {
        gapi.auth.authorize(this.options, this.handleAuthResult);
    };
    YoutubeAuthService.prototype.verifyAuth = function (authResult) {
        var url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=';
    };
    YoutubeAuthService.prototype.handleAuthResult = function (authResult) {
        if (authResult && !authResult.error) {
            localStorage.setItem('access_token', authResult.access_token);
            localStorage.setItem('isLoggedIn', 'true');
            this.isLoggedIn = true;
            this._isLoggedIn.next('true');
        }
        else {
            this.isLoggedIn = false;
            console.log('failed');
        }
    };
    YoutubeAuthService.prototype.logout = function () {
        localStorage.removeItem('access_token');
        localStorage.setItem('isLoggedIn', 'false');
        this.isLoggedIn = false;
        this.router.navigate(['login']);
    };
    YoutubeAuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], YoutubeAuthService);
    return YoutubeAuthService;
}());
exports.YoutubeAuthService = YoutubeAuthService;
//# sourceMappingURL=youtube-auth.service.js.map