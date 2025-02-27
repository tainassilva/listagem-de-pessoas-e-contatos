import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePessoasComponent } from './table-pessoas.component';

describe('TablePessoasComponent', () => {
  let component: TablePessoasComponent;
  let fixture: ComponentFixture<TablePessoasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePessoasComponent]
    });
    fixture = TestBed.createComponent(TablePessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
