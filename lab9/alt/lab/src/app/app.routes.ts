import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {PostsComponent} from "./posts/posts.component";
import {PhotosComponent} from "./photos/photos.component";
import {SpecificPhotoComponent} from "./specific-photo/specific-photo.component";
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'photos', component: PhotosComponent, pathMatch: 'full' },
  { path: 'photos/:id', component: SpecificPhotoComponent },
];

export const routing = RouterModule.forRoot(routes);
