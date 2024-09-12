import { requestClient } from '#/api/request';

export namespace ProjectApi {

    export interface FuzzParam {
      fuzz: string;
      repoUrl: string;
      compiler: string;
      fuzzTime: string;
      fuzzTarget: string;
      fuzzCommands: string[];
      compilerSettings: string;
    };

    export interface ProjectDetail {
      id: number;
      type: string;
      name: string;
      repoUrl: string | null;
      startTime: string;
      bugs: number;
      status: number;
      param: FuzzParam;
      result: ProjectReport;
      projectBugs: Array<Bug>;
      authorId: number | null;
    }
  
    export interface ProjectReport {
      coverage: string;
      fuzzing_task_count: number;
      total_bugs_found: number;
    }
  
    export interface Bug {
      id: number;
      name: string;
      type: string;
      risk: string;
      firstTime: string;
      total: number;
      codeText: string;
      report: string;
      crash: string;
    }
  
}

export async function list() {
  return requestClient.get('/project/list');
}

export async function getProject(id: number) {
  return requestClient.get<ProjectApi.ProjectDetail>(`/project/${id}`);
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
