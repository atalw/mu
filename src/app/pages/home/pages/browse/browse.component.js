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
var type_component_1 = require('./components/type/type.component');
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
            templateUrl: 'browse.component.html',
            directives: [type_component_1.TypeComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], BrowseComponent);
    return BrowseComponent;
}());
exports.BrowseComponent = BrowseComponent;
//# sourceMappingURL=browse.component.js.map