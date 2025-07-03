import { requestClient } from '#/api/request';

<<<<<<< HEAD
export namespace BugApi {

    export interface BugCount {
        bugTypesCount: number;
        cveTypesCount: number;
        totalBugCount: number;
    };

    export interface RuleDetail {
        id: string;
        name:string;
        cve: string;
        type: string;
        risk: string;
        projectId: string;
        publicReport: string;
    }
}

export async function listBug() {
    return requestClient.get('/bug/list');
}

export async function countBug() {
    return requestClient.get<BugApi.BugCount>('/bug/count');
}

export async function addBug(data: any) {
    return requestClient.post('bug/add', data);
}

export async function editBug(data: any) {
    return requestClient.post('bug/edit', data);
}

export async function delBug(id: string) {
    return requestClient.delete('bug/' + id);
}


export async function getBugDetail(id: string) {
    return requestClient.get<BugApi.RuleDetail>(`/bug/${id}`);
=======
export async function getBugDetail(id: string) {
    return requestClient.get(`/bug/${id}`);
>>>>>>> 9327addec79cb6ad385a3fa1ef864cecd81b6694
}

export async function downloadCrash(id: string) {
    return requestClient.get(`/download/crash/${id}`)
}