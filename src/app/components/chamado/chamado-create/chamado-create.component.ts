import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Cliente} from "../../../models/cliente";
import {Tecnico} from "../../../models/tecnico";
import {ClienteService} from "../../../services/cliente.service";
import {TecnicoService} from "../../../services/tecnico.service";
import {ChamadoService} from "../../../services/chamado.service";
import {Chamado} from "../../../models/chamado";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status:     '',
    titulo:     '',
    observacoes:  '',
    tecnico:    '',
    cliente:    '',
    nomeTecnico:    '',
    nomeCliente:    '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status:     FormControl = new FormControl(null, [Validators.required])
  titulo:     FormControl = new FormControl(null, [Validators.required])
  observacoes:  FormControl = new FormControl(null, [Validators.required])
  tecnico:    FormControl = new FormControl(null, [Validators.required])
  cliente:    FormControl = new FormControl(null, [Validators.required])

  constructor(
      private chamadoService: ChamadoService,
      private clienteService: ClienteService,
      private tecnicoService: TecnicoService,
      private toast:           ToastrService,
      private router:                 Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(){
    this.chamadoService.create(this.chamado).subscribe(() => {
      this.toast.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid
        && this.status.valid
        && this.titulo.valid
        && this.observacoes.valid
        && this.tecnico.valid
        && this.cliente.valid
  }
}
