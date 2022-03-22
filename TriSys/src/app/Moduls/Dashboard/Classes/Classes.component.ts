import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassView } from 'src/app/Models/Class';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Evening, Morning } from 'src/app/Models/ClassTimes';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Instructor } from 'src/app/Models/Instructor.model';
import { InstructorService } from 'src/app/instructor.service';
import { classTypes } from 'src/app/Models/classTypes';
import { Location } from '../../../Models/Location.model';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
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

  type: string = '';
  titleMldClass: string = '';
  myGroup: FormGroup;
  cbxClassType = new Array<classTypes>();
  cbxInstructor = new Array<Instructor>();
  cbxLocation = new Array<Location>();
  objFiltrosTypeClass: classTypes;
  enabledFields: boolean = true;

  constructor(
    private modalService: BsModalService,
    private Servicios: ServiceService,
    private ServicioInstructor: InstructorService,
    public datePipe: DatePipe
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.myGroup = new FormGroup({
      IdClass: new FormControl(''),
      IdClassName: new FormControl('', [Validators.required]),
      IdClassLocation: new FormControl('', [Validators.required]),
      Schedule: new FormControl(new Date(), [Validators.required]),
      MaxStudents: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      StartTime: new FormControl(new Date(), [Validators.required]),
      FinishTime: new FormControl(new Date(), [Validators.required]),
      RegisterCost: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      Enabled: new FormControl(false),
      Spanish: new FormControl(false),
      instructorId: new FormControl('', [Validators.required]),
      Note: new FormControl('', [Validators.required]),
      SearchKey: new FormControl('', [Validators.required])
    });
    this.objFiltrosTypeClass = new classTypes;
    this.objFiltrosTypeClass.IdType = 0;
    this.objFiltrosTypeClass.TypeName = "";
  }


  ngAfterViewInit() {
    this.ConsultarClases();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.loadClassType(this.objFiltrosTypeClass);
    this.loadLocations();
    this.loadInstructors();
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

  async loadClassType(obj: classTypes) {
    this.Servicios.getClassTypes(obj).subscribe((data: any) => {
      const cbxClassTyp = [];
      for (const iterator of data.message) {
        cbxClassTyp.push({
          IdType: iterator.idType,
          TypeName: iterator.typeName
        });
      }
      this.cbxClassType = cbxClassTyp;
    }, (error) => {
      // alert(error.error);
      console.log('There was a problem fetching the requested information. Error: ' + error.error);
    });
  }

  async loadLocations(): Promise<void> {
    this.Servicios.getClassLocations().subscribe(res => {
      const loc = [];
      for (const iterator of res.message) {
        loc.push({
          IdLocation: iterator.idLocation,
          Name: iterator.name,
          Address: iterator.address,
          City: iterator.city,
          State: iterator.state,
          ZIP: iterator.zip
        });
      }
      this.cbxLocation = loc;
    }, (err) => console.error(err));
  }

  async loadInstructors(): Promise<void> {
    await this.ServicioInstructor.getInstructors().subscribe(res => {
      const cbxInstruct = [];
      for (const iterator of res.message) {
        cbxInstruct.push({
          Id: iterator.id,
          IdInstructor: iterator.idInstructor,
          Name: iterator.name
        });
      }
      this.cbxInstructor = cbxInstruct;
    }, (err) => console.error(err));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ClassView): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idClass + 1}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(template: TemplateRef<any>, location?: ClassView) {
    this.clearForm();
    if (location) {
      this.fillForm(location);
      this.type = "edit";
      this.titleMldClass = "Edit class";
      this.modalRef = this.modalService.show(template);
    }
    else {
      this.type = "create";
      this.titleMldClass = "Create new class";
      this.modalRef = this.modalService.show(template);
    }
  }

  viewFullClass(template: TemplateRef<any>, location?: ClassView) {
    this.clearForm();
    if (location) {
      this.fillForm(location);
      this.type = "view";
      this.titleMldClass = "View full class";
      this.enabledMdlCreateClass(false);
      this.modalRef = this.modalService.show(template);
    }
  }

  private enabledMdlCreateClass(enabled: boolean): void {
    this.enabledFields = enabled;
    if (enabled) {
      this.myGroup.controls['IdClass'].enable();
      this.myGroup.controls['IdClassName'].enable();
      this.myGroup.controls['IdClassLocation'].enable();
      this.myGroup.controls['Schedule'].enable();
      this.myGroup.controls['MaxStudents'].enable();
      this.myGroup.controls['StartTime'].enable();
      this.myGroup.controls['FinishTime'].enable();
      this.myGroup.controls['RegisterCost'].enable();
      this.myGroup.controls['Enabled'].enable();
      this.myGroup.controls['Spanish'].enable();
      this.myGroup.controls['instructorId'].enable();
      this.myGroup.controls['Note'].enable();
      this.myGroup.controls['SearchKey'].enable();
    }
    else {
      this.myGroup.controls['IdClass'].disable();
      this.myGroup.controls['IdClassName'].disable();
      this.myGroup.controls['IdClassLocation'].disable();
      this.myGroup.controls['Schedule'].disable();
      this.myGroup.controls['MaxStudents'].disable();
      this.myGroup.controls['StartTime'].disable();
      this.myGroup.controls['FinishTime'].disable();
      this.myGroup.controls['RegisterCost'].disable();
      this.myGroup.controls['Enabled'].disable();
      this.myGroup.controls['Spanish'].disable();
      this.myGroup.controls['instructorId'].disable();
      this.myGroup.controls['Note'].disable();
      this.myGroup.controls['SearchKey'].disable();
    }
  }

  private fillForm(element: any): void {
    this.myGroup.controls['IdClass'].setValue(element.idClass);
    this.myGroup.controls['IdClassName'].setValue(String(element.idClassName));
    this.myGroup.controls['IdClassLocation'].setValue(String(element.idClassLocation));
    this.myGroup.controls['Schedule'].setValue(element.schedule);
    this.myGroup.controls['MaxStudents'].setValue(element.maxStudents);
    const timeStart = new Date();
    timeStart.setHours(element.startTime.split(':')[0]);
    timeStart.setMinutes(element.startTime.split(':')[1]);
    this.myGroup.controls['StartTime'].setValue(timeStart);
    const timeFinish = new Date();
    timeFinish.setHours(element.finishTime.split(':')[0]);
    timeFinish.setMinutes(element.finishTime.split(':')[1]);
    this.myGroup.controls['FinishTime'].setValue(timeFinish);
    this.myGroup.controls['RegisterCost'].setValue(element.registerCost);
    this.myGroup.controls['Enabled'].setValue(element.enabled);
    this.myGroup.controls['Spanish'].setValue(element.spanish);
    this.myGroup.controls['instructorId'].setValue(String(element.idInstructor));
    this.myGroup.controls['Note'].setValue(element.note);
    this.myGroup.controls['SearchKey'].setValue(element.searchKey);
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
    }, (error) => {
      alert(error.error);
    });
  }

  createClasses(): void {
    console.log(this.myGroup.value);
    if (this.myGroup.valid) {
      if (this.type === "create") {
        this.Servicios.insertClass(this.myGroup.value).subscribe(res => {
          if (res.success === "Ok") {
            Swal.fire('Complete', 'Class Saved!', 'success');
            this.ConsultarClases();
            this.clearForm();
            this.type = "";
            this.modalRef?.hide();
          } else {
            Swal.fire('Information', 'There was a problem registering the class!', 'info');
            // console.log(data);
          }
        },
        (err) => console.error(err));
      }
      else if (this.type === "edit") {
        this.Servicios.updateClass(this.myGroup.value).subscribe(res => {
          if (res.success === "Ok") {
            Swal.fire('Complete', 'Class Saved!', 'success');
            this.ConsultarClases();
            this.clearForm();
            this.type = "";
            this.modalRef?.hide();
          } else {
            Swal.fire('Information', 'There was a problem editing the class!', 'info');
            // console.log(data);
          }
        },
        (err) => console.error(err));
      }
    }
  }

  public deleteClass(element: any): void {
    Swal.fire({
      title: 'Are you sure you want to delete the class "' + element.className + '"?',
      text: '',
      icon: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.Servicios.deleteClass(element).subscribe(res => {
          if (res.success === "Ok") {
            Swal.fire('Complete', 'Class deleted!', 'success');
            this.ConsultarClases();
            this.clearForm();
            this.modalRef?.hide();
          }
          else {
            Swal.fire('Information', 'There was a problem deleting the class!', 'info');
          }
        }, (error) => {
          Swal.fire('Error', 'There was a problem deleting the class! Error: ' + error.error, 'error');
        });
      }
    });
  }

  private clearForm(): void {
    this.myGroup.controls['IdClass'].setValue('');
    this.myGroup.controls['IdClassName'].setValue('');
    this.myGroup.controls['IdClassLocation'].setValue('');
    this.myGroup.controls['Schedule'].setValue(new Date());
    this.myGroup.controls['MaxStudents'].setValue(0);
    this.myGroup.controls['StartTime'].setValue(new Date());
    this.myGroup.controls['FinishTime'].setValue(new Date());
    this.myGroup.controls['RegisterCost'].setValue(0);
    this.myGroup.controls['Enabled'].setValue(false);
    this.myGroup.controls['Spanish'].setValue(false);
    this.myGroup.controls['instructorId'].setValue('');
    this.myGroup.controls['Note'].setValue('');
    this.myGroup.controls['SearchKey'].setValue('');
  }

  closeForm(): void {
    this.clearForm();
    this.enabledMdlCreateClass(true);
    this.modalRef?.hide();
  }
}
