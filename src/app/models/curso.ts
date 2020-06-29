import { Alumno } from './alumno';
import { Examen } from './examen';

export class Curso {
  constructor(
    public id: number = null,
    public nombre: string = null,
    public createAt: string = null,
    public alumnos: Array<Alumno> = null,
    public examenes: Array<Examen> = null
  ) {}
}
