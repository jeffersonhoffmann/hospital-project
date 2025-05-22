import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutocadastroComponent } from '../autocadastro/autocadastro.component'
import { Login, Perfil } from '../../shared/model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../auth/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    AutocadastroComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  public login = new Login();
  public showAutocadastro: boolean = false;
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.loginService.usuarioLogado) {
      this.redirecionaUsuarioLogado();
    }
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.message = params['error'];
      });
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe((usu) => {
        if (usu != null) {
          this.loginService.usuarioLogado = usu;
          this.loading = false;
          this.redirecionaUsuarioLogado();
        } else {
          this.message = "Usuário/Senha inválidos.";
        }
      });
    }
    this.loading = false;
  }

  redirecionaUsuarioLogado() {
    if (this.loginService.usuarioLogado.perfil === Perfil.CLIENTE)
      this.router.navigate(["/pagina-inicial-cliente"]);
    else {
      this.router.navigate(["/pagina-inicial-funcionario"]);
    }
  }

  public onSignUpClick() {
    const url = '/autocadastro';
    this.showAutocadastro = true;
  }

  public closeAutocadastro(){
    this.showAutocadastro = false;
  }
}
