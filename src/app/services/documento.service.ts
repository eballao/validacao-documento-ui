import { Documento } from './../model/documento.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VALIDA_DOCUMENTO_API } from './valida-documento.api';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient) { }

  createOrUpdate(documento:Documento) {
    if(documento.id != null && documento.id != ''){
      return this.http.put(`${VALIDA_DOCUMENTO_API}/api/documento`,documento);
    } else {
      documento.id = '';
      documento.status = 'Ativo';
      return this.http.post(`${VALIDA_DOCUMENTO_API}/api/documento`,documento);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${VALIDA_DOCUMENTO_API}/api/documento${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${VALIDA_DOCUMENTO_API}/api/documento${id}`);
  }

  delete(id:string){
    return this.http.delete(`${VALIDA_DOCUMENTO_API}/api/documento${id}`);
  }

  findByParams(page:number,count:number, doc:Documento){
    doc.numeroDocumento = doc.numeroDocumento == '' ? 'uninformed' : doc.numeroDocumento;
    doc.status = doc.status == '' ? 'uninformed' : doc.status;
    return this.http.get(`${VALIDA_DOCUMENTO_API}/api/documento${page}/${count}/${doc.numeroDocumento}/${doc.status}`);
  }

}
