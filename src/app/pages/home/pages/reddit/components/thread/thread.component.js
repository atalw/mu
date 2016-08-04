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
var post_component_1 = require('../post/post.component');
var tabs_1 = require('@angular2-material/tabs');
var youtube_player_service_1 = require('../../../../../../services/youtube-player.service');
var subreddits_service_1 = require('../../services/subreddits.service');
var related_videos_service_1 = require('../../../../../../services/related-videos.service');
var ThreadComponent = (function () {
    function ThreadComponent(subredditsService, youtubePlayerService, relatedVideosService) {
        this.subredditsService = subredditsService;
        this.youtubePlayerService = youtubePlayerService;
        this.relatedVideosService = relatedVideosService;
        this.selectedTabIndex = 2;
        this.tabs = [
            {
                label: 'Hot',
                sort: 'hot'
            },
            {
                label: 'New',
                sort: 'new'
            },
            {
                label: 'Top',
                sort: 'top'
            },
        ];
    }
    ThreadComponent.prototype.ngOnInit = function () {
        // temporary fix since selectedIndex property not working
        // this.selectedTabIndex = 0;
    };
    ThreadComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        console.log(this.selectedTabIndex);
        if (this.selectedSubreddit) {
            this.subredditsService.getSubredditThread(this.selectedSubreddit.title, this.tabs[this.selectedTabIndex].sort)
                .then(function (response) {
                // this.thread = response;
                _this.posts = response.children;
            }).then(function () {
                console.log(_this.posts);
            });
        }
    };
    ThreadComponent.prototype.show = function () {
        console.log('here');
    };
    ThreadComponent.prototype.selectVideo = function (url) {
        var regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|attribution_link\?a=.+?watch.+?v(?:%|=)))((\w|-){11})(?:\S+)?$/;
        var id = regex.exec(url);
        this.youtubePlayerService.loadVideoId(id[1]);
        this.relatedVideosService.loadRelatedVideos(id[1]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ThreadComponent.prototype, "selectedSubreddit", void 0);
    ThreadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mu-thread',
            templateUrl: 'thread.component.html',
            directives: [post_component_1.PostComponent, tabs_1.MD_TABS_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [subreddits_service_1.SubredditsService, youtube_player_service_1.YoutubePlayerService, related_videos_service_1.RelatedVideosService])
    ], ThreadComponent);
    return ThreadComponent;
}());
exports.ThreadComponent = ThreadComponent;
//# sourceMappingURL=thread.component.js.map