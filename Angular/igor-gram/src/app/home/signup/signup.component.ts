import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/plataform-detector/platform-detector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private builder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private service: SignupService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) {
    this.builder = builder;
    this.userNotTakenValidatorService = userNotTakenValidatorService;
    this.service = service;
    this.router = router;
    this.platformDetectorService = platformDetectorService;
  }

  ngOnInit(): void {
    this.signupForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
        this.userNotTakenValidatorService.checkUserNameTaken(),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
    this.platformDetectorService.isPlatformBrowser() &&
      this.emailInput.nativeElement.focus();
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.service.signup(newUser).subscribe(
      () => this.router.navigate(['']),
      (err) => console.log(err)
    );
  }
}
