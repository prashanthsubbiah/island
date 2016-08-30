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
var island_service_1 = require('./island.service');
var HomeComponent = (function () {
    function HomeComponent(_islandService) {
        this._islandService = _islandService;
        this.minRows = 5;
        this.maxRows = 50;
        this.minCols = 5;
        this.maxCols = 50;
        this.form = {};
        this.rows = [];
        this.cols = [];
        this.gridData = [];
        this.showAlert = false;
        this.alertMsg = '';
        //Do Nothing
    }
    HomeComponent.prototype.save = function () {
        var _this = this;
        var data = {
            'rows': this.form.rowModel,
            'cols': this.form.colModel,
            'grid': this.gridData
        };
        return this._islandService.postIslandMap(data).subscribe(function (res) {
            var postResp = res.json();
            if (postResp.success) {
                _this.showAlert = true;
                _this.alertMsg = 'You have selected ' + postResp.data.islands + ' islands!';
                _this.gridData = [];
                _this.form = {};
            }
        });
    };
    HomeComponent.prototype.reset = function () {
        this.form = {};
        this.gridData = [];
        this.showAlert = false;
    };
    HomeComponent.prototype.selected = function () {
        if (this.form.rowModel && this.form.colModel) {
            this.generateGridRows();
        }
        this.showAlert = false;
    };
    HomeComponent.prototype.toggle = function (col, row) {
        if (this.gridData[col][row] === 'W') {
            this.gridData[col][row] = 'L';
        }
        else {
            this.gridData[col][row] = 'W';
        }
        this.showAlert = false;
    };
    HomeComponent.prototype.generateGridRows = function () {
        this.gridData = [];
        for (var i = 0; i < this.form.rowModel; i++) {
            this.gridData.push([]);
            for (var q = 0; q < this.form.colModel; q++) {
                this.gridData[i].push('W');
            }
        }
    };
    HomeComponent.prototype.initialize = function () {
        for (var i = this.minRows; i <= this.maxRows; i++) {
            this.rows.push(i);
        }
        for (var i = this.minCols; i <= this.maxCols; i++) {
            this.cols.push(i);
        }
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.initialize();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            styles: ["\n        .blue {\n          background-color: #E8FAF9;\n          cursor: pointer;\n        }\n        .sand {\n          background-color: #F7F6CC;  \n          cursor: pointer;\n        }\n    "],
            template: "\n    <form name=\"signUp\" #signUp=\"ngForm\">\n    <br>\n    <h4>Mark your island here</h4>\n    <div class=\"col-md-12\">\n        <div class=\"alert alert-success\" role=\"alert\" [hidden]=\"!showAlert\">\n          <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n          <span class=\"sr-only\">Error:</span>\n          {{alertMsg}}\n        </div>\n        <br>\n    </div>\n    <div class=\"col-md-12\">\n        <div class=\"col-md-3\">\n            <div class=\"form-group\">\n                <label for=\"rows\">Rows</label>\n                <select [(ngModel)]=\"form.rowModel\" class=\"form-control\" (ngModelChange)=\"selected()\" name=\"rowModel\" #rowModel=\"ngModel\">\n                  <option value=\"{{row}}\" *ngFor=\"let row of rows\">{{row}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"col-md-3\">\n            <div class=\"form-group\">\n                <label for=\"cols\">Columns</label>\n                <select [(ngModel)]=\"form.colModel\" class=\"form-control\" (ngModelChange)=\"selected()\" name=\"colModel\" #colModel=\"ngModel\">\n                  <option value=\"{{col}}\" *ngFor=\"let col of cols\">{{col}}</option>\n                </select>\n            </div>\n        </div>\n    </div>\n    </form>\n    <div class=\"col-md-12\" *ngIf=\"gridData.length\">\n        <br>\n        <div class=\"col-md-6\">\n        <table class=\"table\">\n          <tbody>\n              <tr *ngFor=\"let rows of gridData; let i=index\">\n                  <td *ngFor=\"let col of rows; let j=index\" align=\"center\" [ngClass]=\"{blue: col==='W', sand: col==='L'}\" (click)=\"toggle(i,j)\">{{col}}</td>\n              </tr>\n          </tbody>\n        </table>\n        </div>\n        <div class=\"col-md-6\"></div>\n    </div>\n    <div class=\"col-md-12\">\n        <div class=\"col-md-6\" style=\"text-align: center\">\n    \t<button type=\"button\" (click)=\"save()\" class=\"btn btn-primary\">Save</button>\n    \t<button type=\"button\" class=\"btn btn-default\" (click)=\"reset()\">Reset</button>\n        </div>\n    </div>\n",
            providers: [island_service_1.IslandService]
        }), 
        __metadata('design:paramtypes', [island_service_1.IslandService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map