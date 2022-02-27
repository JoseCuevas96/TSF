import { AfterViewInit, Component, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServiceService } from 'src/app/service.service';

import { classTypes } from 'src/app/Models/classTypes';
import swal from'sweetalert2';

@Component({
  selector: 'app-ClassTypes',
  templateUrl: './ClassTypes.component.html',
  styleUrls: ['./ClassTypes.component.css']
})
export class ClassTypesComponent implements AfterViewInit {
  registrar: boolean = true;
  displayedColumns: string[] = ['IdType', 'TypeName', 'Actions'];
  dataSource: MatTableDataSource<classTypes>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  modalRef?: BsModalRef;

  types: classTypes[] = [];
  ELEMENT_DATA: classTypes[] = this.types;

  objFiltros: classTypes;
  objClassType: classTypes;

  constructor(private Servicios: ServiceService, private modalService: BsModalService) {
    this.dataSource = new MatTableDataSource();
    this.objFiltros = new classTypes;
    this.objFiltros.IdType = 0;
    this.objFiltros.TypeName = "";
    this.objClassType = new classTypes;
    this.objClassType.IdType = 0;
    this.objClassType.TypeName = "";
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.GetTypes(this.objFiltros);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.objFiltros.TypeName = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  GetTypes(obj: classTypes) {
    this.Servicios.getClassTypes(obj).subscribe((data: any) => {
      this.types = data.message;
      this.ELEMENT_DATA = this.types;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, (error) => {
      // alert(error.error);
      swal.fire(
        'Atention',
        'There was a problem fetching the requested information. Error: ' + error.error,
        'info'
      );
    });
  }
  openModal(template: TemplateRef<any>) {
    this.registrar = true;
    this.modalRef = this.modalService.show(template);
  }

  clickSaveClassType(): void {
    if (this.objClassType.TypeName.trim() !== "" && this.objClassType.TypeName !== null && this.objClassType.TypeName !== undefined) {
      if (this.registrar) {
        // REGISTRAR
        this.Servicios.insertClassType(this.objClassType).subscribe((data: any) => {
          if (data.success === "Ok") {
            // console.log("Success!");
            swal.fire('Complete', 'Class Type Saved!', 'success');
            this.objClassType.IdType = 0;
            this.objClassType.TypeName = "";
            this.GetTypes(this.objFiltros);
            this.modalRef?.hide();
          }
          else {
            swal.fire('Information', 'There was a problem registering class type!', 'info');
            // console.log(data);
          }
        }, (error) => {
          // console.log(error.error);
          swal.fire('Error', error.error, 'error');
        });
      }
      else {
        // MODIFICAR
        if (this.objClassType.IdType !== 0 && this.objClassType.IdType !== null && this.objClassType.IdType !== undefined) {
          this.Servicios.updateClassType(this.objClassType).subscribe((data: any) => {
            if (data.success === "Ok") {
              // console.log("Success!");
              swal.fire('Complete', 'Class Type Modified!', 'success');
              this.objClassType.IdType = 0;
              this.objClassType.TypeName = "";
              this.GetTypes(this.objFiltros);
              this.modalRef?.hide();
            }
            else {
              swal.fire('Information', 'There was a problem modifying class type!', 'info');
              // console.log("There was a problem modifying class type");
            }
          }, (error) => {
            // console.log(error.error);
            swal.fire('Error', error.error, 'error');
          });
        }
        else {
          swal.fire('Information', "Please, Select a Class Type", 'info');
          // console.log("Please, Select a Class Type");
        }
      }
    }
    else {
      swal.fire('Information', "Please, Capture Class Type Name", 'info');
      // console.log("Please, Capture Class Type Name");
    }
  }

  clickEditClassType(row: any, template: TemplateRef<any>): void {
    this.registrar = false;

    this.objClassType.IdType = row.idType;
    this.objClassType.TypeName = row.typeName;
    this.modalRef = this.modalService.show(template);
  }

  clickDeleteClassType(row: any): void {

    this.objClassType.IdType = row.idType;
    this.objClassType.TypeName = row.typeName;

    swal.fire({
      title: '¿Are you sure you want to delete the class type "' + row.typeName + '"?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: "#28A745",
      cancelButtonColor: "#DC3545",
      cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
      confirmButtonText: '<i class="fa fa-check"></i> Aceptar'
    }).then((result) => {
      if (result.value) {
        this.Servicios.deleteClassType(this.objClassType).subscribe((data: any) => {
          if (data.success === "Ok") {
            // console.log("Success!");
            swal.fire('Complete', 'Class Type Deleted!', 'success');
            this.objClassType.IdType = 0;
            this.objClassType.TypeName = "";
            this.GetTypes(this.objFiltros);
          }
          else {
            swal.fire('Information', 'There was a problem deleted class type!', 'info');
            // console.log("There was a problem modifying class type");
          }
        }, (error) => {
          // console.log(error.error);
          swal.fire('Error', 'There was a problem deleted class type! Error: ' + error.error, 'error');
        });
      }
    });
  }
}
