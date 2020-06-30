// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
// Services
import { ConfirmationService, MessageService } from 'primeng/api';
import { CursoService } from 'src/app/services/curso.service';
// Models
import { Curso } from 'src/app/models/curso';
// Utils
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos: Curso[];
  curso: Curso;
  selectedCurso: Curso;
  items: MenuItem[];
  cols: any[];
  displayModal: boolean;
  cursoForm: FormGroup;

  titulo = 'Listado De Cursos';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBulder: FormBuilder,
    private cursoService: CursoService
  ) {}

  obtenerCursos() {
    this.cursoService.getAll().subscribe(
      (result: Curso[]) => {
        let cursos: Curso[] = [];
        for (let index = 0; index < result.length; index++) {
          let curso = result[index];
          cursos.push(curso);
        }
        this.cursos = cursos.sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
          return 0;
        });
        console.log(this.cursos);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarCurso() {
    this.cursoService.save(this.curso).subscribe(
      (result: Curso) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail:
            'El Curso ' +
            result.id +
            ' - ' +
            result.nombre +
            ' ha sido Guardado Correctamente',
        });
        this.displayModal = false;
        this.validarCurso(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  validarCurso(result: Curso) {
    let index = this.cursos.findIndex((e) => e.id === result.id);
    if ((index != -1)) {
      this.cursos[index] = result;
    } else {
      this.cursos.push(result);
    }
    this.cursoForm.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.cursoForm.reset();
    if (editar) {
      if (this.selectedCurso !== null && this.selectedCurso.id !== null) {
        this.cursoForm.patchValue(this.selectedCurso);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe Seleccionar un Curso',
        });
      }
    } else {
      this.curso = new Curso();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.curso = this.cursoForm.value;
    this.guardarCurso();
    this.selectedCurso = null
  }

  eliminar() {
    if (this.selectedCurso === null || this.selectedCurso === null) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un Curso',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el Curso?',
      accept: () => {
        this.cursoService
          .delete(this.selectedCurso.id)
          .subscribe((result: Curso) => {
            this.messageService.add({
              severity: 'success',
              summary: '¡Correcto!',
              detail:
                'El curso ' +
                result.nombre +
                ' ha sido eliminado correctamente',
            });
            this.eliminarCurso(result.id);
          });
      },
    });
  }
  eliminarCurso(id: number) {
    let index = this.cursos.findIndex((e) => e.id === id);
    if (index != -1) {
      this.cursos.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.obtenerCursos();
    this.cursoForm = this.formBulder.group({
      id: new FormControl(),
      nombre: new FormControl(null, Validators.required),
      createAt: new FormControl(),
      alumnos: new FormControl(),
      examenes: new FormControl(),
    });
    this.selectedCurso = null;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'nombre', header: 'NOMBRE' },
      { field: 'createAt', header: 'CREADO EN' },
    ];
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.mostrarDialogoGuardar(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.mostrarDialogoGuardar(true),
      },
      {
        label: 'Borrar',
        icon: 'pi pi-fw pi-trash',
        command: () => this.eliminar(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerCursos(),
      },
    ];
  }
}
