module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/private/var/www/playlister";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	__webpack_require__(58);
	var path = __webpack_require__(63);
	var express = __webpack_require__(61);
	var bodyParser = __webpack_require__(59);
	var cookieParser = __webpack_require__(60);
	var core_1 = __webpack_require__(1);
	var angular2_universal_1 = __webpack_require__(19);
	core_1.enableProdMode();
	var app = express();
	var ROOT = path.join(path.resolve(__dirname, '..'));
	app.engine('.html', angular2_universal_1.expressEngine);
	app.set('views', __dirname);
	app.set('view engine', 'html');
	app.use(cookieParser('Playlister'));
	app.use(bodyParser.json());
	app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
	app.use(express.static(path.join(ROOT, 'dist/client'), { index: false }));
	var main_node_1 = __webpack_require__(54);
	app.get('/', main_node_1.ngApp);
	app.get('/browse', main_node_1.ngApp);
	app.get('/browse/*', main_node_1.ngApp);
	app.get('/reddit', main_node_1.ngApp);
	app.get('/reddit/*', main_node_1.ngApp);
	app.get('/login', main_node_1.ngApp);
	app.get('/login/*', main_node_1.ngApp);
	app.get('/app/subreddits', function (req, res, next) {
	    res.sendFile('backend/subreddits.json', { root: __dirname });
	});
	function indexFile(req, res) {
	    res.sendFile('/index.html', { root: __dirname });
	}
	app.get('*', function (req, res) {
	    res.setHeader('Content-Type', 'application/json');
	    var pojo = { status: 404, message: 'No Content' };
	    var json = JSON.stringify(pojo, null, 2);
	    res.status(404).send(json);
	});
	var server = app.listen(process.env.PORT || 3000, function () {
	    console.log("Listening on: http://localhost:" + server.address().port);
	});

	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("@angular/core");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("@angular/router");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var Subject_1 = __webpack_require__(13);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(2);
	var Subject_1 = __webpack_require__(13);
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/icon");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(9);
	var Subject_1 = __webpack_require__(13);
	var RelatedVideosService = (function () {
	    function RelatedVideosService(http) {
	        this.http = http;
	        this.searchUrl = 'https://www.googleapis.com/youtube/v3/search';
	        this.data = new Subject_1.Subject();
	        this.data$ = this.data.asObservable();
	    }
	    RelatedVideosService.prototype.getRelatedVideos = function (videoId) {
	        var options = new http_1.URLSearchParams();
	        options.set('part', 'snippet');
	        options.set('maxResults', '50');
	        options.set('type', 'video');
	        options.set('relatedToVideoId', videoId);
	        options.set('access_token', localStorage.getItem('access_token'));
	        return this.http.get(this.searchUrl, { search: options }).toPromise()
	            .then(function (response) {
	            return response;
	        });
	    };
	    RelatedVideosService.prototype.loadRelatedVideos = function (videoId) {
	        var _this = this;
	        this.getRelatedVideos(videoId).then(function (response) {
	            _this.data.next(response.json());
	        });
	    };
	    RelatedVideosService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], RelatedVideosService);
	    return RelatedVideosService;
	}());
	exports.RelatedVideosService = RelatedVideosService;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/list");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(9);
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
	        this.items = [];
	        return this.getItems(playlistItemsUrl).then(function (response) {
	            return response;
	        });
	    };
	    PlaylistService.prototype.getItems = function (url, nextPageToken) {
	        var options = {};
	        if (nextPageToken) {
	        }
	        else
	            options = {};
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


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("@angular/http");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/button");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/card");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/tabs");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("rxjs/Subject");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(2);
	var router_2 = __webpack_require__(2);
	var info_component_1 = __webpack_require__(50);
	var videoPlayer_component_1 = __webpack_require__(53);
	var controlbar_component_1 = __webpack_require__(48);
	var sidenav_1 = __webpack_require__(57);
	var button_1 = __webpack_require__(10);
	var icon_1 = __webpack_require__(5);
	var toolbar_1 = __webpack_require__(18);
	var list_1 = __webpack_require__(7);
	var youtube_player_service_1 = __webpack_require__(3);
	var youtube_auth_service_1 = __webpack_require__(4);
	var related_videos_service_1 = __webpack_require__(6);
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
	            template: __webpack_require__(21),
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


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(9);
	__webpack_require__(64);
	var SubredditsService = (function () {
	    function SubredditsService(http) {
	        this.http = http;
	        this.url = "/app/subreddits";
	    }
	    SubredditsService.prototype.getSubreddits = function () {
	        return this.http.get(this.url).toPromise()
	            .then(function (response) { return response.json(); });
	    };
	    SubredditsService.prototype.getSubredditThread = function (selectedSubreddit, sort) {
	        var url = "https://www.reddit.com" + selectedSubreddit + "/" + sort + ".json" + "?sort=top&t=all";
	        var posts = {};
	        return this.http.get(url).toPromise()
	            .then(function (response) {
	            var data = response.json().data;
	            return posts = {
	                after: data.after,
	                children: data.children
	            };
	        });
	    };
	    SubredditsService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], SubredditsService);
	    return SubredditsService;
	}());
	exports.SubredditsService = SubredditsService;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(2);
	var youtube_auth_service_1 = __webpack_require__(4);
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
	            moduleId: module.id,
	            selector: 'mu-login',
	            template: __webpack_require__(32),
	            styles: [__webpack_require__(31), __webpack_require__(30)]
	        }), 
	        __metadata('design:paramtypes', [router_1.Router, youtube_auth_service_1.YoutubeAuthService])
	    ], LoginComponent);
	    return LoginComponent;
	}());
	exports.LoginComponent = LoginComponent;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(2);
	var youtube_auth_service_1 = __webpack_require__(4);
	var AuthGuard = (function () {
	    function AuthGuard(youtubeAuthService, router) {
	        this.youtubeAuthService = youtubeAuthService;
	        this.router = router;
	    }
	    AuthGuard.prototype.canActivate = function () {
	        if (this.youtubeAuthService.isLoggedIn) {
	            return true;
	        }
	        this.router.navigate(['login']);
	        return false;
	    };
	    AuthGuard = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [youtube_auth_service_1.YoutubeAuthService, router_1.Router])
	    ], AuthGuard);
	    return AuthGuard;
	}());
	exports.AuthGuard = AuthGuard;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/toolbar");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<router-outlet></router-outlet>\n"

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n  #page {\n    overflow: hidden;\n  }\n  .container-fluid {\n    overflow: hidden;\n  }\n  a {\n    color: rgba(255,255,255,0.87);\n  }\n  a:hover {\n    text-decoration: none;\n  }\n  .logo img{\n    height: 120px;\n    width: 120px;\n  }\n  .left-sidenav {\n    background: rgb(33,33,33);\n  }\n  .right-sidenav {\n    background: rgb(33,33,33);\n  }\n  #main {\n    /*background-color: rgb(43, 62, 80);*/\n    /*background: #FAFAFA; was this*/\n    /*color: rgb(33,33,33); was this*/\n    background: rgb(44,47,47);\n    color: rgb(255,255,255);\n    /*height: 100%;*/\n    display: flex;\n    flex-flow: column;\n    height: 100vh;\n    overflow: scroll;\n  }\n  #control-bar {\n    bottom: 0;\n    height: 3.5em;\n    width: 100%;\n    position: absolute;\n    /*background-color: rgba(78,93,108,0.9);*/\n    /*color: #e2e2e2;*/\n    /*background-color: rgb(255,255,255); was this*/\n    background-color: rgb(36,36,36);\n    color: rgb(255,255,255);\n    /*border-top: 1px solid rgb(220,220,220); was this*/\n    border-top: 1px solid rgb(36,36,36);\n  }\n  #right-bar {\n    width: 25em;\n  }\n  .start-toggle {\n    float: left;\n  }\n  .end-toggle {\n    float: right;\n  }\n  .title {\n    color: rgb(255,255,255,0.87);\n    flex: 1 1 auto;\n  }\n</style>\n\n<div id=\"page\">\n  <md-sidenav-layout class=\"sidenav-layout\" >\n\n    <md-sidenav #start mode=\"side\" opened=\"true\" class=\"left-sidenav\">\n      <md-nav-list>\n        <a md-list-item *ngFor=\"let view of views\" [routerLink]=\"[view.link]\">\n          <md-icon md-list-icon>{{view.icon}}</md-icon>\n          <span md-line>{{view.name}}</span>\n        </a>\n        <a md-list-item (click)=\"logout()\">\n          <md-icon md-list-icon>time_to_leave</md-icon>\n          <span md-line>Logout</span>\n        </a>\n      </md-nav-list>\n    </md-sidenav>\n\n    <md-sidenav #end id=\"right-bar\" align=\"end\" opened=\"true\" mode=\"side\" class=\"right-sidenav\">\n      <mu-video-player></mu-video-player>\n      <mu-info></mu-info>\n    </md-sidenav>\n\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n\n        <div id=\"main\" class=\"\">\n\n          <md-toolbar color=\"primary\" @easeInTop=\"in\">\n            <span>\n             <button md-icon-button class=\"start-toggle\" (click)=\"start.toggle()\"><md-icon>menu</md-icon></button>\n            </span>\n            <span class=\"title\">Playlister <sup>ßeta</sup></span>\n            <span>\n              <button md-icon-button class=\"end-toggle\" (click)=\"end.toggle()\"><md-icon>more_vert</md-icon></button>\n            </span>\n          </md-toolbar>\n\n          <router-outlet></router-outlet>\n\n        </div>\n      </div>\n    </div>\n  </md-sidenav-layout>\n\n  <div id=\"control-bar\" class=\"row margin-0\" @easeInBottom=\"in\">\n    <mu-control-bar></mu-control-bar>\n  </div>\n</div>"

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t#browse-page {\n\t\theight: 100%;\n\t\t/*position: absolute;*/\n\t\toverflow-y: scroll;\n\t}\n</style>\n<div id=\"browse-page\">\n\t<div id=\"browse-header\">\n\t\t<h1>Browse</h1>\n\t</div>\n\t<div class=\"types\" *ngFor=\"let type of content\"><mu-type [type]=\"type\"></mu-type></div>\n</div>\n"

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t#top-playlists {\n\t\tpadding-left: 5em;\n\t\tpadding-right: 5em;\n\t\tpadding-bottom: 2em;\n\t\tmargin-top: 5em;/*\n\t\tbackground: rgba(255,255,255,0.1);*/\n\t\tcolor: rgba(0,0,0,0.8);\n\t}\n\t.inner-row {\n\t\t/*height: 15em;*/\n\t\toverflow-x: scroll;\n\t\toverflow-y: hidden;\n\t\twhite-space: nowrap;\n\t}\n</style>\n\n<div id=\"top-playlists\">\n<div class=\"row \">\n\t<h3>{{type.title}}</h3>\n\t<div class=\"inner-row\">\n\t\t<!-- <playlist-card *ngFor=\"let card of cards\"></playlist-card> -->\n\t\t<md-grid-list cols=\"3\">\n\n      <md-grid-tile *ngFor=\"let card of type.cards\">\n          <a [routerLink]=\"[card.link]\"><img [alt]=\"card.name\" src=\"assets/images/{{card.link}}.jpeg\"></a>\n          <md-grid-tile-footer>\n            <h3 md-line>{{card.name}}</h3>\n          </md-grid-tile-footer>\n        </md-grid-tile>\n\n</md-grid-list>\n\t</div>\n</div>\n</div>\n\n"

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n  .main-header{\n   font-size: 48px;\n   line-height: 56px;\n   font-family: 'proxima_nova', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n   font-weight: 300;\n   color: white;\n }\n\n  #playlists-data {\n    /*margin-top: 2em;*/\n  }\n\n</style>\n\n<div id=\"playlists-data\">\n  <md-tab-group [(selectedIndex)]=\"selectedIndex\" (selectChange)=\"handleSelection($event)\">\n  <md-tab *ngFor=\"let tab of tabs\">\n      <template md-tab-label>{{tab.label}}</template>\n      <template md-tab-content>\n        <mu-playlists [currentTab]=\"selectedIndex\"></mu-playlists>\n      </template>\n    </md-tab>\n  </md-tab-group>\n</div>\n"

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.playlists {\n\t\t/*position: absolute;*/\n\t\tpadding: 1.5em;\n\t\toverflow-y: scroll;\n    padding-bottom: 4em;\n    height: 100%;\n  }\n  .playlist{\n    /*padding: 10px;*/\n    /*background-color: rgba(0,0,0,0.0);*/\n    /*background-color: rgb(255,255,255); was this*/\n     background: rgb(33,33,33);\n    color: rgb(255,255,255);\n    margin-bottom: 0.8em;\n    padding: 0;\n  }\n  .padding-04 {\n    padding-left: 0.8em;\n    padding-right: 0.8em;\n    padding-bottom: 0.8em;\n  }\n  .title {\n    flex: 1 1 auto;\n    height: 50px;\n  }\n  .actions {\n    height: 50px;\n  }\n  .favourite_action {\n    /*color: rgb(255,126,52);*/\n  }\n  .playlistToolbar {\n    min-height: 50px;\n    height: 50px;\n    color: rgb(189,206,205)\n  }\n  .playlist-data {\n    overflow: auto;\n    /*max-height: 40%; find fix for this*/\n    height: 35vh;\n  }\n  .playlist-head{\n    border-bottom: 1px solid rgba(0,0,0,0.1);\n    padding: 5px;\n    margin: auto;\n  }\n  .playlist-field{\n    padding: 10px;\n    /*border-bottom: 1px solid rgba(0,0,0,0.1);*/\n  }\n</style>\n\n<div class=\"playlists row\">\n\t<div class=\"col-sm-12 col-md-12 col-lg-6 col-xl-4 padding-04\" *ngFor=\"let playlist of playlists; let parentIndex = index\">\n    <md-card class=\"playlist\">\n    <md-toolbar color=\"primary\" class=\"playlistToolbar\">\n      <span class=\"title\">{{playlist.snippet.title}}</span>\n        <span class=\"actions\">\n          <button md-icon-button><md-icon>playlist_play</md-icon></button>\n          <button md-icon-button class=\"favourite_action\"><md-icon>favorite_border</md-icon></button>\n        </span>\n    </md-toolbar>\n\n      <!-- <md-card-title class=\"playlistTitle\">{{playlist.snippet.title}}</md-card-title> -->\n\n      <md-card-content class=\"playlist-data\">\n\n\n        <div *ngIf=\"playlist?.items\" class=\"loader1\">\n          <svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\">\n           <circle id=\"spinner\" cx=\"16\" cy=\"16\" r=\"14\" fill=\"none\"></circle>\n         </svg>\n        </div>\n\n        <mu-video-list [playlistId]=\"playlist.id\"></mu-video-list>\n\n      </md-card-content>\n    </md-card>\n  </div>\n</div>\n"

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.list {\n\t\t/*padding: 24px;*/\n\t}\n</style>\n\n<md-nav-list dense class=\"list\">\n\t<md-list-item class=\"\" *ngFor=\"let item of items; let i = index\" @state=\"item === selectedItem ? 'active' : 'inactive'\" [class.active]=\"item === selectedItem\">\n\t\t<p md-line (click)=\"selectedItem = item; selectVideo(item.snippet.playlistId, item.snippet.resourceId.videoId, i)\">{{item.snippet.title}}</p>\n\t\t<button md-icon-button (click)=\"queueVideo(item.snippet.resourceId.videoId)\"><md-icon>queue_music</md-icon></button>\n\t</md-list-item>\n</md-nav-list>"

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.upvotes {\n\t\ttext-align: center;\n\t}\n\t.post {\n\t\t/*border: 1px solid rgb(220,220,220);*/\n\t\tmargin: 10px;\n\t\t/*height: 12%;*/\n\t\twidth: 30%;\n\t\tfloat: left;\n\t}\n\t/*.title {\n\t\tfloat: left;\n\t\twidth: 90%;\n\t}*/\n\t.details {\n\t\t/*float: left;*/\n\t}\n\t.submission-time {\n\t\t/*width: 20%;*/\n\t}\n\t.author {\n\t\t/*width: 20%;*/\n\t}\n\t.comments {\n\t\t/*width: 20%;*/\n\t}\n</style>\n\n<!-- <div class=\"post\" *ngIf=\"post.domain == 'youtube.com' || post.domain == 'youtu.be'\">\n\t<div class=\"row\">\n\t\t<div class=\"upvotes col-sm-1\"><h5>{{post.score}}</h5></div>\n\t\t<div class=\"thumbnail col-sm-1\"><img [src]=\"post.thumbnail\"></div>\n\t\t<div class=\"col-sm-9\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"title col-sm-12\"><h4>{{post.title}}</h4></div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"submission-time col-sm-2\">{{post.created}} hours ago</div>\n\t\t\t\t<div class=\"author col-sm-2\">{{post.author}}</div>\n\t\t\t\t<div class=\"comments col-sm-1\">{{post.num_comments}}</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div> -->\n<md-card class=\"post\" *ngIf=\"post.domain == 'youtube.com' || post.domain == 'youtu.be'\">\n\t\t<img md-card-image alt=\"Main image\" [src]=\"post.thumbnail\">\n\t\t<md-card-content>\n\t\t\t<md-card-title>{{post.title}}</md-card-title>\n\t\t\t<md-card-subtitle><md-icon>arrow_upward</md-icon>{{post.score}}</md-card-subtitle>\n\t\t</md-card-content>\n</md-card>"

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.inner-thread {\n\t}\n</style>\n\n<div class=\"inner-thread\" >\n\t<md-tab-group (selectedChange)=\"show()\">\n\t\t<md-tab *ngFor=\"let tab of tabs\">\n\t\t\t<template md-tab-label>{{tab.label}}</template>\n\t\t\t<template md-tab-content>\n\t\t\t\t<mu-reddit-post *ngFor=\"let post of posts\" [post]=\"post.data\" (click)=\"selectVideo(post.data.url)\"></mu-reddit-post>\n\t\t\t</template>\n\t\t</md-tab>\n\t</md-tab-group>\n\n</div>\n"

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.subreddits {\n\t\theight: 100%;\n\t\tborder-right: 1px solid rgb(220,220,220);\n\t\toverflow-y: scroll;\n\t\t/*padding-left: 1em;*/\n\t}\n\t.thread {\n\t\theight: 100%;\n\t\toverflow-y: scroll;\n\t}\n\t.search {\n\t\theight: 10px;\n\t\tborder: 1px solid rgb(220,220,220);\n\t}\n\t.data {\n\t\t/*height: 100%;*/\n\t\t/*overflow-y: scroll;*/\n\t}\n</style>\n\n<div class=\"col-sm-3 padding-0 subreddits\">\n\t<div class=\"my-subreddits\">\n\n\t</div>\n\t<!-- <div class=\"search\">\n\t\t<md-input #term placeholder=\"search\" align=\"start\" (keyup)=\"search(term.value)\">\n\t\t  <span md-prefix>/r/</span>\n\t\t</md-input>\n\t</div> -->\n\t<!-- <div class=\"data\"*ngIf=\"!inSearch\">\n\t\t<div class=\"genre\"  *ngFor=\"let genre of data\">\n\t\t\t<div class=\"genre-title\"><h3>{{genre.genre}}</h3></div>\n\t\t\t<mu-subreddit *ngFor=\"let subreddit of genre.subreddits\" [subreddit]=\"subreddit\" (subredditEvent)=\"subredditEvent($event)\"></mu-subreddit>\n\t\t\t<div class=\"subreddit\" *ngFor=\"let subreddit of genre.subreddits\" [class.active]=\"subreddit === selectedSubreddit\" (click)=\"select(subreddit)\"\n        @state=\"subreddit === selectedSubreddit ? 'active' : 'inactive'\" >{{subreddit.title}}</div>\n\n\t\t</div>\n\t</div> -->\n\n\t<div class=\"data\"*ngIf=\"!inSearch\">\n\t\t<md-card class=\"genre\"  *ngFor=\"let genre of data\">\n\t\t\t<md-card-title>{{genre.genre}}</md-card-title>\n\t\t\t<!-- <mu-subreddit *ngFor=\"let subreddit of genre.subreddits\" [subreddit]=\"subreddit\" (subredditEvent)=\"subredditEvent($event)\"></mu-subreddit> -->\n\t\t\t<md-list dense>\n\t\t\t<md-list-item *ngFor=\"let subreddit of genre.subreddits\" [class.active]=\"subreddit === selectedSubreddit\" (click)=\"select(subreddit)\"\n        @state=\"subreddit === selectedSubreddit ? 'active' : 'inactive'\" >{{subreddit.title}}</md-list-item>\n        </md-list>\n\n\t\t</md-card>\n\t</div>\n\n\t<div class=\"here\" *ngIf=\"inSearch\">\n\t\t<div class=\"subreddit\" *ngFor=\"let subreddit of subreddits\" [class.active]=\"subreddit === selectedSubreddit\" (click)=\"select(subreddit)\"\n        @state=\"subreddit === selectedSubreddit ? 'active' : 'inactive'\" >{{subreddit.title}}</div>\n\t</div>\n</div>\n<div class=\"col-sm-9 padding-0 thread\">\n\t<mu-thread [selectedSubreddit]=\"selectedSubreddit\"></mu-thread>\n</div>\n"

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "@charset \"UTF-8\";\n\n\n/*!\nAnimate.css - http://daneden.me/animate\nLicensed under the MIT license\n\nCopyright (c) 2013 Daniel Eden\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.animated.hinge {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s;\n}\n\n@-webkit-keyframes bounce {\n  0%, 20%, 50%, 80%, 100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  40% {\n    -webkit-transform: translateY(-30px);\n    transform: translateY(-30px);\n  }\n\n  60% {\n    -webkit-transform: translateY(-15px);\n    transform: translateY(-15px);\n  }\n}\n\n@keyframes bounce {\n  0%, 20%, 50%, 80%, 100% {\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  40% {\n    -webkit-transform: translateY(-30px);\n    -ms-transform: translateY(-30px);\n    transform: translateY(-30px);\n  }\n\n  60% {\n    -webkit-transform: translateY(-15px);\n    -ms-transform: translateY(-15px);\n    transform: translateY(-15px);\n  }\n}\n\n.bounce {\n  -webkit-animation-name: bounce;\n  animation-name: bounce;\n}\n\n@-webkit-keyframes flash {\n  0%, 50%, 100% {\n    opacity: 1;\n  }\n\n  25%, 75% {\n    opacity: 0;\n  }\n}\n\n@keyframes flash {\n  0%, 50%, 100% {\n    opacity: 1;\n  }\n\n  25%, 75% {\n    opacity: 0;\n  }\n}\n\n.flash {\n  -webkit-animation-name: flash;\n  animation-name: flash;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  50% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n@keyframes pulse {\n  0% {\n    -webkit-transform: scale(1);\n    -ms-transform: scale(1);\n    transform: scale(1);\n  }\n\n  50% {\n    -webkit-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    -ms-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n.pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse;\n}\n\n@-webkit-keyframes shake {\n  0%, 100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translateX(-10px);\n    transform: translateX(-10px);\n  }\n\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translateX(10px);\n    transform: translateX(10px);\n  }\n}\n\n@keyframes shake {\n  0%, 100% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translateX(-10px);\n    -ms-transform: translateX(-10px);\n    transform: translateX(-10px);\n  }\n\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translateX(10px);\n    -ms-transform: translateX(10px);\n    transform: translateX(10px);\n  }\n}\n\n.shake {\n  -webkit-animation-name: shake;\n  animation-name: shake;\n}\n\n@-webkit-keyframes swing {\n  20% {\n    -webkit-transform: rotate(15deg);\n    transform: rotate(15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate(-10deg);\n    transform: rotate(-10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate(5deg);\n    transform: rotate(5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate(-5deg);\n    transform: rotate(-5deg);\n  }\n\n  100% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n}\n\n@keyframes swing {\n  20% {\n    -webkit-transform: rotate(15deg);\n    -ms-transform: rotate(15deg);\n    transform: rotate(15deg);\n  }\n\n  40% {\n    -webkit-transform: rotate(-10deg);\n    -ms-transform: rotate(-10deg);\n    transform: rotate(-10deg);\n  }\n\n  60% {\n    -webkit-transform: rotate(5deg);\n    -ms-transform: rotate(5deg);\n    transform: rotate(5deg);\n  }\n\n  80% {\n    -webkit-transform: rotate(-5deg);\n    -ms-transform: rotate(-5deg);\n    transform: rotate(-5deg);\n  }\n\n  100% {\n    -webkit-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n}\n\n.swing {\n  -webkit-transform-origin: top center;\n  -ms-transform-origin: top center;\n  transform-origin: top center;\n  -webkit-animation-name: swing;\n  animation-name: swing;\n}\n\n@-webkit-keyframes tada {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  10%, 20% {\n    -webkit-transform: scale(0.9) rotate(-3deg);\n    transform: scale(0.9) rotate(-3deg);\n  }\n\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale(1.1) rotate(3deg);\n    transform: scale(1.1) rotate(3deg);\n  }\n\n  40%, 60%, 80% {\n    -webkit-transform: scale(1.1) rotate(-3deg);\n    transform: scale(1.1) rotate(-3deg);\n  }\n\n  100% {\n    -webkit-transform: scale(1) rotate(0);\n    transform: scale(1) rotate(0);\n  }\n}\n\n@keyframes tada {\n  0% {\n    -webkit-transform: scale(1);\n    -ms-transform: scale(1);\n    transform: scale(1);\n  }\n\n  10%, 20% {\n    -webkit-transform: scale(0.9) rotate(-3deg);\n    -ms-transform: scale(0.9) rotate(-3deg);\n    transform: scale(0.9) rotate(-3deg);\n  }\n\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale(1.1) rotate(3deg);\n    -ms-transform: scale(1.1) rotate(3deg);\n    transform: scale(1.1) rotate(3deg);\n  }\n\n  40%, 60%, 80% {\n    -webkit-transform: scale(1.1) rotate(-3deg);\n    -ms-transform: scale(1.1) rotate(-3deg);\n    transform: scale(1.1) rotate(-3deg);\n  }\n\n  100% {\n    -webkit-transform: scale(1) rotate(0);\n    -ms-transform: scale(1) rotate(0);\n    transform: scale(1) rotate(0);\n  }\n}\n\n.tada {\n  -webkit-animation-name: tada;\n  animation-name: tada;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes wobble {\n  0% {\n    -webkit-transform: translateX(0%);\n    transform: translateX(0%);\n  }\n\n  15% {\n    -webkit-transform: translateX(-25%) rotate(-5deg);\n    transform: translateX(-25%) rotate(-5deg);\n  }\n\n  30% {\n    -webkit-transform: translateX(20%) rotate(3deg);\n    transform: translateX(20%) rotate(3deg);\n  }\n\n  45% {\n    -webkit-transform: translateX(-15%) rotate(-3deg);\n    transform: translateX(-15%) rotate(-3deg);\n  }\n\n  60% {\n    -webkit-transform: translateX(10%) rotate(2deg);\n    transform: translateX(10%) rotate(2deg);\n  }\n\n  75% {\n    -webkit-transform: translateX(-5%) rotate(-1deg);\n    transform: translateX(-5%) rotate(-1deg);\n  }\n\n  100% {\n    -webkit-transform: translateX(0%);\n    transform: translateX(0%);\n  }\n}\n\n@keyframes wobble {\n  0% {\n    -webkit-transform: translateX(0%);\n    -ms-transform: translateX(0%);\n    transform: translateX(0%);\n  }\n\n  15% {\n    -webkit-transform: translateX(-25%) rotate(-5deg);\n    -ms-transform: translateX(-25%) rotate(-5deg);\n    transform: translateX(-25%) rotate(-5deg);\n  }\n\n  30% {\n    -webkit-transform: translateX(20%) rotate(3deg);\n    -ms-transform: translateX(20%) rotate(3deg);\n    transform: translateX(20%) rotate(3deg);\n  }\n\n  45% {\n    -webkit-transform: translateX(-15%) rotate(-3deg);\n    -ms-transform: translateX(-15%) rotate(-3deg);\n    transform: translateX(-15%) rotate(-3deg);\n  }\n\n  60% {\n    -webkit-transform: translateX(10%) rotate(2deg);\n    -ms-transform: translateX(10%) rotate(2deg);\n    transform: translateX(10%) rotate(2deg);\n  }\n\n  75% {\n    -webkit-transform: translateX(-5%) rotate(-1deg);\n    -ms-transform: translateX(-5%) rotate(-1deg);\n    transform: translateX(-5%) rotate(-1deg);\n  }\n\n  100% {\n    -webkit-transform: translateX(0%);\n    -ms-transform: translateX(0%);\n    transform: translateX(0%);\n  }\n}\n\n.wobble {\n  -webkit-animation-name: wobble;\n  animation-name: wobble;\n}\n\n@-webkit-keyframes bounceIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(.3);\n    transform: scale(.3);\n  }\n\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(1.05);\n    transform: scale(1.05);\n  }\n\n  70% {\n    -webkit-transform: scale(.9);\n    transform: scale(.9);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n@keyframes bounceIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(.3);\n    -ms-transform: scale(.3);\n    transform: scale(.3);\n  }\n\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(1.05);\n    -ms-transform: scale(1.05);\n    transform: scale(1.05);\n  }\n\n  70% {\n    -webkit-transform: scale(.9);\n    -ms-transform: scale(.9);\n    transform: scale(.9);\n  }\n\n  100% {\n    -webkit-transform: scale(1);\n    -ms-transform: scale(1);\n    transform: scale(1);\n  }\n}\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n  animation-name: bounceIn;\n}\n\n@-webkit-keyframes bounceInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateY(30px);\n    transform: translateY(30px);\n  }\n\n  80% {\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px);\n  }\n\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes bounceInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    -ms-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateY(30px);\n    -ms-transform: translateY(30px);\n    transform: translateY(30px);\n  }\n\n  80% {\n    -webkit-transform: translateY(-10px);\n    -ms-transform: translateY(-10px);\n    transform: translateY(-10px);\n  }\n\n  100% {\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n  animation-name: bounceInDown;\n}\n\n@-webkit-keyframes bounceInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateX(30px);\n    transform: translateX(30px);\n  }\n\n  80% {\n    -webkit-transform: translateX(-10px);\n    transform: translateX(-10px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes bounceInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    -ms-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateX(30px);\n    -ms-transform: translateX(30px);\n    transform: translateX(30px);\n  }\n\n  80% {\n    -webkit-transform: translateX(-10px);\n    -ms-transform: translateX(-10px);\n    transform: translateX(-10px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.bounceInLeft {\n  -webkit-animation-name: bounceInLeft;\n  animation-name: bounceInLeft;\n}\n\n@-webkit-keyframes bounceInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateX(-30px);\n    transform: translateX(-30px);\n  }\n\n  80% {\n    -webkit-transform: translateX(10px);\n    transform: translateX(10px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes bounceInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    -ms-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateX(-30px);\n    -ms-transform: translateX(-30px);\n    transform: translateX(-30px);\n  }\n\n  80% {\n    -webkit-transform: translateX(10px);\n    -ms-transform: translateX(10px);\n    transform: translateX(10px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.bounceInRight {\n  -webkit-animation-name: bounceInRight;\n  animation-name: bounceInRight;\n}\n\n@-webkit-keyframes bounceInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateY(-30px);\n    transform: translateY(-30px);\n  }\n\n  80% {\n    -webkit-transform: translateY(10px);\n    transform: translateY(10px);\n  }\n\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes bounceInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    -ms-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n\n  60% {\n    opacity: 1;\n    -webkit-transform: translateY(-30px);\n    -ms-transform: translateY(-30px);\n    transform: translateY(-30px);\n  }\n\n  80% {\n    -webkit-transform: translateY(10px);\n    -ms-transform: translateY(10px);\n    transform: translateY(10px);\n  }\n\n  100% {\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.bounceInUp {\n  -webkit-animation-name: bounceInUp;\n  animation-name: bounceInUp;\n}\n\n@-webkit-keyframes bounceOut {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n\n  25% {\n    -webkit-transform: scale(.95);\n    transform: scale(.95);\n  }\n\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(.3);\n    transform: scale(.3);\n  }\n}\n\n@keyframes bounceOut {\n  0% {\n    -webkit-transform: scale(1);\n    -ms-transform: scale(1);\n    transform: scale(1);\n  }\n\n  25% {\n    -webkit-transform: scale(.95);\n    -ms-transform: scale(.95);\n    transform: scale(.95);\n  }\n\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(1.1);\n    -ms-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: scale(.3);\n    -ms-transform: scale(.3);\n    transform: scale(.3);\n  }\n}\n\n.bounceOut {\n  -webkit-animation-name: bounceOut;\n  animation-name: bounceOut;\n}\n\n@-webkit-keyframes bounceOutDown {\n  0% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateY(-20px);\n    transform: translateY(-20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n}\n\n@keyframes bounceOutDown {\n  0% {\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateY(-20px);\n    -ms-transform: translateY(-20px);\n    transform: translateY(-20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    -ms-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n}\n\n.bounceOutDown {\n  -webkit-animation-name: bounceOutDown;\n  animation-name: bounceOutDown;\n}\n\n@-webkit-keyframes bounceOutLeft {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n}\n\n@keyframes bounceOutLeft {\n  0% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateX(20px);\n    -ms-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    -ms-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n}\n\n.bounceOutLeft {\n  -webkit-animation-name: bounceOutLeft;\n  animation-name: bounceOutLeft;\n}\n\n@-webkit-keyframes bounceOutRight {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateX(-20px);\n    transform: translateX(-20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n}\n\n@keyframes bounceOutRight {\n  0% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateX(-20px);\n    -ms-transform: translateX(-20px);\n    transform: translateX(-20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    -ms-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n}\n\n.bounceOutRight {\n  -webkit-animation-name: bounceOutRight;\n  animation-name: bounceOutRight;\n}\n\n@-webkit-keyframes bounceOutUp {\n  0% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n}\n\n@keyframes bounceOutUp {\n  0% {\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  20% {\n    opacity: 1;\n    -webkit-transform: translateY(20px);\n    -ms-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    -ms-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n}\n\n.bounceOutUp {\n  -webkit-animation-name: bounceOutUp;\n  animation-name: bounceOutUp;\n}\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n\n  100% {\n    opacity: 1;\n  }\n}\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn;\n}\n\n@-webkit-keyframes fadeInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n    transform: translateY(-20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n    -ms-transform: translateY(-20px);\n    transform: translateY(-20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n  animation-name: fadeInDown;\n}\n\n@-webkit-keyframes fadeInDownBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeInDownBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    -ms-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.fadeInDownBig {\n  -webkit-animation-name: fadeInDownBig;\n  animation-name: fadeInDownBig;\n}\n\n@-webkit-keyframes fadeInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n    transform: translateX(-20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes fadeInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n    -ms-transform: translateX(-20px);\n    transform: translateX(-20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.fadeInLeft {\n  -webkit-animation-name: fadeInLeft;\n  animation-name: fadeInLeft;\n}\n\n@-webkit-keyframes fadeInLeftBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes fadeInLeftBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    -ms-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.fadeInLeftBig {\n  -webkit-animation-name: fadeInLeftBig;\n  animation-name: fadeInLeftBig;\n}\n\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    -ms-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.fadeInRight {\n  -webkit-animation-name: fadeInRight;\n  animation-name: fadeInRight;\n}\n\n@-webkit-keyframes fadeInRightBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes fadeInRightBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    -ms-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.fadeInRightBig {\n  -webkit-animation-name: fadeInRightBig;\n  animation-name: fadeInRightBig;\n}\n\n@-webkit-keyframes fadeInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    -ms-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp;\n}\n\n@-webkit-keyframes fadeInUpBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeInUpBig {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    -ms-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.fadeInUpBig {\n  -webkit-animation-name: fadeInUpBig;\n  animation-name: fadeInUpBig;\n}\n\n@-webkit-keyframes fadeOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n}\n\n@keyframes fadeOut {\n  0% {\n    opacity: 1;\n  }\n\n  100% {\n    opacity: 0;\n  }\n}\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n  animation-name: fadeOut;\n}\n\n@-webkit-keyframes fadeOutDown {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n}\n\n@keyframes fadeOutDown {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    -ms-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n}\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n  animation-name: fadeOutDown;\n}\n\n@-webkit-keyframes fadeOutDownBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n}\n\n@keyframes fadeOutDownBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(2000px);\n    -ms-transform: translateY(2000px);\n    transform: translateY(2000px);\n  }\n}\n\n.fadeOutDownBig {\n  -webkit-animation-name: fadeOutDownBig;\n  animation-name: fadeOutDownBig;\n}\n\n@-webkit-keyframes fadeOutLeft {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n    transform: translateX(-20px);\n  }\n}\n\n@keyframes fadeOutLeft {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-20px);\n    -ms-transform: translateX(-20px);\n    transform: translateX(-20px);\n  }\n}\n\n.fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft;\n}\n\n@-webkit-keyframes fadeOutLeftBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n}\n\n@keyframes fadeOutLeftBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    -ms-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n}\n\n.fadeOutLeftBig {\n  -webkit-animation-name: fadeOutLeftBig;\n  animation-name: fadeOutLeftBig;\n}\n\n@-webkit-keyframes fadeOutRight {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n}\n\n@keyframes fadeOutRight {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(20px);\n    -ms-transform: translateX(20px);\n    transform: translateX(20px);\n  }\n}\n\n.fadeOutRight {\n  -webkit-animation-name: fadeOutRight;\n  animation-name: fadeOutRight;\n}\n\n@-webkit-keyframes fadeOutRightBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n}\n\n@keyframes fadeOutRightBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    -ms-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n}\n\n.fadeOutRightBig {\n  -webkit-animation-name: fadeOutRightBig;\n  animation-name: fadeOutRightBig;\n}\n\n@-webkit-keyframes fadeOutUp {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n    transform: translateY(-20px);\n  }\n}\n\n@keyframes fadeOutUp {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n    -ms-transform: translateY(-20px);\n    transform: translateY(-20px);\n  }\n}\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n  animation-name: fadeOutUp;\n}\n\n@-webkit-keyframes fadeOutUpBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n}\n\n@keyframes fadeOutUpBig {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    -ms-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n}\n\n.fadeOutUpBig {\n  -webkit-animation-name: fadeOutUpBig;\n  animation-name: fadeOutUpBig;\n}\n\n@-webkit-keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) translateZ(0) rotateY(0) scale(1);\n    transform: perspective(400px) translateZ(0) rotateY(0) scale(1);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) translateZ(150px) rotateY(170deg) scale(1);\n    transform: perspective(400px) translateZ(150px) rotateY(170deg) scale(1);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);\n    transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) translateZ(0) rotateY(360deg) scale(.95);\n    transform: perspective(400px) translateZ(0) rotateY(360deg) scale(.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) translateZ(0) rotateY(360deg) scale(1);\n    transform: perspective(400px) translateZ(0) rotateY(360deg) scale(1);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n\n@keyframes flip {\n  0% {\n    -webkit-transform: perspective(400px) translateZ(0) rotateY(0) scale(1);\n    -ms-transform: perspective(400px) translateZ(0) rotateY(0) scale(1);\n    transform: perspective(400px) translateZ(0) rotateY(0) scale(1);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) translateZ(150px) rotateY(170deg) scale(1);\n    -ms-transform: perspective(400px) translateZ(150px) rotateY(170deg) scale(1);\n    transform: perspective(400px) translateZ(150px) rotateY(170deg) scale(1);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    -webkit-transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);\n    -ms-transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);\n    transform: perspective(400px) translateZ(150px) rotateY(190deg) scale(1);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    -webkit-transform: perspective(400px) translateZ(0) rotateY(360deg) scale(.95);\n    -ms-transform: perspective(400px) translateZ(0) rotateY(360deg) scale(.95);\n    transform: perspective(400px) translateZ(0) rotateY(360deg) scale(.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) translateZ(0) rotateY(360deg) scale(1);\n    -ms-transform: perspective(400px) translateZ(0) rotateY(360deg) scale(1);\n    transform: perspective(400px) translateZ(0) rotateY(360deg) scale(1);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n  }\n}\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  -ms-backface-visibility: visible;\n  backface-visibility: visible;\n  -webkit-animation-name: flip;\n  animation-name: flip;\n}\n\n@-webkit-keyframes flipInX {\n  0% {\n    -webkit-transform: perspective(400px) rotateX(90deg);\n    transform: perspective(400px) rotateX(90deg);\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotateX(-10deg);\n    transform: perspective(400px) rotateX(-10deg);\n  }\n\n  70% {\n    -webkit-transform: perspective(400px) rotateX(10deg);\n    transform: perspective(400px) rotateX(10deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateX(0deg);\n    transform: perspective(400px) rotateX(0deg);\n    opacity: 1;\n  }\n}\n\n@keyframes flipInX {\n  0% {\n    -webkit-transform: perspective(400px) rotateX(90deg);\n    -ms-transform: perspective(400px) rotateX(90deg);\n    transform: perspective(400px) rotateX(90deg);\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotateX(-10deg);\n    -ms-transform: perspective(400px) rotateX(-10deg);\n    transform: perspective(400px) rotateX(-10deg);\n  }\n\n  70% {\n    -webkit-transform: perspective(400px) rotateX(10deg);\n    -ms-transform: perspective(400px) rotateX(10deg);\n    transform: perspective(400px) rotateX(10deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateX(0deg);\n    -ms-transform: perspective(400px) rotateX(0deg);\n    transform: perspective(400px) rotateX(0deg);\n    opacity: 1;\n  }\n}\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInX;\n  animation-name: flipInX;\n}\n\n@-webkit-keyframes flipInY {\n  0% {\n    -webkit-transform: perspective(400px) rotateY(90deg);\n    transform: perspective(400px) rotateY(90deg);\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotateY(-10deg);\n    transform: perspective(400px) rotateY(-10deg);\n  }\n\n  70% {\n    -webkit-transform: perspective(400px) rotateY(10deg);\n    transform: perspective(400px) rotateY(10deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateY(0deg);\n    transform: perspective(400px) rotateY(0deg);\n    opacity: 1;\n  }\n}\n\n@keyframes flipInY {\n  0% {\n    -webkit-transform: perspective(400px) rotateY(90deg);\n    -ms-transform: perspective(400px) rotateY(90deg);\n    transform: perspective(400px) rotateY(90deg);\n    opacity: 0;\n  }\n\n  40% {\n    -webkit-transform: perspective(400px) rotateY(-10deg);\n    -ms-transform: perspective(400px) rotateY(-10deg);\n    transform: perspective(400px) rotateY(-10deg);\n  }\n\n  70% {\n    -webkit-transform: perspective(400px) rotateY(10deg);\n    -ms-transform: perspective(400px) rotateY(10deg);\n    transform: perspective(400px) rotateY(10deg);\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateY(0deg);\n    -ms-transform: perspective(400px) rotateY(0deg);\n    transform: perspective(400px) rotateY(0deg);\n    opacity: 1;\n  }\n}\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInY;\n  animation-name: flipInY;\n}\n\n@-webkit-keyframes flipOutX {\n  0% {\n    -webkit-transform: perspective(400px) rotateX(0deg);\n    transform: perspective(400px) rotateX(0deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateX(90deg);\n    transform: perspective(400px) rotateX(90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes flipOutX {\n  0% {\n    -webkit-transform: perspective(400px) rotateX(0deg);\n    -ms-transform: perspective(400px) rotateX(0deg);\n    transform: perspective(400px) rotateX(0deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateX(90deg);\n    -ms-transform: perspective(400px) rotateX(90deg);\n    transform: perspective(400px) rotateX(90deg);\n    opacity: 0;\n  }\n}\n\n.flipOutX {\n  -webkit-animation-name: flipOutX;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n}\n\n@-webkit-keyframes flipOutY {\n  0% {\n    -webkit-transform: perspective(400px) rotateY(0deg);\n    transform: perspective(400px) rotateY(0deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateY(90deg);\n    transform: perspective(400px) rotateY(90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes flipOutY {\n  0% {\n    -webkit-transform: perspective(400px) rotateY(0deg);\n    -ms-transform: perspective(400px) rotateY(0deg);\n    transform: perspective(400px) rotateY(0deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: perspective(400px) rotateY(90deg);\n    -ms-transform: perspective(400px) rotateY(90deg);\n    transform: perspective(400px) rotateY(90deg);\n    opacity: 0;\n  }\n}\n\n.flipOutY {\n  -webkit-backface-visibility: visible !important;\n  -ms-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipOutY;\n  animation-name: flipOutY;\n}\n\n@-webkit-keyframes lightSpeedIn {\n  0% {\n    -webkit-transform: translateX(100%) skewX(-30deg);\n    transform: translateX(100%) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: translateX(-20%) skewX(30deg);\n    transform: translateX(-20%) skewX(30deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: translateX(0%) skewX(-15deg);\n    transform: translateX(0%) skewX(-15deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translateX(0%) skewX(0deg);\n    transform: translateX(0%) skewX(0deg);\n    opacity: 1;\n  }\n}\n\n@keyframes lightSpeedIn {\n  0% {\n    -webkit-transform: translateX(100%) skewX(-30deg);\n    -ms-transform: translateX(100%) skewX(-30deg);\n    transform: translateX(100%) skewX(-30deg);\n    opacity: 0;\n  }\n\n  60% {\n    -webkit-transform: translateX(-20%) skewX(30deg);\n    -ms-transform: translateX(-20%) skewX(30deg);\n    transform: translateX(-20%) skewX(30deg);\n    opacity: 1;\n  }\n\n  80% {\n    -webkit-transform: translateX(0%) skewX(-15deg);\n    -ms-transform: translateX(0%) skewX(-15deg);\n    transform: translateX(0%) skewX(-15deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translateX(0%) skewX(0deg);\n    -ms-transform: translateX(0%) skewX(0deg);\n    transform: translateX(0%) skewX(0deg);\n    opacity: 1;\n  }\n}\n\n.lightSpeedIn {\n  -webkit-animation-name: lightSpeedIn;\n  animation-name: lightSpeedIn;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out;\n}\n\n@-webkit-keyframes lightSpeedOut {\n  0% {\n    -webkit-transform: translateX(0%) skewX(0deg);\n    transform: translateX(0%) skewX(0deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translateX(100%) skewX(-30deg);\n    transform: translateX(100%) skewX(-30deg);\n    opacity: 0;\n  }\n}\n\n@keyframes lightSpeedOut {\n  0% {\n    -webkit-transform: translateX(0%) skewX(0deg);\n    -ms-transform: translateX(0%) skewX(0deg);\n    transform: translateX(0%) skewX(0deg);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform: translateX(100%) skewX(-30deg);\n    -ms-transform: translateX(100%) skewX(-30deg);\n    transform: translateX(100%) skewX(-30deg);\n    opacity: 0;\n  }\n}\n\n.lightSpeedOut {\n  -webkit-animation-name: lightSpeedOut;\n  animation-name: lightSpeedOut;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in;\n}\n\n@-webkit-keyframes rotateIn {\n  0% {\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(-200deg);\n    transform: rotate(-200deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n@keyframes rotateIn {\n  0% {\n    -webkit-transform-origin: center center;\n    -ms-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(-200deg);\n    -ms-transform: rotate(-200deg);\n    transform: rotate(-200deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: center center;\n    -ms-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n.rotateIn {\n  -webkit-animation-name: rotateIn;\n  animation-name: rotateIn;\n}\n\n@-webkit-keyframes rotateInDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(-90deg);\n    -ms-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n.rotateInDownLeft {\n  -webkit-animation-name: rotateInDownLeft;\n  animation-name: rotateInDownLeft;\n}\n\n@-webkit-keyframes rotateInDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(90deg);\n    -ms-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n.rotateInDownRight {\n  -webkit-animation-name: rotateInDownRight;\n  animation-name: rotateInDownRight;\n}\n\n@-webkit-keyframes rotateInUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(90deg);\n    -ms-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n.rotateInUpLeft {\n  -webkit-animation-name: rotateInUpLeft;\n  animation-name: rotateInUpLeft;\n}\n\n@-webkit-keyframes rotateInUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n@keyframes rotateInUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(-90deg);\n    -ms-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n}\n\n.rotateInUpRight {\n  -webkit-animation-name: rotateInUpRight;\n  animation-name: rotateInUpRight;\n}\n\n@-webkit-keyframes rotateOut {\n  0% {\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(200deg);\n    transform: rotate(200deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOut {\n  0% {\n    -webkit-transform-origin: center center;\n    -ms-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: center center;\n    -ms-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-transform: rotate(200deg);\n    -ms-transform: rotate(200deg);\n    transform: rotate(200deg);\n    opacity: 0;\n  }\n}\n\n.rotateOut {\n  -webkit-animation-name: rotateOut;\n  animation-name: rotateOut;\n}\n\n@-webkit-keyframes rotateOutDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutDownLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(90deg);\n    -ms-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutDownLeft {\n  -webkit-animation-name: rotateOutDownLeft;\n  animation-name: rotateOutDownLeft;\n}\n\n@-webkit-keyframes rotateOutDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutDownRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(-90deg);\n    -ms-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutDownRight {\n  -webkit-animation-name: rotateOutDownRight;\n  animation-name: rotateOutDownRight;\n}\n\n@-webkit-keyframes rotateOutUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutUpLeft {\n  0% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: left bottom;\n    -ms-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate(-90deg);\n    -ms-transform: rotate(-90deg);\n    transform: rotate(-90deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutUpLeft {\n  -webkit-animation-name: rotateOutUpLeft;\n  animation-name: rotateOutUpLeft;\n}\n\n@-webkit-keyframes rotateOutUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n}\n\n@keyframes rotateOutUpRight {\n  0% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    opacity: 1;\n  }\n\n  100% {\n    -webkit-transform-origin: right bottom;\n    -ms-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate(90deg);\n    -ms-transform: rotate(90deg);\n    transform: rotate(90deg);\n    opacity: 0;\n  }\n}\n\n.rotateOutUpRight {\n  -webkit-animation-name: rotateOutUpRight;\n  animation-name: rotateOutUpRight;\n}\n\n@-webkit-keyframes slideInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes slideInDown {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    -ms-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n\n  100% {\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.slideInDown {\n  -webkit-animation-name: slideInDown;\n  animation-name: slideInDown;\n}\n\n@-webkit-keyframes slideInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes slideInLeft {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    -ms-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.slideInLeft {\n  -webkit-animation-name: slideInLeft;\n  animation-name: slideInLeft;\n}\n\n@-webkit-keyframes slideInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n@keyframes slideInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    -ms-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n\n  100% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n}\n\n.slideInRight {\n  -webkit-animation-name: slideInRight;\n  animation-name: slideInRight;\n}\n\n@-webkit-keyframes slideOutLeft {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n}\n\n@keyframes slideOutLeft {\n  0% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-2000px);\n    -ms-transform: translateX(-2000px);\n    transform: translateX(-2000px);\n  }\n}\n\n.slideOutLeft {\n  -webkit-animation-name: slideOutLeft;\n  animation-name: slideOutLeft;\n}\n\n@-webkit-keyframes slideOutRight {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n}\n\n@keyframes slideOutRight {\n  0% {\n    -webkit-transform: translateX(0);\n    -ms-transform: translateX(0);\n    transform: translateX(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(2000px);\n    -ms-transform: translateX(2000px);\n    transform: translateX(2000px);\n  }\n}\n\n.slideOutRight {\n  -webkit-animation-name: slideOutRight;\n  animation-name: slideOutRight;\n}\n\n@-webkit-keyframes slideOutUp {\n  0% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n}\n\n@keyframes slideOutUp {\n  0% {\n    -webkit-transform: translateY(0);\n    -ms-transform: translateY(0);\n    transform: translateY(0);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-2000px);\n    -ms-transform: translateY(-2000px);\n    transform: translateY(-2000px);\n  }\n}\n\n.slideOutUp {\n  -webkit-animation-name: slideOutUp;\n  animation-name: slideOutUp;\n}\n\n@-webkit-keyframes hinge {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%, 60% {\n    -webkit-transform: rotate(80deg);\n    transform: rotate(80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40% {\n    -webkit-transform: rotate(60deg);\n    transform: rotate(60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  80% {\n    -webkit-transform: rotate(60deg) translateY(0);\n    transform: rotate(60deg) translateY(0);\n    opacity: 1;\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  100% {\n    -webkit-transform: translateY(700px);\n    transform: translateY(700px);\n    opacity: 0;\n  }\n}\n\n@keyframes hinge {\n  0% {\n    -webkit-transform: rotate(0);\n    -ms-transform: rotate(0);\n    transform: rotate(0);\n    -webkit-transform-origin: top left;\n    -ms-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  20%, 60% {\n    -webkit-transform: rotate(80deg);\n    -ms-transform: rotate(80deg);\n    transform: rotate(80deg);\n    -webkit-transform-origin: top left;\n    -ms-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  40% {\n    -webkit-transform: rotate(60deg);\n    -ms-transform: rotate(60deg);\n    transform: rotate(60deg);\n    -webkit-transform-origin: top left;\n    -ms-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  80% {\n    -webkit-transform: rotate(60deg) translateY(0);\n    -ms-transform: rotate(60deg) translateY(0);\n    transform: rotate(60deg) translateY(0);\n    opacity: 1;\n    -webkit-transform-origin: top left;\n    -ms-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n  }\n\n  100% {\n    -webkit-transform: translateY(700px);\n    -ms-transform: translateY(700px);\n    transform: translateY(700px);\n    opacity: 0;\n  }\n}\n\n.hinge {\n  -webkit-animation-name: hinge;\n  animation-name: hinge;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes rollIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-100%) rotate(-120deg);\n    transform: translateX(-100%) rotate(-120deg);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0px) rotate(0deg);\n    transform: translateX(0px) rotate(0deg);\n  }\n}\n\n@keyframes rollIn {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateX(-100%) rotate(-120deg);\n    -ms-transform: translateX(-100%) rotate(-120deg);\n    transform: translateX(-100%) rotate(-120deg);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateX(0px) rotate(0deg);\n    -ms-transform: translateX(0px) rotate(0deg);\n    transform: translateX(0px) rotate(0deg);\n  }\n}\n\n.rollIn {\n  -webkit-animation-name: rollIn;\n  animation-name: rollIn;\n}\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n\n@-webkit-keyframes rollOut {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0px) rotate(0deg);\n    transform: translateX(0px) rotate(0deg);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(100%) rotate(120deg);\n    transform: translateX(100%) rotate(120deg);\n  }\n}\n\n@keyframes rollOut {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(0px) rotate(0deg);\n    -ms-transform: translateX(0px) rotate(0deg);\n    transform: translateX(0px) rotate(0deg);\n  }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(100%) rotate(120deg);\n    -ms-transform: translateX(100%) rotate(120deg);\n    transform: translateX(100%) rotate(120deg);\n  }\n}\n\n.rollOut {\n  -webkit-animation-name: rollOut;\n  animation-name: rollOut;\n}"

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "/*!\n * SNOW Landing Page Theme\n *\n * Created by Visual Soldiers\n * Visit us at http://www.visualsoldiers.com\n *\n * Handcrafted with love in Atlanta!\n */\n\n\n/* ==========================================================================\n   Global styles\n   ========================================================================== */\nh1, h2, h3, h4, h5, h6, p, .btn, .navbar-nav a, .form-control, .list-inline, small, #pricing {\n  font-family: 'Montserrat', sans-serif;\n}\n\np, .lead {\n\tfont-family: 'Raleway', sans-serif;\n}\n\nh1 {\n  font-size: 55px;\n  line-height: 55px;\n  letter-spacing: -1px;\n  color: #ffffff;\n  font-weight: 700;\n}\n\nh2 {\n  font-size: 40px;\n  line-height: 40px;\n  etter-spacing: -0.5px;\n  color: #ffffff;\n  font-weight: 700;\n}\n\nh3 {\n  font-size: 16px;\n  line-height: 30px;\n  letter-spacing: 0px;\n  color: #231f20;\n  font-weight: 700;\n}\n\n.lead {\n  font-size: 21px;\n  line-height: 26px;\n  color: #ffffff;\n  font-weight: 400;\n}\n\np {\n  font-size: 17px;\n  line-height: 22px;\n  color: #929496;\n  font-weight: 400;\n}\n\n/*------------------Utilities---------------------*/\na {\n  color: inherit;\n  font-weight: inherit;\n  font-size: inherit;\n  text-decoration: none;\n}\n\na:hover, a:focus {\n  text-decoration: none;\n  color: #231f20;\n  -webkit-transition: all 0.35s ease-in-out;\n  -moz-transition: all 0.35s ease-in-out;\n  -o-transition: all 0.35s ease-in-out;\n  transition: all 0.35s ease-in-out;\n}\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -10%;\n}\n\n::selection {\n\tbackground: #231f20; /* Safari */\n\tcolor: #FFFFFF;\n}\n::-moz-selection {\n\tbackground: #231f20; /* Firefox */\n\tcolor: #FFFFFF;\n}\n\n\n/*------------------Buttons---------------------*/\n.btn:focus {\n  outline: 0px auto -webkit-focus-ring-color;\n  outline: none;\n}\n\n.btn {\n  text-transform: uppercase;\n  border-radius: 4px;\n  border: none;\n}\n\n.btn-lg {\n  font-size: 13px;\n  line-height: 1.33;\n  padding: 22px 30px;\n  font-weight: 400;\n  letter-spacing: 1px;\n}\n\n.btn-sm {\n  font-size: 11px;\n  line-height: 1.33;\n  padding: 10px 18px;\n  font-weight: 400;\n}\n\n.btn-wide {\n  width: 100%;\n  font-size: 13px;\n  line-height: 1.33;\n  padding: 18px 28px;\n  font-weight: 400;\n  letter-spacing: 1px;\n}\n\n.btn-primary {\n  background-color: #009193;\n  color: #ffffff;\n}\n\n.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active {\n  background-color: #8be2e5;\n  color: #ffffff;\n  -webkit-transition: all 0.35s ease-in-out;\n  -moz-transition: all 0.35s ease-in-out;\n  -o-transition: all 0.35s ease-in-out;\n  transition: all 0.35s ease-in-out;\n}\n\n.btn-secondary {\n  background-color: #ffffff;\n  color: #231f20;\n}\n\n.btn-secondary:hover, .btn-secondary:focus, .btn-secondary:active, .btn-secondary.active {\n  background-color: #ededed;\n  color: #231f20;\n  -webkit-transition: all 0.35s ease-in-out;\n  -moz-transition: all 0.35s ease-in-out;\n  -o-transition: all 0.35s ease-in-out;\n  transition: all 0.35s ease-in-out;\n}\n\n\n\n\n/*-----------------Margins------------------*/\n.margin-0 {\n    margin-bottom: 0 !important;\n}\n.margin-10 {\n    margin-bottom: 10px !important;\n}\n.margin-15 {\n    margin-bottom: 15px !important;\n}\n.margin-20 {\n    margin-bottom: 20px !important;\n}\n.margin-30 {\n    margin-bottom: 30px !important;\n}\n.margin-40 {\n    margin-bottom: 40px !important;\n}\n.margin-50 {\n    margin-bottom: 50px !important;\n}\n.margin-60 {\n    margin-bottom: 60px !important;\n}\n.margin-70 {\n    margin-bottom: 70px !important;\n}\n.margin-80 {\n    margin-bottom: 80px !important;\n}\n.margin-90 {\n    margin-bottom: 90px !important;\n}\n.margin-100 {\n    margin-bottom: 100px !important;\n}\n\n\n/*-----------------Colors------------------*/\n\n.black {\n  color: #231f20;\n}\n\n.blue {\n  color: #70cbce;\n}\n\n.white {\n  color: #ffffff;\n}\n\n.black-bg {\n  background: #231f20;\n}\n\n.blue-bg {\n  background: #70cbce;\n}\n\n.white-bg {\n  background: #ffffff;\n}\n\n.purple-bg {\n\tbackground: #6d3f96;\n}\n\n\n\n/* ==========================================================================\n   Nav Styles\n   ========================================================================== */\n\n.navbar {\n    border: 0px solid rgba(0, 0, 0, 0);\n    background: #70cbce;\n    margin: auto;\n    min-height: 60px;\n    padding-top: 8px;\n    position: fixed;\n    top: -60px;\n    transition: top 0.4s ease 0s;\n}\n\n.navbar.open {\n    top: 0;\n}\n\n.navbar-inverse .navbar-nav > li > a, .navbar-nav a {\n    color: #ffffff;\n    font-size: 14px;\n    letter-spacing: 1px;\n}\n\n.navbar-inverse .navbar-nav > li > a:hover {\n    color: #ffffff;\n    opacity: 0.6;\n}\n\n.nav > li > a {\n    position: relative;\n    display: block;\n    padding: 10px 10px;\n}\n\n.navbar-inverse .navbar-collapse, .navbar-inverse .navbar-form {\n    border-color: #4ec3cd;\n}\n\n.navbar-inverse .navbar-toggle {\n    border-color: transparent;\n}\n\n.logo img {\n\tmargin-top: 6px;\n}\n\n\n\n/* ==========================================================================\n   Main styles\n   ========================================================================== */\nheader {\n  /*background: url(app/pages/login/img/header-bg.jpg) no-repeat 40% 100%;*/\n  background: radial-gradient(ellipse at 50% 30%, #f1cf98 1%,#e6aa3e 70%);\n  width: 100%;\n  padding: 20px 10px 60px 10px;\n  height: 100vh;\n  overflow: hidden;\n  background-size: cover;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n}\n\n.header-info {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  left: 0;\n  right: 0;\n  margin-left: 0px;\n  margin-bottom: 18%;\n}\n\n.title {\n  color: #009193;\n}\n\n.signin {\n  padding-top: 9px;\n}\n\n\n.mouse-icon {\n    border: 2px solid #fff;\n    border-radius: 16px;\n    display: block;\n    height: 50px;\n    margin: -100px auto 50px;\n    position: relative;\n    width: 30px;\n    z-index: 10;\n}\n.mouse-icon .scroll {\n    animation-delay: 0s;\n    animation-duration: 1s;\n    animation-iteration-count: infinite;\n    animation-name: scrolling;\n    animation-play-state: running;\n    animation-timing-function: linear;\n}\n.mouse-icon .scroll {\n    background: #fff none repeat scroll 0 0;\n    border-radius: 10px;\n    height: 10px;\n    margin-left: auto;\n    margin-right: auto;\n    position: relative;\n    top: 4px;\n    width: 4px;\n}\n@keyframes scrolling {\n0% {\n    opacity: 0;\n    top: 5px;\n}\n30% {\n    opacity: 1;\n    top: 10px;\n}\n100% {\n    opacity: 0;\n    top: 25px;\n}\n}\n\n.pad-xl {\n\tpadding: 200px 0px;\n}\n\n.pad-lg {\n\tpadding: 160px 0px;\n}\n\n.pad-sm {\n\tpadding: 80px 0px;\n}\n\n.pad-xs {\n\tpadding: 30px 0px;\n}\n\n\n\n#be-the-first {\n  /*background: url(app/pages/login/img/be-the-first-bg.jpg) #231f20 no-repeat center center fixed;*/\n  background: linear-gradient(to bottom, #414d0b 0%,#727a17 100%);\n  min-height: 300px;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n}\n\nhr.line {\n\twidth: 100%;\n\tborder: 2px solid;\n}\n\n.purple {\n\tborder-color: #6d3f96;\n\tcolor: #6d3f96;\n}\n\n.blue {\n\tborder-color: #70cbce;\n\tcolor: #70cbce\n}\n\n.yellow {\n\tborder-color: #fdc05d;\n\tcolor: #fdc05d;\n}\n\n.iphone {\n    position: relative;\n    height: 200px;\n}\n\n.iphone img {\n    margin: 0 auto;\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 100%;\n    max-width: 440px;\n}\n\n\n#invite {\n  background: #f2f2f2;\n}\n\n.fa-envelope-o {\n  color: #4ec3cd;\n  font-size: 22px;\n  display: block;\n  padding-top: 15px;\n  width: 60px;\n  height: 60px;\n  border: 2px solid #4ec3cd;\n  -moz-border-radius: 30px;\n  -o-border-radius: 30px;\n  -webkit-border-radius: 30px;\n  border-radius: 30px;\n  margin: auto;\n}\n\n\n\n.news-container {\n  padding: 10px 0px 20px;\n}\n\n.news-img {\n  padding-right: 20px;\n}\n\nfooter {\n  background: #ffffff;\n  padding: 40px 0px;\n}\n\n.social li a:hover {\n  opacity: 0.5;\n}\n\n\n\n/*---------------Pricing Tables-------------------*/\n\n\n#pricing {\n  background: #70cbce;\n}\n\n.pricing-container {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n\n.pricing-table {\n  background: transparent;\n  margin-bottom: 50px;\n  margin-top: 0px;\n  -webkit-transition: all 0.25s ease-in-out;\n  -moz-transition: all 0.25s ease-in-out;\n  -o-transition: all 0.25s ease-in-out;\n  transition: all 0.25s ease-in-out;\n}\n.pricing-table.active {\n  box-shadow: 0px 0px 12px rgba(41,46,50,0.6);\n  position: absolute;\n  margin: auto;\n  z-index: 200;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n\n.pricing-table:hover {\n  margin-top: -10px;\n  -webkit-transition: all 0.25s ease-in-out;\n  -moz-transition: all 0.25s ease-in-out;\n  -o-transition: all 0.25s ease-in-out;\n  transition: all 0.25s ease-in-out;\n}\n\n.pricing-table li {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.headline {\n  background: #231f20;\n  color: #FFFFFF;\n  padding: 10px;\n  border-top-left-radius: 10px;\n  border-top-right-radius: 10px;\n}\n\n.price {\n    background: none repeat scroll 0 0 #231f20;\n    color: #FFFFFF;\n    font-size: 32px;\n    font-weight: bold;\n    padding-bottom: 20px;\n    padding-top: 20px;\n}\n\n\n.pricing-table:hover li.price  {\n  background: #303236;\n  -webkit-transition: all 0.85s ease-in-out;\n  -moz-transition: all 0.85s ease-in-out;\n  -o-transition: all 0.85s ease-in-out;\n  transition: all 0.85s ease-in-out;\n}\n\n.price small {\n  font-weight: 300;\n  color: #929496;\n}\n\n.info {\n  padding-top: 20px;\n  padding-bottom: 20px;\n  font-weight: 300;\n  font-size: 13px;\n  color: #929496;\n  background: #ffffff;\n}\n\n.features {\n  color: #231f20;\n  font-weight: bold;\n  padding-top: 12px;\n  padding-bottom: 15px;\n  border-bottom: 1px dotted #E8EAEA;\n  background: #ffffff\n}\n\n.features.first {\n  border-top: 1px dotted #E8EAEA;\n}\n\n.features.last {\n  padding-top: 17px;\n  padding-bottom: 20px;\n}\n\n.features.last a {\n\tcolor: #70cbce;\n\tfont-size: 14px;\n\tletter-spacing: 1px;\n}\n\n.pricing-container .btn {\n    border-radius: 0;\n}\n\n\n#press {\n  background: #f2f2f2;\n}\n\n\n/* ==========================================================================\n   Form styles\n   ========================================================================== */\n.form-control {\n    background-color: #FFFFFF;\n    background-image: none;\n    border: 0px solid transparent;\n    border-radius: 4px;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;\n    color: #929496;\n    display: block;\n    font-size: 15px;\n    height: 60px;\n    line-height: 1.42857;\n    padding: 6px 12px;\n    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;\n}\n\n.form-control::-moz-placeholder {\n    color: #d9d9d9;\n    font-size: 15px;\n    opacity: 1;\n}\n\n.form-control::-webkit-placeholder, .form-control::-o-placeholder {\n    color: #d9d9d9;\n    font-size: 15px;\n    opacity: 1;\n}\n\n.form-control::-o-placeholder {\n    color: #d9d9d9;\n    font-size: 15px;\n    opacity: 1;\n}\n\n\n\n\n/* ==========================================================================\n   Mobile styles\n   ========================================================================== */\n/* Landscape phones and down */\n@media (max-width: 480px) {\n\n.btn-lg {\n  font-size: 12.5px;\n  line-height: 1.33;\n  padding: 16px 13px;\n  letter-spacing: 0px;\n}\n\n\n.btn-wide {\n  width: 100%;\n  font-size: 12.5px;\n  line-height: 1.33;\n  padding: 16px 13px;\n  letter-spacing: 0px;\n}\n\n#be-the-first {\n      background-attachment: scroll;\n  }\n\n}\n\n\n/* Landscape phone to portrait tablet */\n@media (min-width: 481px) and (max-width: 767px) {\n\n#be-the-first {\n      background-attachment: scroll;\n  }\n\n}\n\n\n/* Portrait tablet to landscape and desktop */\n@media (min-width: 768px) and (max-width: 991px) {\n\n#be-the-first {\n      background-attachment: scroll;\n  }\n\n}\n\n\n\n/* Desktops and laptops ----------- */\n@media (min-width: 992px) and (max-width: 1199px) {\n\n}\n\n\n\n/* Large screens ----------- */\n@media (min-width: 1200px) and (max-width: 3000px) {\n\n}\n\n\n\n\n\n"

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "    <header>\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-xs-6\">\n            <!-- <a><h2>Playlister</h2></a> -->\n          </div>\n          <div class=\"col-xs-6 signin text-right navbar-nav\">\n            <!-- <a href=\"#\">Sign in using Google</a> -->\n          </div>\n        </div>\n\n        <div class=\"row header-info\">\n          <div class=\"col-sm-10 col-sm-offset-1 text-center\">\n            <h1 class=\"wow fadeIn title\">Playlister</h1>\n            <br />\n            <p class=\"lead wow fadeIn\" data-wow-delay=\"0.5s\">A revolutionary way to discover music. <br>\n            Using mediocre technologies such as Youtube and Reddit combined with this amazing app, <br />\n            discover music you probably have never heard of before.</p>\n            <br />\n\n            <div class=\"row\">\n              <div class=\"col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1\">\n                <div class=\"row\">\n                  <div class=\"col-xs-6 text-right wow fadeInUp\" data-wow-delay=\"1s\">\n                    <a href=\"https://youtu.be/dQw4w9WgXcQ\"class=\"btn btn-secondary btn-lg scroll\">Dont click me</a>\n                  </div>\n                  <div class=\"col-xs-6 text-left wow fadeInUp\" data-wow-delay=\"1.4s\">\n                    <a class=\"btn btn-primary btn-lg scroll\" (click)=\"login()\">Sign in with Google</a>\n                  </div>\n                </div><!--End Button Row-->\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </header>\n\n    <div class=\"mouse-icon hidden-xs\">\n\t\t\t\t<div class=\"scroll\"></div>\n\t\t\t</div>\n\n    <section id=\"be-the-first\" class=\"pad-xl\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-sm-8 col-sm-offset-2 text-center margin-30 wow fadeIn\" data-wow-delay=\"0.6s\">\n            <h2>Be the first</h2>\n            <p class=\"lead\">Lorem ipsum dolor sit amet, consectetur adipis.</p>\n          </div>\n        </div>\n\n        <div class=\"iphone wow fadeInUp\" data-wow-delay=\"1s\">\n\t        <img src=\"assets/images/iphone.png\">\n        </div>\n      </div>\n    </section>\n\n    <section id=\"main-info\" class=\"pad-xl\">\n\t    <div class=\"container\">\n\t\t    <div class=\"row\">\n\t\t\t    <div class=\"col-sm-4 wow fadeIn\" data-wow-delay=\"0.4s\">\n\t\t\t\t    <hr class=\"line purple\">\n\t\t\t\t    <h3>Use Youtube to discover music</h3>\n\t\t\t\t    <p>Browse Youtube's trending music and playlists. Add to your own playlists or subscribe to other people's playlists.</p>\n\t\t\t    </div>\n\t\t\t    <div class=\"col-sm-4 wow fadeIn\" data-wow-delay=\"0.8s\">\n\t\t\t\t    <hr  class=\"line blue\">\n\t\t\t\t    <h3>Display Youtube playlists in a single page</h3>\n\t\t\t\t    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra orci ut est facilisis, eu elementum mi volutpat. Pellentesque ac tristique nisi.</p>\n\t\t\t    </div>\n\t\t\t    <div class=\"col-sm-4 wow fadeIn\" data-wow-delay=\"1.2s\">\n\t\t\t\t    <hr  class=\"line yellow\">\n\t\t\t\t    <h3>Reddit</h3>\n\t\t\t\t    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra orci ut est facilisis, eu elementum mi volutpat. Pellentesque ac tristique nisi.</p>\n\t\t\t    </div>\n\t\t    </div>\n\t    </div>\n    </section>\n\n    <section id=\"press\" class=\"pad-sm\">\n      <div class=\"container\">\n\n        <div class=\"row margin-30 news-container\">\n          <div class=\"col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 wow fadeInLeft\" data-wow-delay=\"0.8s\">\n            <a href=\"#\" target=\"_blank\">\n            <img class=\"news-img pull-left\" src=\"assets/images/press-01.jpg\" alt=\"Tech Crunch\">\n            <p class=\"black\">This app has changed my life. Never seen anything like it.<br />\n            <small><em>Mom - August 8, 2016</em></small></p>\n            </a>\n          </div>\n        </div>\n\n        <div class=\"row margin-30 news-container\">\n          <div class=\"col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 wow fadeInLeft\" data-wow-delay=\"1.2s\">\n            <a href=\"#\" target=\"_blank\">\n            <img class=\"news-img pull-left\" src=\"assets/images/press-02.jpg\" alt=\"Forbes\">\n            <p class=\"black\">This is one of the best apps I have ever used. Good job son!<br />\n            <small><em>Dad - August 9, 2016</em></small></p>\n            </a>\n          </div>\n        </div>\n\n      </div>\n    </section>\n\n\n    <footer>\n      <div class=\"container\">\n\n        <div class=\"row\">\n          <div class=\"col-sm-8 margin-20\">\n            <ul class=\"list-inline social\">\n              <li>Stalk me on</li>\n              <li><a href=\"#\"><i class=\"fa fa-twitter\"></i></a></li>\n              <li><a href=\"#\"><i class=\"fa fa-facebook\"></i></a></li>\n              <li><a href=\"#\"><i class=\"fa fa-instagram\"></i></a></li>\n            </ul>\n          </div>\n\n          <div class=\"col-sm-4 text-right\">\n            <p><small>Copyright &copy; 2016. All rights reserved. <br>\n\t            Created by me</small></p>\n          </div>\n        </div>\n\n      </div>\n    </footer>"

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\n\t#main-control {\n\t}\n\t#buttons {\n\n\t}\n\t.control {\n\t\ttop: 0;\n\t\tcursor: pointer;\n\t\tcolor: rgb(59,129,131);\n\t}\n\t.control.active {\n\t\tcolor: rgb(139,195,74);\n\t}\n\t.options {\n\t\ttext-align: center;\n\t}\n\t.scrub-bar {\n\t\tmargin-top: 1%;\n\t}\n\t.elapsedTime {\n\t\ttext-align: center;\n\t}\n\t.bar {\n\t\tdisplay: inline-block;\n\t}\n\t#elapsed {\n\t\theight: 3px;\n\t\tbackground: gold;\n\t}\n\t.duration {\n\t\ttext-align: center;\n\t}\n\n</style>\n\n\t\t<div class=\"col-xs-6 col-sm-6 col-md-4 col-lg-2\" id=\"buttons\">\n\t\t\t<button md-icon-button class=\"control\" (click)=\"prev()\">\n\t\t\t\t<span>\n\t\t\t\t\t<md-icon class=\"md-24\">fast_rewind</md-icon>\n\t\t\t\t</span>\n\t\t\t</button>\n\t\t\t<button md-icon-button class=\"control\" (click)=\"playOrPause()\">\n\t\t\t\t<span>\n\t\t\t\t\t<md-icon class=\"md-36\">{{playerStateIcon}}</md-icon>\n\t\t\t\t</span>\n\t\t\t</button>\n\t\t\t<button md-icon-button class=\"control\" (click)=\"next()\">\n\t\t\t\t<span>\n\t\t\t\t\t<md-icon class=\"md-24\">fast_forward</md-icon>\n\t\t\t\t</span>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"hidden-xs hidden-sm hidden-md col-lg-7 scrub-bar\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-1 elapsedTime\">{{elapsedTime | convertSeconds}}</div>\n\t\t\t\t<div id=\"seekBar\" class=\"col-sm-10 bar\">\n\t\t\t\t\t<div [style.width]=\"percentage\" id=\"elapsed\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-sm-1 duration\">{{totalTime | convertSeconds}}</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-xs-6 col-sm-6 col-md-8 col-lg-3 options\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-xs-4\">\n\t\t\t\t\t<button md-icon-button (click)=\"shufflePlaylist()\">\n\t\t\t\t\t\t<md-icon class=\"control\" [class.active]=\"shuffle === true\">shuffle</md-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-xs-4\">\n\t\t\t\t\t<button md-icon-button>\n\t\t\t\t\t\t<md-icon class=\"control\">plus_one</md-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-xs-4\">\n\t\t\t\t\t<button md-icon-button>\n\t\t\t\t\t\t<md-icon class=\"control\">public</md-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>"

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.info {\n\t\t/*margin: 20px;*/\n\t\tborder-top: 1px solid rgb(78,81,81);\n\t\tmargin: 0;\n\t\tpadding-bottom: 4em;\n\t}\n\t.vid-lyrics-toggle-btn {\n\t\t/*margin-bottom: 2em;*/\n\t\tposition: absolute;\n\t\tright: 0;\n\t\tz-index: 9999;\n\t}\n\t.toggle {\n\t\tmargin: 0;\n\t}\n\t.info-tab {\n\t\ttext-align: left;\n\t}\n</style>\n\n\n<!-- <div class=\"row info\">\n\t<a class=\"vid-lyrics-toggle-btn\" (click)=\"toggle()\">Toggle</a>\n\t<div class=\"col-sm-12 padding-0\" [ngSwitch]=\"tab\">\n\t\t<mu-related-videos *ngSwitchWhen=\"'related-videos'\"></mu-related-videos>\n\t\t<mu-lyrics *ngSwitchWhen=\"'lyrics'\"></mu-lyrics>\n\t</div>\n</div> -->\n\n<div class=\"row info\">\n\t<md-tab-group class=\"info-tab\">\n\t  <md-tab>\n\t    <template md-tab-label>Related Videos</template>\n\t    <template md-tab-content>\n\t      <mu-related-videos></mu-related-videos>\n\t    </template>\n\t  </md-tab>\n\t  <md-tab>\n\t    <template md-tab-label>Lyrics</template>\n\t    <template md-tab-content>\n\t      <mu-lyrics></mu-lyrics>\n\t    </template>\n\t  </md-tab>\n\t</md-tab-group>\n</div>"

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.lyrics {\n\t\tbackground-color: rgba(255,255,255,0.1);\n\t\theight: 60%;\n\t}\n</style>\n\n<div class=\"lyrics\">\n\tlyrics here\n</div>"

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t.related-videos {\n\t\theight: 60%;\n\t\twidth: 100%;\n\t}\n</style>\n\n<div class=\"related-videos\">\n\t<md-nav-list *ngFor=\"let item of items\" dense>\n  \t\t<md-list-item (click)=\"selectVideo(item.id.videoId)\">\n   \t\t\t<img md-list-avatar [src]=\"item.snippet.thumbnails.default.url\" alt=\"...\">\n    \t\t<h3 md-line>{{item.snippet.title}}</h3>\n    \t\t<p md-line>\n      \t\t\t<span>1,000,000</span>\n    \t\t</p>\n  \t\t</md-list-item>\n\t</md-nav-list>\n</div>"

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<style type=\"text/css\">\n\t* {\n\t}\n\t.video {\n\t}\n</style>\n<div class=\"video embed-responsive embed-responsive-16by9\">\n\t<div class=\"embed-responsive-item\">\n\t\t<div id=\"player\"></div>\n\t</div>\n</div>\n\n<div class=\"video-actions\">\n\t<button md-button>Add to playlist</button>\n</div>"

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(2);
	var home_component_1 = __webpack_require__(14);
	var login_component_1 = __webpack_require__(16);
	var youtube_auth_service_1 = __webpack_require__(4);
	var AppComponent = (function () {
	    function AppComponent(youtubeAuthService) {
	        this.youtubeAuthService = youtubeAuthService;
	    }
	    AppComponent.prototype.ngOnInit = function () { };
	    AppComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'app',
	            template: __webpack_require__(20),
	            directives: [router_1.ROUTER_DIRECTIVES, login_component_1.LoginComponent, home_component_1.HomeComponent],
	            providers: [],
	        }), 
	        __metadata('design:paramtypes', [youtube_auth_service_1.YoutubeAuthService])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_component_1 = __webpack_require__(14);
	var login_component_1 = __webpack_require__(16);
	var browse_component_1 = __webpack_require__(40);
	var reddit_component_1 = __webpack_require__(47);
	var auth_guard_1 = __webpack_require__(17);
	var playlist_data_component_1 = __webpack_require__(42);
	exports.routes = [
	    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard], children: [
	            { path: '', component: playlist_data_component_1.PlaylistDataComponent },
	            { path: 'browse', component: browse_component_1.BrowseComponent },
	            { path: 'browse/:id', component: playlist_data_component_1.PlaylistDataComponent },
	            { path: 'reddit', component: reddit_component_1.RedditComponent }
	        ]
	    },
	    { path: 'login', component: login_component_1.LoginComponent },
	];


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var type_component_1 = __webpack_require__(41);
	var BrowseComponent = (function () {
	    function BrowseComponent() {
	        this.content = [
	            {
	                title: 'Artists',
	                cards: [
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                ]
	            },
	            {
	                title: 'Top Playlists',
	                cards: [
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                ]
	            },
	            {
	                title: 'Moods',
	                cards: [
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                ]
	            },
	            {
	                title: 'Genres',
	                cards: [
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                    {
	                        name: 'Justin Bieber',
	                        link: 'justin-bieber'
	                    },
	                ]
	            },
	        ];
	    }
	    BrowseComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'browse',
	            template: __webpack_require__(22),
	            directives: [type_component_1.TypeComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], BrowseComponent);
	    return BrowseComponent;
	}());
	exports.BrowseComponent = BrowseComponent;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(2);
	var grid_list_1 = __webpack_require__(56);
	var TypeComponent = (function () {
	    function TypeComponent() {
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], TypeComponent.prototype, "type", void 0);
	    TypeComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'mu-type',
	            template: __webpack_require__(23),
	            directives: [grid_list_1.MD_GRID_LIST_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], TypeComponent);
	    return TypeComponent;
	}());
	exports.TypeComponent = TypeComponent;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var tabs_1 = __webpack_require__(12);
	var playlists_component_1 = __webpack_require__(43);
	var playlist_service_1 = __webpack_require__(8);
	var PlaylistDataComponent = (function () {
	    function PlaylistDataComponent(playlistService) {
	        this.playlistService = playlistService;
	        this.dataLoaded = true;
	        this.tabs = [
	            {
	                label: 'Tab 0'
	            },
	            {
	                label: 'Tab 1'
	            },
	            {
	                label: 'Favourites'
	            }
	        ];
	        this.selectedIndex = 0;
	    }
	    PlaylistDataComponent.prototype.ngOnInit = function () {
	    };
	    PlaylistDataComponent.prototype.handleSelection = function (event) {
	    };
	    PlaylistDataComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'mu-playlist-data',
	            template: __webpack_require__(24),
	            directives: [playlists_component_1.PlaylistsComponent, tabs_1.MD_TABS_DIRECTIVES],
	            providers: [playlist_service_1.PlaylistService]
	        }), 
	        __metadata('design:paramtypes', [playlist_service_1.PlaylistService])
	    ], PlaylistDataComponent);
	    return PlaylistDataComponent;
	}());
	exports.PlaylistDataComponent = PlaylistDataComponent;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var video_list_component_1 = __webpack_require__(44);
	var button_1 = __webpack_require__(10);
	var icon_1 = __webpack_require__(5);
	var card_1 = __webpack_require__(11);
	var toolbar_1 = __webpack_require__(18);
	var playlist_service_1 = __webpack_require__(8);
	var youtube_player_service_1 = __webpack_require__(3);
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
	            template: __webpack_require__(25),
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


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var list_1 = __webpack_require__(7);
	var icon_1 = __webpack_require__(5);
	var playlist_service_1 = __webpack_require__(8);
	var youtube_player_service_1 = __webpack_require__(3);
	var related_videos_service_1 = __webpack_require__(6);
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
	            template: __webpack_require__(26),
	            animations: [
	                core_1.trigger('state', [
	                    core_1.state('inactive', core_1.style({})),
	                    core_1.state('active', core_1.style({})),
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


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var card_1 = __webpack_require__(11);
	var icon_1 = __webpack_require__(5);
	var PostComponent = (function () {
	    function PostComponent() {
	    }
	    PostComponent.prototype.ngOnInit = function () {
	        var date = new Date(this.post.created * 1000);
	        this.post.created = date.getHours();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], PostComponent.prototype, "post", void 0);
	    PostComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'mu-reddit-post',
	            template: __webpack_require__(27),
	            directives: [card_1.MD_CARD_DIRECTIVES, icon_1.MD_ICON_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], PostComponent);
	    return PostComponent;
	}());
	exports.PostComponent = PostComponent;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var post_component_1 = __webpack_require__(45);
	var tabs_1 = __webpack_require__(12);
	var youtube_player_service_1 = __webpack_require__(3);
	var subreddits_service_1 = __webpack_require__(15);
	var related_videos_service_1 = __webpack_require__(6);
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
	    };
	    ThreadComponent.prototype.ngOnChanges = function (changes) {
	        var _this = this;
	        console.log(this.selectedTabIndex);
	        if (this.selectedSubreddit) {
	            this.subredditsService.getSubredditThread(this.selectedSubreddit.title, this.tabs[this.selectedTabIndex].sort)
	                .then(function (response) {
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
	            template: __webpack_require__(28),
	            directives: [post_component_1.PostComponent, tabs_1.MD_TABS_DIRECTIVES],
	        }), 
	        __metadata('design:paramtypes', [subreddits_service_1.SubredditsService, youtube_player_service_1.YoutubePlayerService, related_videos_service_1.RelatedVideosService])
	    ], ThreadComponent);
	    return ThreadComponent;
	}());
	exports.ThreadComponent = ThreadComponent;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var thread_component_1 = __webpack_require__(46);
	var list_1 = __webpack_require__(7);
	var card_1 = __webpack_require__(11);
	var subreddits_service_1 = __webpack_require__(15);
	var RedditComponent = (function () {
	    function RedditComponent(subredditsService) {
	        this.subredditsService = subredditsService;
	    }
	    RedditComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.inSearch = false;
	        this.subredditsService.getSubreddits().then(function (response) {
	            _this.data = response;
	        });
	    };
	    RedditComponent.prototype.select = function (subreddit) {
	        this.selectedSubreddit = subreddit;
	    };
	    RedditComponent.prototype.search = function (term) {
	        if (term != '') {
	            this.inSearch = true;
	            var subreddits = [];
	            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
	                var genre = _a[_i];
	                for (var _b = 0, _c = genre.subreddits; _b < _c.length; _b++) {
	                    var subreddit = _c[_b];
	                    if (subreddit.title.toLowerCase().includes(term.toLowerCase())) {
	                        subreddits.push(subreddit);
	                    }
	                }
	            }
	            this.subreddits = subreddits;
	            console.log(this.subreddits);
	        }
	        else {
	            this.inSearch = false;
	            this.subreddits = [];
	        }
	    };
	    RedditComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            template: __webpack_require__(29),
	            directives: [thread_component_1.ThreadComponent, list_1.MD_LIST_DIRECTIVES, card_1.MD_CARD_DIRECTIVES],
	            animations: [
	                core_1.trigger('state', [
	                    core_1.state('inactive', core_1.style({
	                        backgroundColor: '#fff',
	                    })),
	                    core_1.state('active', core_1.style({
	                        backgroundColor: '#cfd8dc',
	                    })),
	                    core_1.transition('inactive => active', core_1.animate('100ms ease-in')),
	                    core_1.transition('active => inactive', core_1.animate('100ms ease-out'))
	                ])
	            ],
	            providers: [subreddits_service_1.SubredditsService]
	        }), 
	        __metadata('design:paramtypes', [subreddits_service_1.SubredditsService])
	    ], RedditComponent);
	    return RedditComponent;
	}());
	exports.RedditComponent = RedditComponent;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var icon_1 = __webpack_require__(5);
	var youtube_player_service_1 = __webpack_require__(3);
	var convert_seconds_pipe_1 = __webpack_require__(49);
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
	            template: __webpack_require__(33),
	            directives: [icon_1.MD_ICON_DIRECTIVES],
	            pipes: [convert_seconds_pipe_1.ConvertSecondsPipe],
	            providers: []
	        }), 
	        __metadata('design:paramtypes', [youtube_player_service_1.YoutubePlayerService])
	    ], ControlbarComponent);
	    return ControlbarComponent;
	}());
	exports.ControlbarComponent = ControlbarComponent;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var moment = __webpack_require__(62);
	var ConvertSecondsPipe = (function () {
	    function ConvertSecondsPipe() {
	    }
	    ConvertSecondsPipe.prototype.transform = function (value) {
	        if (!value) {
	            return '00:00';
	        }
	        else if (value >= 3600) {
	            return moment().startOf('day')
	                .seconds(value)
	                .format('H:mm:ss');
	        }
	        else {
	            return moment().startOf('day')
	                .seconds(value)
	                .format('mm:ss');
	        }
	    };
	    ConvertSecondsPipe = __decorate([
	        core_1.Pipe({ name: 'convertSeconds' }), 
	        __metadata('design:paramtypes', [])
	    ], ConvertSecondsPipe);
	    return ConvertSecondsPipe;
	}());
	exports.ConvertSecondsPipe = ConvertSecondsPipe;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var related_videos_component_1 = __webpack_require__(52);
	var lyrics_component_1 = __webpack_require__(51);
	var tabs_1 = __webpack_require__(12);
	var InfoComponent = (function () {
	    function InfoComponent() {
	    }
	    InfoComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'mu-info',
	            template: __webpack_require__(34),
	            directives: [related_videos_component_1.RelatedVideosComponent, lyrics_component_1.LyricsComponent, tabs_1.MD_TABS_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], InfoComponent);
	    return InfoComponent;
	}());
	exports.InfoComponent = InfoComponent;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var LyricsComponent = (function () {
	    function LyricsComponent() {
	    }
	    LyricsComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'mu-lyrics',
	            template: __webpack_require__(35),
	        }), 
	        __metadata('design:paramtypes', [])
	    ], LyricsComponent);
	    return LyricsComponent;
	}());
	exports.LyricsComponent = LyricsComponent;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var list_1 = __webpack_require__(7);
	var related_videos_service_1 = __webpack_require__(6);
	var youtube_player_service_1 = __webpack_require__(3);
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
	            template: __webpack_require__(36),
	            directives: [list_1.MD_LIST_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [related_videos_service_1.RelatedVideosService, youtube_player_service_1.YoutubePlayerService])
	    ], RelatedVideosComponent);
	    return RelatedVideosComponent;
	}());
	exports.RelatedVideosComponent = RelatedVideosComponent;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(1);
	var button_1 = __webpack_require__(10);
	var VideoPlayerComponent = (function () {
	    function VideoPlayerComponent() {
	    }
	    VideoPlayerComponent.prototype.ngAfterViewInit = function () {
	    };
	    VideoPlayerComponent = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'mu-video-player',
	            template: __webpack_require__(37),
	            directives: [button_1.MD_BUTTON_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], VideoPlayerComponent);
	    return VideoPlayerComponent;
	}());
	exports.VideoPlayerComponent = VideoPlayerComponent;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular2_universal_1 = __webpack_require__(19);
	var router_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(55);
	var app_component_1 = __webpack_require__(38);
	var app_routes_1 = __webpack_require__(39);
	var youtube_auth_service_1 = __webpack_require__(4);
	var auth_guard_1 = __webpack_require__(17);
	function ngApp(req, res) {
	    var baseUrl = '/';
	    var url = req.originalUrl || '/';
	    var config = {
	        directives: [
	            app_component_1.AppComponent
	        ],
	        platformProviders: [
	            { provide: angular2_universal_1.ORIGIN_URL, useValue: 'http://localhost:3000' },
	            { provide: common_1.APP_BASE_HREF, useValue: baseUrl },
	        ],
	        providers: [
	            { provide: angular2_universal_1.REQUEST_URL, useValue: url },
	            angular2_universal_1.NODE_HTTP_PROVIDERS,
	            router_1.provideRouter(app_routes_1.routes),
	            youtube_auth_service_1.YoutubeAuthService,
	            auth_guard_1.AuthGuard,
	            angular2_universal_1.NODE_LOCATION_PROVIDERS
	        ],
	        async: true,
	        preboot: false
	    };
	    res.render('index', config);
	}
	exports.ngApp = ngApp;


/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("@angular/common");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/grid-list");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("@angular2-material/sidenav");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal/polyfills");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = require("rxjs/add/operator/toPromise");

/***/ }
/******/ ]);