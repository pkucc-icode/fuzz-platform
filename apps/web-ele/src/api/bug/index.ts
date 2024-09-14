import { requestClient } from '#/api/request';

export async function getBugDetail(id: number) {
    return requestClient.get(`/bug/${id}`);
}