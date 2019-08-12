import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to Motorcycle Tests!';
  termsAgreed = false;

  clickEvent() {
    this.title = 'Motorcycle Endorsement Practice Test';
    this.termsAgreed = true;
  }
}
