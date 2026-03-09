import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallComponent } from '../call/call';
import { EmailComponent } from '../email/email';
import { WhatsappComponent } from '../whatsapp/whatsapp';

@Component({
  selector: 'app-customer-care',
  standalone: true,
  imports: [CommonModule, CallComponent, EmailComponent, WhatsappComponent],
  templateUrl: './customer-care.html',
  styleUrls: ['./customer-care.css']
})
export class CustomerCareComponent {
  activeTab: string = 'call';
}