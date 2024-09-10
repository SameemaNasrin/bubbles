import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFrameComponent } from './main-frame/main-frame.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainFrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bubbles';
}
