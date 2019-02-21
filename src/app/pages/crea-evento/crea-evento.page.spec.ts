import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaEventoPage } from './crea-evento.page';

describe('CreaEventoPage', () => {
  let component: CreaEventoPage;
  let fixture: ComponentFixture<CreaEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
