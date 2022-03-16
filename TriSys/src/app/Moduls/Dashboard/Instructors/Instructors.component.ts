
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Instructor } from 'src/app/Models/Instructor.model';
import { InstructorService } from 'src/app/instructor.service';

@Component({
  selector: 'app-Instructors',
  templateUrl: './Instructors.component.html',
  styleUrls: ['./Instructors.component.css']
})
export class InstructorsComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<Location>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'idInstructor', 'name', 'actions'];
  modalRef?: BsModalRef;
  instructor: FormGroup;
  instructorSubscription!: Subscription;
  instructorSub!: Subscription;
  instructors: Instructor[] = [];
  ELEMENT_DATA: Instructor[] = this.instructors;
  type: string = "";
  title: string = "";

  constructor(
    private modalService: BsModalService,
    private Servicios: InstructorService
  ) {
    this.instructor = new FormGroup({
      Id: new FormControl(),
      IdInstructor: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Name: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  ngOnInit() {
    this.loadInstructors();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.instructorSubscription?.unsubscribe();
  }

  private loadInstructors(): void {
    this.instructorSubscription = this.Servicios.getInstructors().subscribe(res => {
      this.dataSource.data = res.message;
    }, (err) => console.error(err));
  }

  public createInstructor(): void {
    if (this.instructor.valid) {
      if (this.type === "create") {
        this.instructorSub = this.Servicios.insertInstructor(this.instructor.value).subscribe(res => {
          if (res.success === "Ok") {
            Swal.fire('Complete', 'Instructor Saved!', 'success');
            this.loadInstructors();
            this.clearForm();
            this.type = "";
            this.modalRef?.hide();
          } else {
            Swal.fire('Information', 'There was a problem registering the instructor!', 'info');
            // console.log(data);
          }
        },
        (err) => console.error(err));
      }
      else if (this.type === "edit") {
        this.instructorSub = this.Servicios.updateInstructor(this.instructor.value).subscribe(res => {
          if (res.success === "Ok") {
            Swal.fire('Complete', 'Instructor Saved!', 'success');
            this.loadInstructors();
            this.clearForm();
            this.type = "";
            this.modalRef?.hide();
          } else {
            Swal.fire('Information', 'There was a problem editing the instructor!', 'info');
            // console.log(data);
          }
        },
        (err) => console.error(err));
      }
    }
  }

  public editLocation(): void {
    this.instructorSub = this.Servicios.updateInstructor(this.instructor.value).subscribe(res => {
      if (res.success === "Ok") {
        Swal.fire('Complete', 'Instructor Saved!', 'success');
        this.loadInstructors();
        this.clearForm();
        this.modalRef?.hide();
      } else {
        Swal.fire('Information', 'There was a problem editing the instructor!', 'info');
      }
    },
    (err) => console.error(err));
  }

  public deleteLocation(element: any): void {
    Swal.fire({
      title: 'Are you sure you want to delete the instructor "' + element.name + '"?',
      text: '',
      icon: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.Servicios.deleteInstructor(element).subscribe(res => {
          if (res.success === "Ok") {
            Swal.fire('Complete', 'Instructor deleted!', 'success');
            this.loadInstructors();
            this.clearForm();
            this.modalRef?.hide();
          }
          else {
            Swal.fire('Information', 'There was a problem deleting the instructor!', 'info');
            // console.log("There was a problem modifying class type");
          }
        }, (error) => {
          // console.log(error.error);
          Swal.fire('Error', 'There was a problem deleting the instructor! Error: ' + error.error, 'error');
        });
      }
    });
  }

  public displayDialog(template: TemplateRef<any>, location?: Instructor): void {
    if (location) {
      this.fillForm(location);
      this.type = "edit";
      this.title = "Edit instructor";
      this.modalRef = this.modalService.show(template);
    } else {
      this.type = "create";
      this.title = "Create new instructor";
      this.modalRef = this.modalService.show(template);
    }
  }

  private fillForm(element: any): void {
    this.instructor.controls['Id'].setValue(element.id);
    this.instructor.controls['IdInstructor'].setValue(element.idInstructor);
    this.instructor.controls['Name'].setValue(element.name);
  }

  private clearForm(): void {
    this.instructor.controls['Id'].setValue("");
    this.instructor.controls['IdInstructor'].setValue("");
    this.instructor.controls['Name'].setValue("");
  }

  closeForm(): void {
    this.clearForm();
    this.modalRef?.hide();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
