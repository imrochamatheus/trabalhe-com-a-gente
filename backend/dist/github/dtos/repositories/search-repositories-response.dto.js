"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRepositoriesResponseDto = exports.RepositoryItemDto = exports.RepositoryOwnerDto = void 0;
class RepositoryOwnerDto {
    login;
    avatar_url;
    html_url;
}
exports.RepositoryOwnerDto = RepositoryOwnerDto;
class RepositoryItemDto {
    id;
    name;
    full_name;
    html_url;
    description;
    stargazers_count;
    watchers_count;
    forks_count;
    open_issues_count;
    owner;
}
exports.RepositoryItemDto = RepositoryItemDto;
class SearchRepositoriesResponseDto {
    total_count;
    incomplete_results;
    items;
}
exports.SearchRepositoriesResponseDto = SearchRepositoriesResponseDto;
//# sourceMappingURL=search-repositories-response.dto.js.map