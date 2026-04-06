import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['../../../styles.css','./register.css']
})
export class Register {
  registerForm: any;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    // define the form structure
    this.registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', Validators.required]
   }, { validators: this.passwordMatchValidator
  });
  }

  passwordMatchValidator(form: any) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => alert(err.error.detail || 'Registration failed')
      });
    }
  }
}