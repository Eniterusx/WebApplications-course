import { Component } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {

  public photos: any;

  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .subscribe(response => {
        console.log(response)
        this.photos = response;
        this.photos = this.photos.slice(0, 40)
      });
  }
}
