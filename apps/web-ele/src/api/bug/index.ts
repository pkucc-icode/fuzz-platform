import { requestClient } from '#/api/request';


interface RuleDetail {
    id: string;
    name:string;
    cve: string;
    type: string;
    risk: string;
    projectId: string;
    publicReport: string;
}
  

export async function listBug() {
    return requestClient.get('/bug/list');
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
    return requestClient.get<RuleDetail>(`/bug/${id}`);
}

export async function downloadCrash(id: string) {
    return requestClient.get(`/download/crash/${id}`)
}