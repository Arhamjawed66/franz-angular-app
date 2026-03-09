import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-update-store',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-store.html',
  styleUrls: ['./update-store.css']
})
export class UpdateStoreComponent {
  themeService = inject(ThemeService);
  storeService = inject(StoreService);

  formData = {
    name: "",
    owner: "",
    email: "",
    phone: "",
    address: "",
  };

  handleSubmit() {
    console.log("Store updated successfully!", this.formData);
    // Here you would typically call a service to update the store
    // For example:
    // this.storeService.updateStore(this.formData.id, this.formData).subscribe(
    //   response => console.log('Store updated:', response),
    //   error => console.error('Error updating store:', error)
    // );
    alert("Store updated successfully!");
  }
}