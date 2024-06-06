import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router, RouterModule } from '@angular/router';

interface LogInForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

@Component({
  selector: 'app-auth-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule], 
  templateUrl: './auth-log-in.component.html',
  styleUrls: ['./auth-log-in.component.scss'],
})
export default class AuthLogInComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<LogInForm>({
    email: this._formBuilder.control(null, [Validators.required, Validators.email]),
    password: this._formBuilder.control(null, [Validators.required])
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { error, data } = await this._authService.logIn({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });

      if (error) throw error;

      this._router.navigateByUrl('/inicio');
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  constructor() { }

  ngOnInit() { }
}
