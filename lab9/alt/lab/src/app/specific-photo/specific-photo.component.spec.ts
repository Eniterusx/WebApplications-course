import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPhotoComponent } from './specific-photo.component';

describe('SpecificPhotoComponent', () => {
  let component: SpecificPhotoComponent;
  let fixture: ComponentFixture<SpecificPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificPhotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
