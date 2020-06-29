import { Pregunta } from './pregunta';
import { Alumno } from './alumno';

export class Respuesta {
  constructor(
    public idRespuesta: number = null,
    public texto: string = null,
    public alumno: Alumno = null,
    public pregunta: Pregunta = null
  ) {}
}
