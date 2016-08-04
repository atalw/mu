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
var Subject_1 = require('rxjs/Subject');
var YoutubePlayerService = (function () {
    function YoutubePlayerService() {
        var _this = this;
        this.percentage = new Subject_1.Subject();
        this.elapsedTime = new Subject_1.Subject();
        this.totaltime = new Subject_1.Subject();
        this.playerState = new Subject_1.Subject();
        this.percentage$ = this.percentage.asObservable();
        this.elapsedTime$ = this.elapsedTime.asObservable();
        this.totalTime$ = this.totaltime.asObservable();
        this.playerState$ = this.playerState.asObservable();
        this.onStateChange = function (event) {
            if (event.data == 2) {
                // this.pauseControlBar();
                _this.playerState.next('play_arrow');
            }
            if (event.data == 1) {
                _this.totaltime.next(_this.player.getDuration());
                _this.playerState.next('pause');
            }
        };
        this.onError = function () {
            console.log('onError invoked');
        };
        this.initPlayer();
        this.percentage.next('0');
        this.elapsedTime.next('00:00');
    }
    YoutubePlayerService.prototype.initPlayer = function () {
        var _this = this;
        this.loadIframeAPI = new Promise(function (resolve) {
            window['onYouTubeIframeAPIReady'] = function (ev) {
                _this.player = new YT.Player('player', {
                    events: {
                        'onReady': _this.onPlayerReady,
                        'onStateChange': _this.onStateChange,
                        'onError': _this.onError
                    }
                });
                resolve(_this.player);
            };
            _this.loadScript();
        });
    };
    YoutubePlayerService.prototype.loadScript = function () {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };
    YoutubePlayerService.prototype.onPlayerReady = function (event) {
        // this.isPlayerReady = true;
    };
    YoutubePlayerService.prototype.playVideo = function () {
        this.player.playVideo();
        this.setupControlBar();
    };
    YoutubePlayerService.prototype.pauseVideo = function () {
        this.player.pauseVideo();
        this.pauseControlBar();
    };
    YoutubePlayerService.prototype.getVideoDuration = function () {
        return this.player.getDuration();
    };
    YoutubePlayerService.prototype.getElapsedTime = function () {
        return this.player.getCurrentTime();
    };
    YoutubePlayerService.prototype.loadVideoId = function (id) {
        var _this = this;
        return this.loadIframeAPI.then(function () {
            return _this.player.loadVideoById(id);
        });
    };
    YoutubePlayerService.prototype.loadPlaylist = function (id, index) {
        var _this = this;
        return this.loadIframeAPI.then(function () {
            return _this.player.loadPlaylist({ list: id, index: index });
        });
    };
    YoutubePlayerService.prototype.getPercentage = function () {
        return (this.player.getCurrentTime() / this.player.getDuration() * 100) + '%';
    };
    YoutubePlayerService.prototype.setupPlayer = function (id) {
        var _this = this;
        this.loadVideoId(id).then(function () {
            return _this.setupControlBar();
        });
    };
    YoutubePlayerService.prototype.setupControlBar = function () {
        var _this = this;
        this.getPercentageInterval = setInterval(function () { return _this.percentage.next(_this.getPercentage()); }, 300);
        this.getElapsedtimeInterval = setInterval(function () { return _this.elapsedTime.next(_this.getElapsedTime()); }, 300);
    };
    YoutubePlayerService.prototype.pauseControlBar = function () {
        clearInterval(this.getPercentageInterval);
        clearInterval(this.getElapsedtimeInterval);
    };
    YoutubePlayerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], YoutubePlayerService);
    return YoutubePlayerService;
}());
exports.YoutubePlayerService = YoutubePlayerService;
//# sourceMappingURL=youtube-player.service.js.map