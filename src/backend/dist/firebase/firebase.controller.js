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
exports.FirebaseController = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase.service");
let FirebaseController = exports.FirebaseController = class FirebaseController {
    constructor(service) {
        this.service = service;
    }
    getCompanyCollection() {
        return this.service.getCompanyCollection();
    }
    getCompanyFromId(id) {
        return this.service.getCompany(id);
    }
    async deleteCompanyById(body) {
        return this.service.deleteCompany(body.companyId);
    }
    async createCompany(body) {
        console.log('ADDING COMPANY');
        return await this.service.addCompany({
            jsonFile: body.jsonFile,
            name: body.name,
            ticker: body.ticker,
            type: body.type,
            recentWebcast: body.recentWebcast,
            companyInformation: body.companyInformation,
            keyComments: body.keyComments,
            linkToSlide: body.linkToSlide,
            table: body.table,
        });
    }
};
__decorate([
    (0, common_1.Get)('getAllCompanies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FirebaseController.prototype, "getCompanyCollection", null);
__decorate([
    (0, common_1.Get)('getCompanyFromId/:companyId'),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FirebaseController.prototype, "getCompanyFromId", null);
__decorate([
    (0, common_1.Post)('deleteCompanyById'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FirebaseController.prototype, "deleteCompanyById", null);
__decorate([
    (0, common_1.Post)('createCompany'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FirebaseController.prototype, "createCompany", null);
exports.FirebaseController = FirebaseController = __decorate([
    (0, common_1.Controller)('firebase'),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseController);
//# sourceMappingURL=firebase.controller.js.map