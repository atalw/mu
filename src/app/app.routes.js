"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./pages/home/home.component');
var login_component_1 = require('./pages/login/login.component');
var browse_component_1 = require('./pages/home/pages/browse/browse.component');
var reddit_component_1 = require('./pages/home/pages/reddit/reddit.component');
var auth_guard_1 = require('./services/auth-guard');
var youtube_auth_service_1 = require('./services/youtube-auth.service');
var playlist_data_component_1 = require('./pages/home/pages/playlist/playlist-data.component');
var routes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard], children: [
            { path: '', component: playlist_data_component_1.PlaylistDataComponent },
            { path: 'browse', component: browse_component_1.BrowseComponent },
            { path: 'browse/:id', component: playlist_data_component_1.PlaylistDataComponent },
            { path: 'reddit', component: reddit_component_1.RedditComponent }
        ]
    },
    { path: 'login', component: login_component_1.LoginComponent },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
    youtube_auth_service_1.YoutubeAuthService,
    auth_guard_1.AuthGuard
];
//# sourceMappingURL=app.routes.js.map