import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ventas } from 'src/app/models/venta';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.css']
})
export class NewVentaComponent implements OnInit {
  myForm!:FormGroup;
  color="accent";


  constructor(
    private fb:FormBuilder,
    private ventaService: VentaService,
    private router:Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      numero:['',[Validators.required]],
      producto:['',[Validators.required]],
      cantidad:['',[Validators.required]],
      precio:['',[Validators.required]],
 

    })
  }

  saveVenta():void{
    const ventas:Ventas={
      numero:this.myForm.get('numero')?.value,
      producto:this.myForm.get('producto')?.value,
      cantidad:this.myForm.get('cantidad')?.value,
      precio:this.myForm.get('precio')?.value,
      total: this.total(this.myForm.get('cantidad')?.value,this.myForm.get('precio')?.value),
    };

    this.ventaService.newVenta(ventas)
    .subscribe({
      next:(ventas) =>{
        this.snackBar.open("Registro OK", '',{
          duration: 3000,
        })
      },
      error:(err) =>{
        console.log(err);
      }
    })
  }
  total(cantidad:number,precio:number){
    return cantidad*precio;

}
}
