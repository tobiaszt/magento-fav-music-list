define([
    'jquery',
    'uiComponent',
    'ko',
], function (
    $,
    Component,
    ko,
) {
    'use strict';

    var self;
    var ALBUMS_TAG = "albums";

    function Album(data) {
        this.title = ko.observable(data.title);
        this.isBestOfTheBest = ko.observable(data.isBestOfTheBest);
    }

    return Component.extend({
        albums: ko.observableArray([]),
        newAlbumText: ko.observable(),
        storageAlbums: localStorage.getItem(ALBUMS_TAG),

        initialize: function () {
            self = this;
            this._super();
            if (self.storageAlbums) {
                self.storageAlbums = JSON.parse(self.storageAlbums);
                for (var i = 0; i < self.storageAlbums.length; i++) {
                    self.albums.push(new Album(self.storageAlbums[i]));
                }
            }
            self.albums.subscribe(function () {
                localStorage.setItem(ALBUMS_TAG, ko.toJSON(self.albums()));
            }, this);

        },

        addAlbum: function () {
            self.albums.push(new Album({
                title: self.newAlbumText(),
            }));
            self.newAlbumText('');
        },

        removeAlbum: function (album) {
            self.albums.remove(album);
        },

        editAlbum: function () {
            localStorage.setItem(ALBUMS_TAG, ko.toJSON(self.albums()));
            return true;
        }
    });
});