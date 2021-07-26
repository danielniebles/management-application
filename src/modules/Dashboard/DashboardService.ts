import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

export class DashboardService {
    private baseUrl: string;
    constructor() {
        this.baseUrl = `${process.env.VUE_APP_VERIFIKAR_API}/rchilli/query`;
    }

    async getFiltersResult(searchObject: any) {                    
        const config: AxiosRequestConfig = {
            url: this.baseUrl,
            method: 'post',
            data: searchObject
        }
        const response = await axios.request(config)
        return response.data
    }

}