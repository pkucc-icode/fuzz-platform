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

  export interface FuzzingReport {
    code_path: string;
    code_coverage: {
      bitmap_cvg: string; // 百分比通常表示为字符串，例如 "4.74%"
    };
    fuzzing_task_count: number;
    total_bugs_found: number;
    bugs_found: Array<Bug>;
  }

  export interface Bug {
    bug_id: string;
    bug_type: string;
    risk_level: string; // 风险等级，例如 "高", "中", "低"
    bug_description: string;
    first_discovery_time: string;
    total_discovery_count: number;
    risk_code_display_file: string;
    asan_report_file: string;
    crash_file_path: string;
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

export async function getProjects(){
  return requestClient.get('/fuzz/get-projects');
}

export async function getProjectRes(id: number) {
  return requestClient.get<FuzzApi.FuzzingReport>(`/fuzz/project/${id}`);
}