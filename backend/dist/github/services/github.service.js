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
exports.GithubService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let GithubService = class GithubService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async searchRepositories(query, page = 1, perPage = 10) {
        const url = `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${perPage}`;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
        return data;
    }
    async getRepositoryIssues(owner, repo) {
        const url = `https://api.github.com/search/issues?q=repo:${owner}/${repo}`;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
        return data;
    }
};
exports.GithubService = GithubService;
exports.GithubService = GithubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GithubService);
//# sourceMappingURL=github.service.js.map