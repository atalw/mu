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
var video_list_component_1 = require('./video-list.component');
var button_1 = require('@angular2-material/button');
var icon_1 = require('@angular2-material/icon');
var card_1 = require('@angular2-material/card');
var toolbar_1 = require('@angular2-material/toolbar');
var playlist_service_1 = require('../../../../../services/playlist.service');
var youtube_player_service_1 = require('../../../../../services/youtube-player.service');
var PlaylistsComponent = (function () {
    function PlaylistsComponent(playlistService, youtubePlayerService) {
        this.playlistService = playlistService;
        this.youtubePlayerService = youtubePlayerService;
    }
    PlaylistsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.playlistService.getPlaylists(this.currentTab).then(function (response) {
            _this.playlists = response[_this.currentTab].playlists;
        });
    };
    PlaylistsComponent.prototype.customTrackBy = function (index, obj) {
        return index;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PlaylistsComponent.prototype, "currentTab", void 0);
    PlaylistsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mu-playlists',
            templateUrl: 'playlists.component.html',
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
            directives: [card_1.MD_CARD_DIRECTIVES, button_1.MD_BUTTON_DIRECTIVES, icon_1.MD_ICON_DIRECTIVES, toolbar_1.MD_TOOLBAR_DIRECTIVES, video_list_component_1.VideoListComponent]
        }), 
        __metadata('design:paramtypes', [playlist_service_1.PlaylistService, youtube_player_service_1.YoutubePlayerService])
    ], PlaylistsComponent);
    return PlaylistsComponent;
}());
exports.PlaylistsComponent = PlaylistsComponent;
//# sourceMappingURL=playlists.component.js.map