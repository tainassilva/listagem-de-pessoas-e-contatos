import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListPessoasComponent } from './table-list-pessoas.component';

describe('TableListPessoasComponent', () => {
  let component: TableListPessoasComponent;
  let fixture: ComponentFixture<TableListPessoasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableListPessoasComponent]
    });
    fixture = TestBed.createComponent(TableListPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
