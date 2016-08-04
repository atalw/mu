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
var http_1 = require('@angular/http');
var PlaylistService = (function () {
    function PlaylistService(http) {
        this.http = http;
        this.playlists = {};
        this.items = [];
        this.accessToken = localStorage.getItem('access_token');
        this.playlistsUrl = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&mine=true&access_token=' + this.accessToken;
    }
    PlaylistService.prototype.getPlaylists = function (currentTab) {
        var _this = this;
        if (localStorage.getItem('tabs')) {
            return Promise.resolve(JSON.parse(localStorage.getItem('tabs')));
        }
        else {
            return this.http.get(this.playlistsUrl).toPromise()
                .then(function (response) {
                _this.playlists = response.json().items;
                // localStorage.setItem('tabs', JSON.stringify(response.json().items));
                var tabs = _this.randomizePlaylistTabs(_this.playlists);
                localStorage.setItem('tabs', JSON.stringify(tabs));
                return _this.playlists;
            });
        }
    };
    PlaylistService.prototype.randomizePlaylistTabs = function (playlists) {
        var tabs = [
            {
                label: 'tab0'
            },
            {
                label: 'tab1'
            }
        ];
        var playlists1 = [];
        var playlists2 = [];
        for (var playlist = 0; playlist < playlists.length; playlist++) {
            if (playlist % 2 == 0) {
                playlists1.push(playlists[playlist]);
            }
            else {
                playlists2.push(playlists[playlist]);
            }
        }
        tabs[0]['playlists'] = playlists1;
        tabs[1]['playlists'] = playlists2;
        return tabs;
    };
    PlaylistService.prototype.getPlaylistItems = function (playlist) {
        var playlistItemsUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&access_token=' + this.accessToken + "&playlistId=";
        playlistItemsUrl += playlist;
        this.items = []; // empty items array
        // console.log(this.items);
        return this.getItems(playlistItemsUrl).then(function (response) {
            // console.log(response);
            // console.log(response);
            return response;
        });
    };
    PlaylistService.prototype.getItems = function (url, nextPageToken) {
        var options = {};
        if (nextPageToken)
            options.pageToken = nextPageToken;
        else
            options = {};
        // console.log(url);
        // console.log(options);
        var items = [];
        return this.http.get(url, options).toPromise()
            .then(function (response) {
            items.push.apply(items, response.json().items);
            if (response.json().nextPageToken) {
            }
            return items;
        });
    };
    PlaylistService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PlaylistService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
//# sourceMappingURL=playlist.service.js.map