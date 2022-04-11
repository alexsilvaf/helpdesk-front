import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../../models/cliente";
import {FormControl, Validators} from "@angular/forms";
import {ClienteService} from "../../../services/cliente.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new  FormControl(null, Validators.minLength(3));
  cpf: FormControl = new                 FormControl(null,Validators.required);
  email: FormControl = new                 FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
      private service: ClienteService,
      private toast: ToastrService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById(): void{
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = []
      resposta.senha = '**********'
      this.cliente = resposta;
    })
  }

  delete(): void{
    this.service.delete(this.cliente).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso', 'Delete');
      this.router.navigate(['clientes']);
    }, ex => {
      console.log(ex)
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message)
      }
    });
  }

}
