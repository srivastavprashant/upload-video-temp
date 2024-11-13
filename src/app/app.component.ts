import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>Video Upload App</span>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    mat-toolbar {
      margin-bottom: 16px;
    }
  `]
})
export class AppComponent {}