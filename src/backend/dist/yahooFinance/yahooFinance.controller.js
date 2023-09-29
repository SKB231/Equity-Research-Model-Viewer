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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yahooFinanceController = void 0;
const common_1 = require("@nestjs/common");
const yahooFinance_service_1 = require("./yahooFinance.service");
let yahooFinanceController = exports.yahooFinanceController = class yahooFinanceController {
    constructor(service) {
        this.service = service;
    }
    async getCompanyStock(body) {
        return await this.service.getHistoricalPrice({
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
            symbol: body.symbol,
            frequency: body.frequency,
        });
    }
    async getCompanyPresentStockInfo(body) {
        return await this.service.getStockInfo(body);
    }
    async getYHV8Info(symbol) {
        return await this.service.getCurrentStockPrice(symbol);
    }
};
__decorate([
    (0, common_1.Post)('getCompanyStock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], yahooFinanceController.prototype, "getCompanyStock", null);
__decorate([
    (0, common_1.Post)('getCompanyStockInfo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], yahooFinanceController.prototype, "getCompanyPresentStockInfo", null);
__decorate([
    (0, common_1.Get)('getCurrentStockPrice/:symbol'),
    __param(0, (0, common_1.Param)('symbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], yahooFinanceController.prototype, "getYHV8Info", null);
exports.yahooFinanceController = yahooFinanceController = __decorate([
    (0, common_1.Controller)('yahooFinance'),
    __metadata("design:paramtypes", [yahooFinance_service_1.yahooFinanceService])
], yahooFinanceController);
//# sourceMappingURL=yahooFinance.controller.js.map