import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {TecnicoService} from "../../../services/tecnico.service";
import {Tecnico} from "../../../models/tecnico";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  selectedAdmin: boolean;
  selectedCliente: boolean;
  selectedTecnico: boolean;

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
    this.loadData();
  }

  loadData(): void {
    this.findById()
  }

  findById(): void{
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis.map(x => {
        if(x === 'ADMIN') {
          this.addPerfil(0)
          this.selectedAdmin = true;
        }

        if(x === 'CLIENTE') {
          this.addPerfil(1)
          this.selectedCliente = true;
        }

        if(x === 'TECNICO') {
          this.addPerfil(2)
          this.selectedTecnico = true;
        }
      })
      resposta.perfis = this.tecnico.perfis;
      resposta.senha = '**********'
      this.tecnico = resposta;
      console.log(this.tecnico.perfis)
    })
  }

  update(): void{
    console.log(this.tecnico)
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso', 'Update');
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

  addPerfil(perfil: any): void{
    if(this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(): boolean{
    return this.nome.valid
        && this.cpf.valid
        && this.email.valid
        && this.senha.valid
  }

}
