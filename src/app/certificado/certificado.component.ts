import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit {

    nome: string;
    nomeDoCurso: string;
    nomeDoInstrutor: string;
    dataInicial: string;
    dataFinal: string;
    titulo: string;

  emitter: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.emitter.emit();
  }
}
