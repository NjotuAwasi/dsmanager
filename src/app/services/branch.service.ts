import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Branch } from '../models/branch';
import { Branchmanager } from '../models/branchmanager';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrl = 'http://localhost:8080/branches';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private branch: Branch;
  constructor(private data: HttpClient) { }

  getBranches() {
    return this.data.get<Branch[]>(this.baseUrl + '/branches');
  }

  countInstructors(id: number) {
    return this.data.get(this.baseUrl + '/count/branch/' + id);
  }

  countBranchesBySchool(id: number) {
    return this.data.get<number>(this.baseUrl + '/count/' + id);
  }

  getBranchesBySchool(id: number) {
    return this.data.get<Branch[]>(this.baseUrl + '/branches/' + id);
  }
  getBranch(id: number) {
    return this.data.get<Branch>(this.baseUrl + '/branch/' + id);
  }

  deleteBranch(id: number) {
    return this.data.delete<Branch>(this.baseUrl + '/branches/' + id);
  }

  addBranch(branch: Branch, id: number) {
    return this.data.post<Branch>(this.baseUrl + '/branches/' + id, JSON.stringify(branch), {headers: this.headers});
  }
  updateBranch(branch: Branch, id: number) {
    return this.data.put<Branch>(this.baseUrl + '/branches/' + id, JSON.stringify(branch), {headers: this.headers});
  }
}
