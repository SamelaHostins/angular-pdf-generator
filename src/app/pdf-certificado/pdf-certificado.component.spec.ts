import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCertificadoComponent } from './pdf-certificado.component';

describe('PdfCertificadoComponent', () => {
  let component: PdfCertificadoComponent;
  let fixture: ComponentFixture<PdfCertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfCertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
