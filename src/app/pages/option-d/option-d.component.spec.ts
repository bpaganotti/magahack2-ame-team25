import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionDComponent } from './option-d.component';

describe('OptionDComponent', () => {
  let component: OptionDComponent;
  let fixture: ComponentFixture<OptionDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
