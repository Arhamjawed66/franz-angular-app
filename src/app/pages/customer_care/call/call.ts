import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './call.html',
  styleUrls: ['./call.css']
})
export class CallComponent {
  faPhoneAlt = faPhoneAlt;
}