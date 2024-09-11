import { requestClient } from '#/api/request';

export namespace ProjectApi {
  
    export interface ProjectReport {
      code_path: string;
      code_coverage: {
        bitmap_cvg: string;
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

export async function list() {
  return requestClient.get('/project/list');
}

export async function getProject(id: number) {
  return requestClient.get<ProjectApi.ProjectReport>(`/project/${id}`);
}

export async function deleteProject(id: number) {
  return requestClient.delete(`/project/${id}`);
}

export async function stopProject(id: number) {
  return requestClient.put(`/project/${id}`, {
    id,
    status: 1,
  });
}

export async function startProject(id: number) {
  return requestClient.put(`/project/${id}`, {
    id,
    status: 0,
  });
}
