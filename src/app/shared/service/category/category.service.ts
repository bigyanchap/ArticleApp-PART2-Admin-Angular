import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { QueryObject } from '../../models/queryObject';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private apiService: ApiService) {}
    getCategoryById(id){
        return this.apiService.get('Category/getCategoryById/'+id);
    }
    getAllCategories() {
        return this.apiService.get('Category/getCategories');
    }
    addCategory(category){
        return this.apiService.post('Category/AddCategory',category);
    }
    editCategory(category){
        return this.apiService.post('Category/UpdateCategory',category);
    }
    deleteCategory(Id){
        return this.apiService.get('Category/delete/'+Id);
    }
}