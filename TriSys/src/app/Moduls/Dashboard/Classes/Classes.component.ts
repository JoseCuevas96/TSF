import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassView } from 'src/app/Models/Class';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Evening, Morning } from 'src/app/Models/ClassTimes';
import { ServiceService } from 'src/app/service.service';
@Component({
  selector: 'app-Classes',
  templateUrl: './Classes.component.html',
  styleUrls: ['./Classes.component.css']
})
export class ClassesComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'Class ID', 'Class Name', 'Location', 'Date', 'Start Date', 'Students Enrolled', 'Actions'];
  dataSource: MatTableDataSource<ClassView>;
  selection = new SelectionModel<ClassView>(true, []);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  modalRef?: BsModalRef;
  mytime: Date = new Date();
  mytime2: Date = new Date();
  MorningTimes = new Morning();
  EveningTimes = new Evening();
  classes: ClassView[] = [];
  ELEMENT_DATA: ClassView[] = this.classes;
  constructor(private modalService: BsModalService, private Servicios: ServiceService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }


  ngAfterViewInit() {
    this.ConsultarClases();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ClassView): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.IdClass + 1}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ConsultarClases(){
    this.Servicios.getClasses().subscribe((data: any) => {
      this.classes = data.message;
      this.ELEMENT_DATA = this.classes;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    },
      (error) => {
        alert(error.error)
        /*Swal.fire(
          'Atención',
          'Ocurrió un problema al buscar la información solicitada. Error: ' + error.error,
          'info'
        );*/
      });
  }
}