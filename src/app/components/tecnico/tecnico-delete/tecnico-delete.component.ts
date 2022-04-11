import { Component, OnInit } from '@angular/core';
import {Tecnico} from "../../../models/tecnico";
import {FormControl, Validators} from "@angular/forms";
import {TecnicoService} from "../../../services/tecnico.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
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
      private service: TecnicoService,
      private toast: ToastrService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = []
      resposta.senha = '**********'
      this.tecnico = resposta;
    })
  }

  delete(): void{
    this.service.delete(this.tecnico).subscribe(() => {
      this.toast.success('Técnico deletado com sucesso', 'Delete');
      this.router.navigate(['tecnicos']);
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
