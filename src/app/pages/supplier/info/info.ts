import { Component, OnInit, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SupplierService } from '../../../services/supplier.service';
import { SupplierDTO } from '../../../dto/supplierDTO';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-supplier-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './info.html',
})
export class InfoComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private supplierService = inject(SupplierService);
  public themeService = inject(ThemeService);

  // Signals
  supplier = signal<SupplierDTO | null>(null);
  isLoading = signal<boolean>(true);
  errorMsg = signal<string | null>(null);

  private routeSub?: Subscription;

  ngOnInit() {
    // 1. Reactive Params: Agar URL mein ID change ho toh ye auto-detect karega
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadSupplierDetails(+id);
      } else {
        this.isLoading.set(false);
        this.errorMsg.set("Invalid Supplier ID");
      }
    });
  }

  loadSupplierDetails(id: number) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.supplierService.getSuppliers().subscribe({
      next: (list) => {
        // Data dhondne ka logic with strict type checking
        const found = list.find(s => 
          (s.supplier_id && +s.supplier_id === id) || 
          ((s as any).id && +(s as any).id === id)
        );

        if (found) {
          this.supplier.set(found);
        } else {
          this.errorMsg.set(`Supplier with ID ${id} not found.`);
          this.supplier.set(null);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMsg.set("Failed to load data from server.");
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy() {
    // Memory leaks se bachne ke liye unsubscribe karein
    this.routeSub?.unsubscribe();
  }
}