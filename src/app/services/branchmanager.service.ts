import { Injectable } from '@angular/core';
import { Branchmanager } from '../models/branchmanager';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchmanagerService {

  private baseUrl = 'http://localhost:8080/branchmanagers';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private branchmanager: Branchmanager;

  constructor(private data: HttpClient) { }

  getBranchmanagers() {
    return this.data.get<Branchmanager[]>(this.baseUrl + '/branchmanagers');
  }

  countBranchmanagers(id: number) {
    return this.data.get<Branchmanager>(this.baseUrl + '/count/branch/' + id);
  }

  getBranchmanagerBySchool(id: number) {
    return this.data.get<Branchmanager[]>(this.baseUrl + '/school/' + id);
  }

  getBranchmanagerByBranch(id: number) {
    return this.data.get<Branchmanager[]>(this.baseUrl + '/school/branch/' + id);
  }

  getBranchmanager(id: number) {
    return this.data.get<Branchmanager>(this.baseUrl + '/branchmanagers/' + id);
  }

  deletebrBranchmanager(id: number) {
    return this.data.delete<Branchmanager>(this.baseUrl + '/branchmanagers/' + id);
  }

  addBranchmanager(branchmanger: Branchmanager) {
    return this.data.post<Branchmanager>(this.baseUrl + '/branchmanagers', JSON.stringify(branchmanger), {headers: this.headers});
  }

  addBranchmanagerBySchool(branchmanger: Branchmanager, id: number) {
    return this.data.post<Branchmanager>(this.baseUrl + '/branchmanagers/' + id, JSON.stringify(branchmanger), {headers: this.headers});
  }

  addBranchmanagerBySchoolByBranch(branchmanger: Branchmanager, school: number, branch: number) {
    // tslint:disable-next-line: max-line-length
    return this.data.post<Branchmanager>(this.baseUrl + '/branchmanagers/' + school + '/' + branch, JSON.stringify(branchmanger), {headers: this.headers});
  }

  updateBranchmanager(branchmanager: Branchmanager) {
    return this.data.put<Branchmanager>(this.baseUrl + '/branchmanagers', JSON.stringify(branchmanager), {headers: this.headers});
  }
}
