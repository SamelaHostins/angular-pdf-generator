import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import html2pdf from 'html2pdf.js';
import { CertificadoComponent } from '../certificado/certificado.component';
import { PdfPageComponent } from '../pdf-page/pdf-page.component';

@Component({
  selector: 'app-pdf-certificado',
  templateUrl: './pdf-certificado.component.html',
  styleUrls: ['./pdf-certificado.component.scss']
})
export class PdfCertificadoComponent implements OnInit {

  //tag, no qual será encapsulado o HTML do PDF.
  @ViewChild('certificadoPDF', { static: true, read: ViewContainerRef }) certificadoPDF: ViewContainerRef;

  constructor( private readonly resolver: ComponentFactoryResolver,) { }

  ngOnInit(): void {
  }

  //Lógica de gerar o pdf:
  //é necessário criar uma instância do componente e passar os valores dos atributos
  private createPDF(titulo, nome, nomeDoCurso, nomeDoInstrutor, dataInicial, dataFinal): void {
    this.certificadoPDF.clear();
    const factory = this.resolver.resolveComponentFactory(CertificadoComponent);
    const componentRef = this.certificadoPDF.createComponent(factory);

    componentRef.instance.titulo = titulo;
    componentRef.instance.nome = nome;
    componentRef.instance.nomeDoCurso = nomeDoCurso;
    componentRef.instance.nomeDoInstrutor = nomeDoInstrutor;
    componentRef.instance.dataInicial = dataInicial;
    componentRef.instance.dataFinal = dataFinal;

    //é preciso esperar uma resposta do emitter, p certificar que a instância foi finalizada
    componentRef.instance.emitter.subscribe(() => {
      const config = {
        jsPDF: {  orientation: 'landscape' },
        html2canvas: {
          scale: 1,
        },
      };

      
      this.print(componentRef.location.nativeElement, config);
      componentRef.destroy();
      
    });
  }

     //função que o botão 'gerar pdf' chama
     selectItems(): void {
      const titulo = 'Certificado';
      const nome = 'Sâmela Hostins';
      const nomeDoCurso = 'Como cozinhar um risotto';
      const nomeDoInstrutor = 'Chefe Valdemar';
      const dataInicial = '02-08-2022';
      const dataFinal = '17-08-2022';
  
      //p gerar pdf da pagina
      this.createPDF(titulo, nome, nomeDoCurso, nomeDoInstrutor, dataInicial, dataFinal);
    }

  //o método print vai usar a instância criada pra gerar o pdf
 //método print, que utiliza a biblioteca html2pdf para gerar um pdf
  private print(alement: any, config: any): void {
    html2pdf()
      .set(config)
      .from(alement) //from define a origem (nesse caso o elemento html)
      .toPdf()       //converte a origem no destino especificado
      .outputPdf('dataurlnewwindow');
      //.save('samela.img');
      
  }

}
