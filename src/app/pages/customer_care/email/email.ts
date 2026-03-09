import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './email.html',
  styleUrls: ['./email.css']
})
export class EmailComponent {
  faEnvelope = faEnvelope;
}