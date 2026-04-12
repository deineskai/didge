import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../core/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: '../../../styles.css'
})
export class Login {
  loginForm: any;
  loginError = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router, private cdr: ChangeDetectorRef) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onLogin() {
    this.loginError = '';
    this.auth.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/app/recipes/discover']),
      error: () => { this.loginError = 'Invalid username or password'; this.cdr.detectChanges(); }
    });
  }
}