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
var icon_1 = require('@angular2-material/icon');
var youtube_player_service_1 = require('../../../services/youtube-player.service');
var convert_seconds_pipe_1 = require('./convert-seconds.pipe');
var ControlbarComponent = (function () {
    function ControlbarComponent(youtubePlayerService) {
        var _this = this;
        this.youtubePlayerService = youtubePlayerService;
        this.playerStateIcon = 'play_arrow';
        this.playOrPauseIcon = "play_arrow";
        this.shuffle = false;
        youtubePlayerService.percentage$.subscribe(function (response) {
            _this.percentage = response;
        });
        youtubePlayerService.elapsedTime$.subscribe(function (response) {
            _this.elapsedTime = response;
        });
        youtubePlayerService.totaltime.subscribe(function (response) {
            _this.totalTime = response;
        });
        youtubePlayerService.playerState$.subscribe(function (response) {
            _this.playerStateIcon = response;
        });
    }
    ControlbarComponent.prototype.ngOnInit = function () {
        this.elapsedTime = 0;
        this.totalTime = 0;
        this.percentage = '0%';
    };
    ControlbarComponent.prototype.ngAfterViewInit = function () {
    };
    ControlbarComponent.prototype.playOrPause = function () {
        this.playerState = this.youtubePlayerService.player.getPlayerState();
        if (this.playerState == 1 || this.playerState == 3) {
            this.youtubePlayerService.pauseVideo();
        }
        else {
            this.youtubePlayerService.playVideo();
        }
    };
    ControlbarComponent.prototype.prev = function () {
        this.youtubePlayerService.player.previousVideo();
    };
    ControlbarComponent.prototype.next = function () {
        this.youtubePlayerService.player.nextVideo();
    };
    ControlbarComponent.prototype.videoSeek = function (event) {
        var seekTo = this.youtubePlayerService.player.getDuration() * (event.offsetX / event.target.offsetWidth);
        this.youtubePlayerService.player.seekTo(seekTo, false);
    };
    ControlbarComponent.prototype.shufflePlaylist = function () {
        this.shuffle = !this.shuffle;
        this.youtubePlayerService.player.setShuffle(this.shuffle);
    };
    ControlbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mu-control-bar',
            templateUrl: 'controlbar.component.html',
            directives: [icon_1.MD_ICON_DIRECTIVES],
            pipes: [convert_seconds_pipe_1.ConvertSecondsPipe],
            providers: []
        }), 
        __metadata('design:paramtypes', [youtube_player_service_1.YoutubePlayerService])
    ], ControlbarComponent);
    return ControlbarComponent;
}());
exports.ControlbarComponent = ControlbarComponent;
//# sourceMappingURL=controlbar.component.js.map