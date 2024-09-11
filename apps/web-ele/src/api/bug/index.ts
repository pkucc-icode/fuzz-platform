import { requestClient } from '#/api/request';

export async function getBug(id: number) {
    return requestClient.get(`/bug/${id}`);
}