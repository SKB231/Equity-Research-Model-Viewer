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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const firebase_module_1 = require("./firebase/firebase.module");
const firebase_service_1 = require("./firebase/firebase.service");
const yahooFinance_module_1 = require("./yahooFinance/yahooFinance.module");
const yahooFinance_service_1 = require("./yahooFinance/yahooFinance.service");
let AppModule = exports.AppModule = class AppModule {
    constructor(firebaseService, yahooFinanceService) {
        this.firebaseService = firebaseService;
        this.yahooFinanceService = yahooFinanceService;
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [firebase_module_1.FirebaseModule, yahooFinance_module_1.yahooFinanceModule],
        providers: [firebase_service_1.FirebaseService, yahooFinance_service_1.yahooFinanceService],
    }),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        yahooFinance_service_1.yahooFinanceService])
], AppModule);
//# sourceMappingURL=app.module.js.map