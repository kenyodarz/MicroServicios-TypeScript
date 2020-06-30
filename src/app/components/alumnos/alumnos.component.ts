// Angular
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
// Services
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlumnoService } from 'src/app/services/alumno.service';
// Models
import { Alumno } from 'src/app/models/alumno';
// Utils
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit {
  alumnos: Alumno[];
  alumno: Alumno;
  selectedAlumno: Alumno;
  items: MenuItem[];
  cols: any[];
  displayModal: boolean;
  alumnoForm: FormGroup;

  titulo = 'Listado De Alumnos';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private alumnoService: AlumnoService,
    private formBulder: FormBuilder
  ) {}

  obtenerAlumnos() {
    this.alumnoService.getAll().subscribe(
      (result: Alumno[]) => {
        let alumnos: Alumno[] = [];
        for (let index = 0; index < result.length; index++) {
          let alumno = result[index] as Alumno;
          alumnos.push(alumno);
        }
        this.alumnos = alumnos.sort(function (a, b) {
          if (a.idAlumnos > b.idAlumnos) {
            return 1;
          }
          if (a.idAlumnos < b.idAlumnos) {
            return -1;
          }
          return 0;
        });
        console.log(this.alumnos);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarAlumno() {
    this.alumnoService.save(this.alumno).subscribe(
      (result: Alumno) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail:
            'El alumno: ' +
            result.idAlumnos +
            ' ha sido guardado correctamente',
        });
        this.displayModal = false;
        this.validarAlumno(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  validarAlumno(result: Alumno) {
    let index = this.alumnos.findIndex((e) => e.idAlumnos === result.idAlumnos);
    if (index != -1) {
      this.alumnos[index] = result;
    } else {
      this.alumnos.push(result);
    }
    this.alumnoForm.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.alumnoForm.reset();
    if (editar) {
      if (
        this.selectedAlumno !== null &&
        this.selectedAlumno.idAlumnos !== null
      ) {
        this.alumnoForm.patchValue(this.selectedAlumno);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar un Alumno',
        });
        return;
      }
    } else {
      this.alumno = new Alumno();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.alumno = this.alumnoForm.value;
    console.log(this.alumno);
    this.guardarAlumno();
  }

  eliminar() {
    if (
      this.selectedAlumno === null ||
      this.selectedAlumno.idAlumnos === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe seleccionar un Alumno',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el Alumno?',
      accept: () => {
        this.alumnoService
          .delete(this.selectedAlumno.idAlumnos)
          .subscribe((result: Alumno) => {
            this.messageService.add({
              severity: 'success',
              summary: '¡Correcto!',
              detail:
                'El alumno: ' +
                result.idAlumnos +
                ' ha sido eliminado correctamente',
            });
            this.eliminarAlumno(result.idAlumnos);
          });
      },
    });
  }
  eliminarAlumno(idAlumnos: number) {
    let index = this.alumnos.findIndex((e) => e.idAlumnos === idAlumnos);
    if (index != -1) {
      this.alumnos.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.obtenerAlumnos();
    this.alumnoForm = this.formBulder.group({
      idAlumnos: new FormControl(),
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      createAt: new FormControl(),
    });
    this.selectedAlumno = null;
    this.cols = [
      { field: 'idAlumnos', header: 'ID' },
      { field: 'nombre', header: 'NOMBRE' },
      { field: 'apellido', header: 'APELLIDO' },
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
        command: () => this.obtenerAlumnos(),
      },
    ];
  }
}
