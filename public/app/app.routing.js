"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home.component');
var history_component_1 = require('./history.component');
var pgnotfound_component_1 = require('./pgnotfound.component');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'history', component: history_component_1.HistoryComponent },
    { path: '**', component: pgnotfound_component_1.PageNotFoundComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map