import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  @ViewChild(AuthFormComponent)
  signupForm: AuthFormComponent;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  async signupUser(credentials): Promise<void> {
    try {
      const user: firebase.User = await this.authService.createAdminUser(
          credentials.email,
          credentials.password
      );
      this.authService.userId = user.uid;
      await this.signupForm.hideLoading();
      this.router.navigateByUrl('');
    } catch (error) {
      await this.signupForm.hideLoading();
      this.signupForm.handleError(error);
    }
  }
}
