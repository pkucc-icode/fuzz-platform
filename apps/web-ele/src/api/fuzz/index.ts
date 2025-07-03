import { requestClient } from '#/api/request';

export namespace FuzzApi {
  export interface FuzzCommand {
    key: number;
    value: string;
  }

  export interface FuzzParams {
    id: string | undefined;
    name: string;
    repoUrl?: string;
    compiler?: string;
    compilerSettings?: string;
    fuzz?: string;
    fuzzTime?: string;
<<<<<<< HEAD
    fuzzTarget?: string;
=======
    fuzzTarget?: string[];
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
    fuzzCommands?: string[];
    filePath?: string;
  }

  export interface WebFuzzParams {
    name: string;
<<<<<<< HEAD
    filePath: string;
    executionTime: string;
    tokenRefreshInterval: string;
    tokenRefreshCommand: string;
    useSSL: boolean;
    enableCheckers: string;
    disableCheckers: string;
    targetIp: string;
    domain: string;
    targetPort: string;
=======
    url?: string;
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
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
export async function webFuzz(data: FuzzApi.WebFuzzParams) {
  return requestClient.post<FuzzApi.FuzzResult>('/fuzz/web', data);
}

/**
 * 闭源 Fuzz
 */
export async function closeFuzz(data: FuzzApi.FuzzParams) {
  return requestClient.post<FuzzApi.FuzzResult>('/fuzz/close', data);
}

/**
 * 代码审计
 */
export async function codeAudit(data: FuzzApi.FuzzParams) {
  return requestClient.post<FuzzApi.FuzzResult>('/scan/source', data);
}
