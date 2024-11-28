import {Component, numberAttribute} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {CodeInputModule} from "angular-code-input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message = '';
  isOkay = true;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  protected readonly numberAttribute = numberAttribute;
  protected readonly event = event;

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\n Now you can proceed to login';
        this.submitted=true;
        this.isOkay=true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted=true;
        this.isOkay=false;
    }
    });
  }
}
