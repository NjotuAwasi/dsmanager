import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8080/reviews';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private review: Review;

  constructor(private data: HttpClient) { }

  getReviews() {
    return this.data.get<Review[]>(this.baseUrl + '/reviews');
  }

  getReviewsBySchool(id: number) {
    return this.data.get<Review[]>(this.baseUrl + '/reviews/' + id);
  }
  getReview(id: number) {
    return this.data.get<Review>(this.baseUrl + '/review/' + id);
  }

  deleteReview(id: number) {
    return this.data.delete<Review>(this.baseUrl + '/reviews/' + id);
  }

  addReview(review: Review, id: number, user: number) {
    return this.data.post<Review>(this.baseUrl + '/reviews/' + id + '/' + user, JSON.stringify(review), {headers: this.headers});
  }
  updateReview(review: Review) {
    return this.data.put<Review>(this.baseUrl + '/reviews', JSON.stringify(review), {headers: this.headers});
  }
}
