import { HttpService } from "@nestjs/axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const setupAxiosMock = (httpService: HttpService): AxiosMockAdapter => {
  const mock = new AxiosMockAdapter(httpService.axiosRef);
  return mock;
};
