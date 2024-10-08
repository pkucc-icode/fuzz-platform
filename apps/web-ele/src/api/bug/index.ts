import { requestClient } from '#/api/request';

export async function getBugDetail(id: string) {
    return requestClient.get(`/bug/${id}`);
}

export async function downloadCrash(id: string) {
    return requestClient.get(`/download/crash/${id}`)
}