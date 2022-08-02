import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import html2pdf from 'html2pdf.js';
import { PdfPageComponent } from '../pdf-page/pdf-page.component';

@Component({
  selector: 'app-pdf-creator',
  templateUrl: './pdf-creator.component.html',
  styleUrls: ['./pdf-creator.component.scss']
})
export class PdfCreatorComponent implements OnInit {

  //tag, no qual será encapsulado o HTML do PDF.
  @ViewChild('priceListPDF', { static: true, read: ViewContainerRef }) priceListPDF: ViewContainerRef;

  //lista com as informações dos carros
  priceList: {name: string, curso: string, data: string, checked: boolean}[] = [
    {
      name: 'Sâmela Hostins',
      curso: 'Aprendendo a andar de cavalo em 10 min',
      data: '17-08-2022',
      checked: false
    },
    {
      name: 'Clovis Anderson',
      curso: 'Como cozinhar um risotto',
      data: '07-06-2022',
      checked: false
    },
    {
      name: 'Fabiana de Oliveira',
      curso: 'Java 2',
      data: '09-03-2022',

      checked: false
    },
  ];

  constructor(
    private readonly resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void { }

  //função que o botão 'gerar pdf' chama
  selectItems(): void {
    const title = '';

    this.createPDF(title, this.priceList.filter(car => car.checked));
  }

  //Lógica de gerar o pdf:
  //é necessário cirar uma instância do componente e passar os valores dos atributos
  private createPDF(title: string, priceList: {name: string, curso: string, data: string, checked: boolean}[]): void {
    this.priceListPDF.clear();
    const factory = this.resolver.resolveComponentFactory(PdfPageComponent);
    const componentRef = this.priceListPDF.createComponent(factory);

    componentRef.instance.title = title;
    componentRef.instance.priceList = priceList;

    //é preciso esperar uma resposta do emitter, p certificar que a instância foi finalizada
    componentRef.instance.emitter.subscribe(() => {
      const config = {
        html2canvas: {
          scale: 1,
          scrollX: 0,
          scrollY: 0,
        },
      };

      
      this.print(componentRef.location.nativeElement, config);
      componentRef.destroy();
    });
  }

  //o método print vai usar a instância criada pra gerar o pdf
 //método print, que utiliza a biblioteca html2pdf para gerar um pdf
  private print(content: any, config: any): void {
    html2pdf()
      .set(config)
      .from(content)
      .toPdf()
      .outputPdf('dataurlnewwindow');
  }
}
