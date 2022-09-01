import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { QueryObject } from '../../models/queryObject';


@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private apiService: ApiService) {}

    getAllCountry() {
        return this.apiService.get('Country/GetAll');
    }
    getCountryById(id: any) {
        return this.apiService.get('Country/GetById/' + id);
    }
    upsertCountry(data: any) {
        return this.apiService.post('Country/UpsertCountry', data);
    }
    deleteCountry(id: any) {
        return this.apiService.post('Country/DeleteCountry/' + id);
    }
    UpsertCountry(data) {
        return this.apiService.post('Country/UpsertCountry', data);
    }
    getCountry(query: QueryObject) {
        return this.apiService.post('Country/CountryItem', query);
    }
}