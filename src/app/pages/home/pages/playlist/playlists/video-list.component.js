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
var list_1 = require('@angular2-material/list');
var icon_1 = require('@angular2-material/icon');
var playlist_service_1 = require('../../../../../services/playlist.service');
var youtube_player_service_1 = require('../../../../../services/youtube-player.service');
var related_videos_service_1 = require('../../../../../services/related-videos.service');
var VideoListComponent = (function () {
    function VideoListComponent(playlistService, youtubePlayerService, relatedVideosService) {
        this.playlistService = playlistService;
        this.youtubePlayerService = youtubePlayerService;
        this.relatedVideosService = relatedVideosService;
    }
    VideoListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playlistService.getPlaylistItems(this.playlistId).then(function (response) {
            _this.items = response;
        });
    };
    VideoListComponent.prototype.selectVideo = function (playlistId, videoId, index) {
        this.youtubePlayerService.loadPlaylist(playlistId, index);
        this.relatedVideosService.loadRelatedVideos(videoId);
        this.youtubePlayerService.setupControlBar();
    };
    VideoListComponent.prototype.queueVideo = function (id) {
        console.log(id);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VideoListComponent.prototype, "playlistId", void 0);
    VideoListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mu-video-list',
            templateUrl: 'video-list.component.html',
            animations: [
                core_1.trigger('state', [
                    core_1.state('inactive', core_1.style({
                        backgroundColor: '#fff',
                    })),
                    core_1.state('active', core_1.style({
                        backgroundColor: '#4CAF50',
                    })),
                    core_1.transition('inactive => active', core_1.animate('100ms ease-in')),
                    core_1.transition('active => inactive', core_1.animate('100ms ease-out'))
                ])
            ],
            directives: [icon_1.MD_ICON_DIRECTIVES, list_1.MD_LIST_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService, youtube_player_service_1.YoutubePlayerService, related_videos_service_1.RelatedVideosService])
    ], VideoListComponent);
    return VideoListComponent;
}());
exports.VideoListComponent = VideoListComponent;
//# sourceMappingURL=video-list.component.js.map