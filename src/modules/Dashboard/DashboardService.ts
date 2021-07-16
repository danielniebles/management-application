import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

export class DashboardService {
    private baseUrl: string;
    constructor() {
        //this.baseUrl = `http://b9a6399b7a4e.ngrok.io/rchilli/query`;
        this.baseUrl = `${process.env.VUE_APP_VERIFIKAR_API}/rchilli/query`;
    }

    async getFiltersResult(searchObject: any) {
        console.log(searchObject);
                    
        const config: AxiosRequestConfig = {
            url: this.baseUrl,
            method: 'post',
            data: searchObject
        }
        const response = await axios.request(config)
        return response.data
    }

}