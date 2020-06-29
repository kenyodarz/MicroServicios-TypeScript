import { Pregunta } from './pregunta'
import { Asignatura } from './asignatura'

export class Examen {
  constructor(
    public id: number = null,
    public nombre: string = null,
    public createAt: string = null,
    public preguntas: Array<Pregunta> = null,
    public asignatura: Asignatura = null,
    public respondido: boolean = null
  ) {}
}
