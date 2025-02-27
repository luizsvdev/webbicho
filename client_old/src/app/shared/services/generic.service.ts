import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestBuilder} from '../utils/request-builder';
import {Page} from '../interfaces/page';
import {GenericEntity} from '../models/entities/generic-entity';
import {WhereParam} from '../types/where-param';

@Injectable({
	providedIn: 'root'
})
export abstract class GenericService<T extends GenericEntity> {
	
	http: HttpClient;
	
	abstract endpoint: string;
	
	protected constructor(
			http: HttpClient
	) {
		this.http = http;
	}
	
	getList(
			skip: number = 0,
			take: number = 10,
			searchParams: WhereParam<T>[] = [],
			sortParams: any[] = []
	): Observable<Page<T>> {
		return new RequestBuilder<Page<T>>(this.http)
				.setEndpoint(this.endpoint)
				.addHeader('search-params', JSON.stringify(searchParams))
				.addHeader('sort-params', JSON.stringify(sortParams))
				.doGet();
	}
	
	// getById(id: string): Observable<T> {
	//   return this.http.get<T>(`${this.endpoint()}/${id}`);
	// }
	//
	// create(item: T): Observable<T> {
	//   return this.http.post<T>(this.endpoint(), item);
	// }
	//
	// update(id: string, item: T): Observable<T> {
	//   return this.http.put<T>(`${this.endpoint()}/${id}`, item);
	// }
	//
	// delete(id: string): Observable<void> {
	//   return this.http.delete<void>(`${this.endpoint()}/${id}`);
	// }
}
