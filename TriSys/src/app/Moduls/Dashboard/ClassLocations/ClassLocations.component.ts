import { ServiceService } from './../../../service.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef, OnDestroy } from '@angular/core';
import { Location } from '../../../Models/Location.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ClassLocations',
  templateUrl: './ClassLocations.component.html',
  styleUrls: ['./ClassLocations.component.css']
})
export class ClassLocationsComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<Location>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'select', 'idLocation', 'name', 'address', 'city', 'state', 'zip', 'actions'
  ];
  modalRef?: BsModalRef;
  location: FormGroup;
  locationSubscription!: Subscription;
  classLocationSub!: Subscription;
  classLocations: Location[] = [];
  ELEMENT_DATA: Location[] = this.classLocations;
  type: string = "";
  title: string = "";

  constructor(
    private modalService: BsModalService,
    private Servicios: ServiceService
  ) {
    this.location = new FormGroup({
      IdLocation: new FormControl(),
      Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      Address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      State: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      City: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      ZIP: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });
  }

  ngOnInit() {
    this.loadLocations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.locationSubscription?.unsubscribe();
  }

  private loadLocations(): void {
    this.locationSubscription = this.Servicios.getClassLocations().subscribe(res => {
      this.dataSource.data = res.message;
    }, (err) => console.error(err));
  }

  public createLocation(): void {
    if (this.type === "create") {
      this.classLocationSub = this.Servicios.insertClassLocation(this.location.value).subscribe(res => {
        console.log(res);
        if (res.success === "Ok") {
          Swal.fire('Complete', 'Class location Saved!', 'success');
          this.loadLocations();
          this.clearForm();
          this.type = "";
          this.modalRef?.hide();
        } else {
          Swal.fire('Information', 'There was a problem registering class location!', 'info');
          // console.log(data);
        }
      },
      (err) => console.error(err));
    }
    else if (this.type === "edit") {
      this.classLocationSub = this.Servicios.updateClassLocation(this.location.value).subscribe(res => {
        console.log(res);
        if (res.success === "Ok") {
          Swal.fire('Complete', 'Class location Saved!', 'success');
          this.loadLocations();
          this.clearForm();
          this.type = "";
          this.modalRef?.hide();
        } else {
          Swal.fire('Information', 'There was a problem editing class location!', 'info');
          // console.log(data);
        }
      },
      (err) => console.error(err));
    }
  }

  public editLocation(): void {
    this.classLocationSub = this.Servicios.updateClassLocation(this.location.value).subscribe(res => {
      console.log(res);
      if (res.success === "Ok") {
        Swal.fire('Complete', 'Class location Saved!', 'success');
        this.loadLocations();
        this.clearForm();
        this.modalRef?.hide();
      } else {
        Swal.fire('Information', 'There was a problem editing class location!', 'info');
      }
    },
    (err) => console.error(err));
  }

  public deleteLocation(element: any): void {
    Swal.fire({
      title: 'Are you sure you want to delete the class location "' + element.name + '"?',
      text: '',
      icon: 'question',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.Servicios.deleteClassLocation(element).subscribe(res => {
          if (res.success === "Ok") {
            Swal.fire('Complete', 'Class location deleted!', 'success');
            this.loadLocations();
            this.clearForm();
            this.modalRef?.hide();
          }
          else {
            Swal.fire('Information', 'There was a problem deleting class location!', 'info');
            // console.log("There was a problem modifying class type");
          }
        }, (error) => {
          // console.log(error.error);
          Swal.fire('Error', 'There was a problem deleting class type! Error: ' + error.error, 'error');
        });
      }
    });
  }

  public displayDialog(template: TemplateRef<any>, location?: Location): void {
    if (location) {
      this.fillForm(location);
      this.type = "edit";
      this.title = "Edit class location";
      this.modalRef = this.modalService.show(template);
    } else {
      this.type = "create";
      this.title = "Create new class location";
      this.modalRef = this.modalService.show(template);
    }
  }

  private fillForm(element: any): void {
    this.location.controls['IdLocation'].setValue(element.idLocation);
    this.location.controls['Name'].setValue(element.name);
    this.location.controls['Address'].setValue(element.address);
    this.location.controls['State'].setValue(element.state);
    this.location.controls['City'].setValue(element.city);
    this.location.controls['ZIP'].setValue(element.zip);
  }

  private clearForm(): void {
    this.location.controls['IdLocation'].setValue("");
    this.location.controls['Name'].setValue("");
    this.location.controls['Address'].setValue("");
    this.location.controls['State'].setValue("");
    this.location.controls['City'].setValue("");
    this.location.controls['ZIP'].setValue("");
  }

  closeForm(): void {
    this.clearForm();
    this.modalRef?.hide();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  checkboxLabel(row?: Location): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.IdLocation + 1}`;
  }
}
