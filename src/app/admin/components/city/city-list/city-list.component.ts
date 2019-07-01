import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CityEditComponent } from '../city-edit/city-edit.component';
import { CityAddComponent } from '../city-add/city-add.component';
import { City } from '../../../../home/model/city';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  displayedColumns = ['name', 'state', 'edit', 'delete'];
  cities: City[];
  dataSource = new MatTableDataSource();
  constructor(private utilityService: UtilityService, public dialog: MatDialog) { }

  ngOnInit() {
    this.utilityService.getAllCities().subscribe((cities) => {
      this.cities = cities;
      this.dataSource = new MatTableDataSource(this.cities);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editCity(element: City): void {
    const dialogRef = this.dialog.open(CityEditComponent, {
      width: '250px',
      data: { element }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }


  addCity(): void {
    const dialogRef = this.dialog.open(CityAddComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.utilityService.getAllCities().subscribe((cities) => {
        this.cities = cities;
        this.dataSource = new MatTableDataSource(this.cities);
      });
    });
  }

  delete(element) {
    this.utilityService.deleteCity(element.id).subscribe((city) => {
      this.utilityService.getAllCities().subscribe((cities) => {
        this.cities = cities;
        this.dataSource = new MatTableDataSource(this.cities);
      });
    });
  }


}
