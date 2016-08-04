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
var related_videos_service_1 = require('../../../../../services/related-videos.service');
var youtube_player_service_1 = require('../../../../../services/youtube-player.service');
var RelatedVideosComponent = (function () {
    function RelatedVideosComponent(relatedVideosService, youtubePlayerService) {
        var _this = this;
        this.relatedVideosService = relatedVideosService;
        this.youtubePlayerService = youtubePlayerService;
        relatedVideosService.data$.subscribe(function (response) {
            _this.items = response.items;
            console.log(response);
        });
    }
    RelatedVideosComponent.prototype.selectVideo = function (id) {
        this.youtubePlayerService.loadVideoId(id);
        this.relatedVideosService.loadRelatedVideos(id);
        this.youtubePlayerService.setupControlBar();
    };
    RelatedVideosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mu-related-videos',
            templateUrl: 'related-videos.component.html',
            directives: [list_1.MD_LIST_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [related_videos_service_1.RelatedVideosService, youtube_player_service_1.YoutubePlayerService])
    ], RelatedVideosComponent);
    return RelatedVideosComponent;
}());
exports.RelatedVideosComponent = RelatedVideosComponent;
//# sourceMappingURL=related-videos.component.js.map