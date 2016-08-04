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
var youtube_auth_service_1 = require('../../services/youtube-auth.service');
var LoginComponent = (function () {
    function LoginComponent(router, youtubeAuthService) {
        this.router = router;
        this.youtubeAuthService = youtubeAuthService;
        this.isLoggedIn = new core_1.EventEmitter();
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.youtubeAuthService.initAuth().then(function () {
            _this.isLoggedIn.emit(_this.youtubeAuthService.isLoggedIn);
            if (_this.youtubeAuthService.isLoggedIn) {
                _this.router.navigate(['']);
            }
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "isLoggedIn", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'mu-login',
            templateUrl: 'app/pages/login/login.component.html',
            styleUrls: ['app/pages/login/css/main.css', 'app/pages/login/css/animate.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, youtube_auth_service_1.YoutubeAuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map