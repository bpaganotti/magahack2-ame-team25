import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionAComponent } from './option-a.component';

describe('OptionAComponent', () => {
  let component: OptionAComponent;
  let fixture: ComponentFixture<OptionAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
