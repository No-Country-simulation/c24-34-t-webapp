import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../../models/category";

@Injectable({
    providedIn: 'root'
})

export class CategoriesService {
    constructor(
        private http: HttpClient
    ) {}

    getAllCategories() {
        return this.http.get<Category[]>('https://life-swap-back.vercel.app/api/v1/categories')
    }
}