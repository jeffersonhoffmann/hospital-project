import { Component, OnInit, EventEmitter, ViewChild, Output, HostListener} from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViaCepService } from '../../shared/services/viacep/viacep.service';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Endereco } from '../../shared/model/endereco.model';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css',
  imports: [
    NgxMaskDirective,
    FormsModule,
    ReactiveFormsModule
  ],
})

export class AutocadastroComponent implements OnInit {
  public endereco: Endereco;
  @ViewChild('formCadastro') formCadastro!: NgForm;
  @Output() close = new EventEmitter<void>();
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private viacepService: ViaCepService,
  ) {
    this.endereco = new Endereco();
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/\(\d{2}\) \d{4,5}-\d{4}/)]]
    });
  }

  ngOnInit(): void {
    this.endereco = new Endereco();
  }

  get nome() {
    return this.cadastroForm.get('nome');
  }

  get email() {
    return this.cadastroForm.get('email');
  }

  get telefone() {
    return this.cadastroForm.get('telefone');
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
    }
  }

  buscaEndereco() {
    this.viacepService.getAddress(this.formCadastro.form.get('cep')?.value)
      .subscribe((address) => {
        this.formCadastro.form.patchValue({
          rua: address.logradouro,
          bairro: address.bairro,
          estado: address.uf,
          cidade: address.localidade
        });
      });
  }

  public onClose(): void {
      this.close.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    this.onClose();
  }

}
