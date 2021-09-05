import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

export class DashboardService {
    private baseUrl: string;
    constructor() {
        this.baseUrl = `${process.env.VUE_APP_VERIFIKAR_API}/rchilli`;
    }

    async getFiltersResult(searchObject: any) {
        const config: AxiosRequestConfig = {
            url: `${this.baseUrl}/query`,
            method: 'post',
            data: searchObject
        }
        const response = await axios.request(config)
        return response.data
    }

    async getCandidateInfo(id: string) {
        const response = await axios.get(`${this.baseUrl}/${id}`)
        return response;
    }

    async updateCandidateInfo(id: string, candidateInfo: any) {
        return axios.patch(`${this.baseUrl}/${id}`, candidateInfo)
    }

}