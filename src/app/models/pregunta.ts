import { Examen } from './examen'

export class Pregunta {
  constructor(

    public idPregunta: number = null,
    public texto: string = null,
    public examen: Examen = null,
  ){}
}
