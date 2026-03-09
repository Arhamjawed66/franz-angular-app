import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService, Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-tand-c',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tand-c.html',
  styleUrls: ['./tand-c.css']
})
export class TandCComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private fb = inject(FormBuilder);

  // Angular Signals for state management
  suppliers = signal<Supplier[]>([]);
  isLoading = signal<boolean>(false);
  searchTerm = signal<string>('');
  showModal = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  // Form for adding/editing supplier
  supplierForm!: FormGroup;

  // Computed signal for filtered suppliers
  filteredSuppliers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.suppliers().filter(supplier =>
      supplier.name?.toLowerCase().includes(term) ||
      supplier.contact_person_name?.toLowerCase().includes(term) ||
      supplier.contact_person_email?.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.initForm();
    this.loadSuppliers();
  }

  // Initialize the form with validators
  private initForm(): void {
    this.supplierForm = this.fb.group({
      store_id: [0],
      address_id: [0],
      name: ['', [Validators.required, Validators.minLength(2)]],
      contact_person_name: ['', Validators.required],
      contact_person_email: ['', [Validators.required, Validators.email]],
      contact_person_phone: ['', Validators.pattern(/^[0-9\-\+\s]*$/)]
    });
  }

  // Load suppliers from API
  loadSuppliers(): void {
    this.isLoading.set(true);
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading suppliers:', error);
        this.isLoading.set(false);
      }
    });
  }

  // Open modal for adding new supplier
  openAddModal(): void {
    this.supplierForm.reset({
      store_id: 0,
      address_id: 0,
      name: '',
      contact_person_name: '',
      contact_person_email: '',
      contact_person_phone: ''
    });
    this.showModal.set(true);
  }

  // Close modal
  closeModal(): void {
    this.showModal.set(false);
    this.supplierForm.reset();
  }

  // Submit form - Add new supplier
  submitForm(): void {
    if (this.supplierForm.invalid) {
      this.supplierForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const supplierData: Supplier = this.supplierForm.value;

    this.supplierService.addSupplier(supplierData).subscribe({
      next: (response) => {
        console.log('Supplier added successfully:', response);
        this.suppliers.update(current => [...current, response]);
        this.isSubmitting.set(false);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error adding supplier:', error);
        this.isSubmitting.set(false);
      }
    });
  }

  // Delete supplier
  deleteSupplier(id: number): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.suppliers.update(current => current.filter(s => s.supplier_id !== id));
          console.log('Supplier deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting supplier:', error);
        }
      });
    }
  }

  // Search functionality
  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  // Get form controls for template
  get f() {
    return this.supplierForm.controls;
  }
}
