import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errors: string[] | null = null;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router){
  }

  complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
    fullName: ['', [Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]],
    dateOfBirth: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(12)]],
    userGenderCode: ['', [Validators.required]]
  })

  onSubmit(){

    // Convert date to yyyy-mm-dd
    const date = this.registerForm.value.dateOfBirth;
    if(date){
      this.registerForm.value.dateOfBirth = new Date(date).toISOString().slice(0, 10);
    }

    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: error => this.errors = error.errors
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailExists: true} : null),
            finalize(() => control.markAllAsTouched())
          )
        })
      )
    }
  }
}
