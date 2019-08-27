import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to Motorcycle Tests!';
  termsAgreed = false;
  termsReadAndAgreed = false;

  startTestButtonClicked() {
    if (!this.termsReadAndAgreed) {
      // Terms not agreed
      return;
    }

    this.title = 'Basic Rider Knowledge Practice Test';
    this.termsAgreed = true;
  }

  checked() {
    this.termsReadAndAgreed = !this.termsReadAndAgreed;
  }
}
