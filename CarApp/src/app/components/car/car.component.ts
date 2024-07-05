import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  listCars: any[] = [
    { model: 'chevy', brand: 'chevrolet', year: 1998 },
    { model: 'Tsuru', brand: 'Nissan', year: 2003 },
  ];
  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      brand: ['',Validators.required],
      year: ['',[Validators.max(2099),Validators.min(1900),Validators.required]],
      model: ['',Validators.required],
    });
  }

  ngOnInit(): void {}

  addCar() {
    const car: any = {
      brand: this.form.get('brand')?.value,
      model: this.form.get('model')?.value,
      year: this.form.get('year')?.value,
    };
    
    this.listCars.push(car);
    this.toastr.success('Car was saved succesfully!', 'Car Saved'); 
    this.form.reset();
  }
}
