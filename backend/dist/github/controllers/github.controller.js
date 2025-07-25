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
exports.GithubController = void 0;
const common_1 = require("@nestjs/common");
const github_service_1 = require("../services/github.service");
let GithubController = class GithubController {
    githubService;
    constructor(githubService) {
        this.githubService = githubService;
    }
    async searchRepositories(query, page, perPage = 10) {
        return this.githubService.searchRepositories(query, page, perPage);
    }
    async getIssues(owner, repo) {
        return this.githubService.getRepositoryIssues(owner, repo);
    }
};
exports.GithubController = GithubController;
__decorate([
    (0, common_1.Get)("repositories"),
    __param(0, (0, common_1.Query)("q")),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("per_page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "searchRepositories", null);
__decorate([
    (0, common_1.Get)("issues"),
    __param(0, (0, common_1.Query)("owner")),
    __param(1, (0, common_1.Query)("repo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GithubController.prototype, "getIssues", null);
exports.GithubController = GithubController = __decorate([
    (0, common_1.Controller)("github"),
    __metadata("design:paramtypes", [github_service_1.GithubService])
], GithubController);
//# sourceMappingURL=github.controller.js.map