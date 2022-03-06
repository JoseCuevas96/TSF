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

@Component({
  selector: 'app-ClassLocations',
  templateUrl: './ClassLocations.component.html',
  styleUrls: ['./ClassLocations.component.css']
})
export class ClassLocationsComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<Location>();
  selection = new SelectionModel<Location>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'select', 'idLocation', 'name', 'address', 'city', 'state', 'zip', 'actions'
  ];
  modalRef?: BsModalRef;
  location: FormGroup;
  locationSubscription!: Subscription;

  constructor(
    private modalService: BsModalService,
    private Servicios: ServiceService
  ) {
    this.location = new FormGroup({
      Name: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      State: new FormControl(''),
      City: new FormControl(''),
      ZIP: new FormControl('')
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

  }

  public createLocation(): void {

  }

  public deleteLocation(element: Location): void {

  }

  public displayDialog(template: TemplateRef<any>, location?: Location): void {
    if (location) {
      this.fillForm(location);
      this.modalRef = this.modalService.show(template);
    } else {
      this.modalRef = this.modalService.show(template);
    }
  }

  private fillForm(element: Location): void {
    this.location.controls['Name'].setValue(element.Name);
    this.location.controls['Address'].setValue(element.Address);
    this.location.controls['State'].setValue(element.State);
    this.location.controls['City'].setValue(element.City);
    this.location.controls['ZIP'].setValue(element.ZIP);
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
