"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIssuesResponseDto = exports.IssueItemDto = void 0;
class IssueItemDto {
    id;
    title;
    html_url;
    state;
    user;
    comments;
    created_at;
    updated_at;
}
exports.IssueItemDto = IssueItemDto;
class SearchIssuesResponseDto {
    total_count;
    incomplete_results;
    items;
}
exports.SearchIssuesResponseDto = SearchIssuesResponseDto;
//# sourceMappingURL=search-issues-response.dto.js.map