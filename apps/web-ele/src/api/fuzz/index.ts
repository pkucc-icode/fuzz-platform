import { requestClient } from '#/api/request';

export namespace FuzzApi {
  export interface FuzzCommand {
    key: number;
    value: string;
  }

  export interface FuzzParams {
    name: string;
    repoUrl: string;
    compiler: string;
    compilerSettings: string;
    fuzz: string;
    fuzzTime: string;
    fuzzTarget: string;
    fuzzCommands: FuzzCommand[];
  }

  export interface FuzzResult {
    data: string;
  }
}

/**
 * 源码Fuzz
 */
export async function openFuzz(data: FuzzApi.FuzzParams) {
  return requestClient.post<FuzzApi.FuzzResult>('/fuzz/open', data);
}

/**
 * Web Fuzz
 */
export async function webFuzz(data: FuzzApi.FuzzParams) {
  return requestClient.post<FuzzApi.FuzzResult>('/fuzz/web', data);
}

/**
 * 闭源 Fuzz
 */
export async function closeFuzz(data: FuzzApi.FuzzParams) {
  return requestClient.post<FuzzApi.FuzzResult>('/fuzz/close', data);
}
