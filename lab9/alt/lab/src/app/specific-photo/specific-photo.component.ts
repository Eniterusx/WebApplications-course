import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-specific-photo',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './specific-photo.component.html',
  styleUrl: './specific-photo.component.css'
})
export class SpecificPhotoComponent {
  id: number;
  url: string = '';
  body: string;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.id = 0;
    this.body = "";
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);


    this.http.get('https://jsonplaceholder.typicode.com/photos/' + this.id)
      .subscribe(response => {
        let out: any = response;

        this.url = out.url;
        this.body = out.title;
      });
  }
}
