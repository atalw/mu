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
var thread_component_1 = require('./components/thread/thread.component');
var list_1 = require('@angular2-material/list');
var card_1 = require('@angular2-material/card');
var subreddits_service_1 = require('./services/subreddits.service');
var RedditComponent = (function () {
    function RedditComponent(subredditsService) {
        this.subredditsService = subredditsService;
    }
    RedditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.inSearch = false;
        this.subredditsService.getSubreddits().then(function (response) {
            _this.data = response;
            // console.log(this.data[0].subreddits[0].class);
            // this.data[0].subreddits[0];
            // console.log(response[0]);
            // this.selectedSubreddit = response[0].subreddits[1].title;
        });
    };
    RedditComponent.prototype.select = function (subreddit) {
        this.selectedSubreddit = subreddit;
    };
    // fix search method -> subreddits array is updated but DOM is not recognising
    RedditComponent.prototype.search = function (term) {
        if (term != '') {
            this.inSearch = true;
            var subreddits = [];
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var genre = _a[_i];
                for (var _b = 0, _c = genre.subreddits; _b < _c.length; _b++) {
                    var subreddit = _c[_b];
                    // console.log(subreddit.title.toLowerCase());
                    if (subreddit.title.toLowerCase().includes(term.toLowerCase())) {
                        // console.log(subreddit.title.toLowerCase());
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
            // selector: 'mu-reddit',
            templateUrl: 'reddit.component.html',
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
//# sourceMappingURL=reddit.component.js.map