import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.scss']
})
export class PdfPageComponent implements OnInit, AfterViewInit {

  //Aqui ficarão os atributos que receberão as informações que serão inseridas no PDF criado

  //atributo que receberá a lista de carros selecionados 
  priceList: {name: string, curso: string, data: string, checked: boolean}[];
  //receberá o titulo da página
  title: string;

  //avisa qd as informações terminarem de ser processadas no hrml, para que o 
  //html2pdf possa criar o arquivo PDF
  emitter: EventEmitter<void> = new EventEmitter();0

  constructor(

  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.emitter.emit();
  }


}
