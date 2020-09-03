import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  //utilizada para o <form>
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput:ElementRef<HTMLInputElement>;

  //para cada componente do <form> se utiliza o FormBuilder
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) {
    this.builder = builder;
    this.authService = authService;
    this.router = router;
    this.platformDetectorService = platformDetectorService;
  }

  //no OnInit iremos setar o nome q sera usado no HTML
  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus();
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(username, password).subscribe(
      () => this.router.navigateByUrl('/user/' + username),
      (err) => {
        console.log(err);
        this.loginForm.reset();
        this.platformDetectorService.isPlatformBrowser() &&
        this.userNameInput.nativeElement.focus();
        alert('Username or password invalid');
      }
    );
  }
}
