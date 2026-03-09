import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './whatsapp.html',
  styleUrls: ['./whatsapp.css']
})
export class WhatsappComponent {
  faWhatsapp = faWhatsapp;
}