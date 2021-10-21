import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLancamentosComponent } from './form-lancamentos.component';

describe('FormLancamentosComponent', () => {
  let component: FormLancamentosComponent;
  let fixture: ComponentFixture<FormLancamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLancamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
