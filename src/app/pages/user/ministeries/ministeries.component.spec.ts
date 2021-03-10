import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisteriesComponent } from './ministeries.component';

describe('MinisteriesComponent', () => {
  let component: MinisteriesComponent;
  let fixture: ComponentFixture<MinisteriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinisteriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinisteriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
