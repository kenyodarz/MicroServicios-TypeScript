export class Asignatura {
  constructor(
    public id: number = null,
    public nombre: string = null,
    public asignatura: Asignatura,
    public asignaturas: Array<Asignatura>
    ) {}
}
