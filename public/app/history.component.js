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
var HistoryComponent = (function () {
    function HistoryComponent(_islandService) {
        this._islandService = _islandService;
        this.enqData = [];
        //Do Nothing
    }
    HistoryComponent.prototype.fetchEnquiries = function () {
        var _this = this;
        this._islandService.getEnquiries().subscribe(function (res) {
            var enqResp = res.json();
            if (enqResp.success) {
                _this.enqData = enqResp.data;
            }
        });
    };
    HistoryComponent.prototype.ngOnInit = function () {
        this.fetchEnquiries();
    };
    HistoryComponent = __decorate([
        core_1.Component({
            selector: 'history',
            template: "\n    <h3>History List</h3>\n    <br>\n    <div class=\"col-md-12\" *ngIf=\"!enqData.length\">\n    \t<h5>No history of enquiries to display.</h5>\n    </div>\n    <div class=\"col-md-12\" *ngIf=\"enqData.length\">\n    \t<h5>You have made {{enqData.length}} enquiries so far.</h5>\n    </div>\n    <div class=\"col-md-12\" *ngIf=\"enqData.length\">\n    <br>\n\t    <div class=\"col-md-6\">\n\t    <table class=\"table\">\n\t      <thead>\n\t          <tr>\n\t              <td>S.No.</td>\n\t              <td>Date/Time</td>\n\t              <td>Rows</td>\n\t              <td>Columns</td>\n\t              <td>Islands</td>\n\t          </tr>\n\t      </thead>\n\t      <tbody>\n\t          <tr *ngFor=\"let enquiry of enqData; let i = index\">\n\t              <td>{{i+1}}</td>\n\t              <td>{{enquiry.createdTime | date: 'dd/MM/yyyy hh:mm:ss a'}}</td>\n\t              <td>{{enquiry.rows}}</td>\n\t              <td>{{enquiry.cols}}</td>\n\t              <td>{{enquiry.islands}}</td>\n\t          </tr>\n\t      </tbody>\n\t    </table>\n\t    </div>\n    </div>\n",
            providers: [island_service_1.IslandService]
        }), 
        __metadata('design:paramtypes', [island_service_1.IslandService])
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map