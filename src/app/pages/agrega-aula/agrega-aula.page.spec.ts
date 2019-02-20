import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaAulaPage } from './agrega-aula.page';

describe('AgregaAulaPage', () => {
  let component: AgregaAulaPage;
  let fixture: ComponentFixture<AgregaAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregaAulaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
