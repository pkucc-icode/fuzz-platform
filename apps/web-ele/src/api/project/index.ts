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
      id: string;
      type: string;
      name: string;
      repoUrl: string | null;
      startTime: string;
      bugs: number;
      status: string;
      param: FuzzParam;
      result: ProjectReport;
      projectBugs: Array<Bug>;
      authorId: string | null;
    }
  
    export interface ProjectReport {
      coverage: string;
      fuzzing_task_count: number;
      total_bugs_found: number;
    }
  
    export interface Bug {
      id: string;
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

export async function listProject() {
  return requestClient.get('/project/list');
}

export async function getProject(id: string) {
  return requestClient.get<ProjectApi.ProjectDetail>(`/project/${id}`);
}

export async function deleteProject(id: string) {
  return requestClient.delete(`/project/${id}`);
}

export async function stopProject(id: string) {
  return requestClient.put(`/project/${id}`, {
    id,
    status: "STOP",
  });
}

export async function startProject(id: string) {
  return requestClient.put(`/project/${id}`, {
    id,
    status: "RUNNING",
  });
}
