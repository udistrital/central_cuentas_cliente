import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public rechazarFormulario?: boolean;
  public aprobacionesElegidas?: Object [];
}
