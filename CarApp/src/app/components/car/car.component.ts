import { NgFor, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  action: string = 'Add';
  id:number | undefined;
  listCars: any[] = [
    { model: 'chevy', brand: 'chevrolet', year: 1998 },
    { model: 'Tsuru', brand: 'Nissan', year: 2003 },
  ];
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _carService: CarService
  ) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      year: [
        '',
        [Validators.max(2099), Validators.min(1900), Validators.required],
      ],
      model: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCars();
  }

  addCar() {
    const car: any = {
      brand: this.form.get('brand')?.value,
      model: this.form.get('model')?.value,
      year: this.form.get('year')?.value,
    };
    if (this.id) {
      car.id=this.id;
      this._carService.update(car).subscribe(data=>{
        this.toastr.info(
          `${data.brand} ${data.model} ${data.year} was updated succesfully!`,
          'Car Updated'
        );
        this.form.reset();
        this.getCars();
        this.action="Add";
        this.id = undefined;
      })
    } else {
      //this.listCars.push(car);
      this._carService.create(car).subscribe((data) => {
        this.toastr.success(
          `${data.brand} ${data.model} ${data.year} was saved succesfully!`,
          'Car Saved'
        );
        this.form.reset();
        this.getCars();
      });
    }
  }

  removeCar(id: number) {
    //this.listCars.splice(id, 1);
    this._carService.delete(id).subscribe(
      (data) => {
        this.toastr.error(
          `${data.brand} ${data.model} ${data.year} was eliminated succesfully!`,
          'Car Deleted'
        );
        this.getCars();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editCar(car: any) {
    this.form.patchValue({
      brand: car.brand,
      model: car.model,
      year: car.year,      
    });
    this.action = 'Edit';
    this.id= car.id;
  }

  getCars() {
    this._carService.getListCars().subscribe(
      (data) => {
        this.listCars = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
