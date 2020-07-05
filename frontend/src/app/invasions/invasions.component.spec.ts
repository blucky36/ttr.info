import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvasionsComponent } from './invasions.component';

describe('InvasionsComponent', () => {
  let component: InvasionsComponent;
  let fixture: ComponentFixture<InvasionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvasionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvasionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
