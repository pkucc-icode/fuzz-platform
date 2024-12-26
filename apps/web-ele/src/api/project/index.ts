import { requestClient } from '#/api/request';

export namespace ProjectApi {

    export interface FuzzParam {
      fuzz: string;
      repoUrl: string;
      compiler: string;
      fuzzTime: string;
      fuzzTarget: string[];
      fuzzCommands: string;
      compilerSettings: string;
    };

    export interface ProjectDetail {
      id: string;
      type: string;
      name: string;
      repoUrl: string;
      startTime: string;
      bugs: number;
      status: string;
      coverage: string;
      taskCount: number;
      param: FuzzParam;
      result: ProjectReport;
      projectBugs: Array<Bug>;
      projectScans: Array<Scan>;
      authorId: string | null;
    }
  
    export interface ProjectReport {
      summary: {
        total_buckets: string;
        coverage: {
          current: string;
          total: string;
        },
        requests: {
          rendered: {
            current: string;
            total: string;
          };
          valid: {
            current: string;
            total: string;
          };
          fully_valid: string;
          invalid_due_to_sequences: string;
          invalid_due_to_failed_creations: string;
        },
        total_dyn_objects: string;
        total_requests_sent: {
          gc: number;
          main_driver: number;
          LeakageRuleChecker: number;
          ResourceHierarchyChecker: number;
          UseAfterFreeChecker: number;
          InvalidDynamicObjectChecker: number;
          PayloadBodyChecker: number;
          ExamplesChecker: number;
          InvalidValueChecker: number;
        };
      };
      bug_details: [];
    }

    export interface Scan {
      id: string;
      codeLine: string;
      code: string;
      type: string;
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
      detail: Record<string, any>;
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
