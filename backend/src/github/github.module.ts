import { Module } from "@nestjs/common";

import { HttpModule } from "@nestjs/axios";

import { GithubService } from "./services/github.service";
import { GithubController } from "./controllers/github.controller";

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
