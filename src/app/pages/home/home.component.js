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
var router_2 = require('@angular/router');
var info_component_1 = require('../../theme/components/rightbar/info/info.component');
var videoPlayer_component_1 = require('../../theme/components/rightbar/videoPlayer/videoPlayer.component');
var controlbar_component_1 = require('../../theme/components/controlbar/controlbar.component');
var sidenav_1 = require('@angular2-material/sidenav');
var button_1 = require('@angular2-material/button');
var icon_1 = require('@angular2-material/icon');
var toolbar_1 = require('@angular2-material/toolbar');
var list_1 = require('@angular2-material/list');
var youtube_player_service_1 = require('../../services/youtube-player.service');
var youtube_auth_service_1 = require('../../services/youtube-auth.service');
var related_videos_service_1 = require('../../services/related-videos.service');
var HomeComponent = (function () {
    function HomeComponent(router, youtubeAuthService, relatedVideosService) {
        this.router = router;
        this.youtubeAuthService = youtubeAuthService;
        this.relatedVideosService = relatedVideosService;
        this.dataLoaded = true;
        this.views = [
            {
                name: 'Home',
                icon: 'apps',
                link: ''
            },
            {
                name: 'Youtube',
                icon: 'search',
                link: '/browse'
            },
            {
                name: 'Reddit',
                icon: 'sentiment_very_satisfied',
                link: '/reddit'
            },
            {
                name: 'Settings',
                icon: 'settings',
                link: '/settings'
            }
        ];
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent.prototype.logout = function () {
        this.youtubeAuthService.logout();
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mu-home',
            templateUrl: 'home.component.html',
            directives: [router_1.ROUTER_DIRECTIVES, controlbar_component_1.ControlbarComponent,
                sidenav_1.MD_SIDENAV_DIRECTIVES,
                button_1.MD_BUTTON_DIRECTIVES,
                icon_1.MD_ICON_DIRECTIVES,
                toolbar_1.MD_TOOLBAR_DIRECTIVES,
                list_1.MD_LIST_DIRECTIVES,
                info_component_1.InfoComponent,
                videoPlayer_component_1.VideoPlayerComponent],
            providers: [youtube_player_service_1.YoutubePlayerService, related_videos_service_1.RelatedVideosService, icon_1.MdIconRegistry],
            animations: [
                core_1.trigger('easeInLeft', [
                    core_1.state('in', core_1.style({ transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateX(-100%)' }),
                        core_1.animate('200ms ease-in')
                    ]),
                ]),
                core_1.trigger('easeInRight', [
                    core_1.state('in', core_1.style({ transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateX(100%)' }),
                        core_1.animate('200ms ease-in')
                    ]),
                ]),
                core_1.trigger('easeInBottom', [
                    core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(100%)' }),
                        core_1.animate('200ms ease-in')
                    ]),
                ]),
                core_1.trigger('easeInTop', [
                    core_1.state('in', core_1.style({ transform: 'translateY(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(-100%)' }),
                        core_1.animate('200ms ease-in')
                    ]),
                ]),
            ]
        }), 
        __metadata('design:paramtypes', [router_2.Router, youtube_auth_service_1.YoutubeAuthService, related_videos_service_1.RelatedVideosService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map