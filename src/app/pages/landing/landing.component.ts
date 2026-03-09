import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  // Inline template (`) ko delete karke ye line likhein:
  templateUrl: './landing.component.html' 
})
export class LandingComponent { }