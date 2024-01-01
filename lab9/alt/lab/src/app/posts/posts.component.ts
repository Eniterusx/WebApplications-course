import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  public posts: any;

  constructor(private http: HttpClient) {
    const storedPosts = localStorage.getItem('posts');
    this.posts = storedPosts ? JSON.parse(storedPosts) : [];
    if (!this.posts.length) {
      this.http.get('https://jsonplaceholder.typicode.com/posts')
        .subscribe(response => {
          this.posts = response;
          this.posts = this.posts.slice(0, 40);
          localStorage.setItem('posts', JSON.stringify(this.posts));
        });
    }
  }

  addPost(value: any) {
    const highestId = Math.max(...this.posts.map((post: any) => post.id));
    value.id = highestId + 1;
    this.http.post('https://jsonplaceholder.typicode.com/posts', value)
      .subscribe((response: any) => {
        response.id = value.id;
        this.posts.push(response);
        localStorage.setItem('posts', JSON.stringify(this.posts));
        console.log(response);
      }, error => {
        console.error(error);
      });
  }
}
