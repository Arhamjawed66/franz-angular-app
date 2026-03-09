import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-store.html',
  styleUrls: ['./create-store.css']
})
export class CreateStoreComponent {
  themeService = inject(ThemeService);
  storeService = inject(StoreService);

  form = {
    name: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
  };

  handleSubmit() {
    this.storeService.createStore(this.form).subscribe({
      next: (response) => {
        console.log('Store Created:', response);
        // Handle success (e.g., show a toast message, redirect)
      },
      error: (error) => {
        console.error('Error creating store:', error);
        // Handle error
      }
    });
  }
}