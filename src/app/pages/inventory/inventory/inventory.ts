import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { InventoryService } from '../../../services/inventory.service';
import { CategoryDTO } from '../../../dto/categoryDTO';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faBox, faDollarSign, faExclamationTriangle, faPlus, faSearch, faFilter, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { InventoryDTO } from '../../../dto/inventoryDTO';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  // Services
  themeService = inject(ThemeService);
  private inventoryService = inject(InventoryService);

  // Icons
  faCartPlus = faCartPlus;
  faBox = faBox;
  faDollarSign = faDollarSign;
  faExclamationTriangle = faExclamationTriangle;
  faPlus = faPlus;
  faSearch = faSearch;
  faFilter = faFilter;
  faEdit = faEdit;
  faTrash = faTrash;

  // ⭐ Server Status Signal
  isServerOnline = signal<boolean>(true);

  // Base Data Signals
  inventoryItems = signal<InventoryDTO[]>([]);
  categories = signal<CategoryDTO[]>([]);

  // Filter & Sort Signals - Using signals with getter/setter for ngModel
  private _searchTerm = signal<string>('');
  private _selectedCategory = signal<string>('All');
  
  get searchTerm(): string {
    return this._searchTerm();
  }
  
  set searchTerm(value: string) {
    this._searchTerm.set(value);
  }
  
  get selectedCategory(): string {
    return this._selectedCategory();
  }
  
  set selectedCategory(value: string) {
    this._selectedCategory.set(value);
  }
  
  sortBy = signal<string>('name');
  sortOrder = signal<'asc' | 'desc'>('asc');

  // Modal & Form - Using regular object for form binding
  showAddModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  editingItem = signal<InventoryDTO | null>(null);
  
  // Form model object for ngModel binding
  formModel: Partial<InventoryDTO> = {
    name: '',
    description: '',
    //price: 0,
    //stock: 0,
    //imageUrl: '',
    //barcode: '',
    //expiry_date: '',
    store_id: 0
  };

  // Category Options for Filter Dropdown
  categoryOptions = ['All', 'Electronics', 'Clothing', 'Food', 'Books', 'Home & Garden'];

  // ⭐ COMPUTED SIGNAL: Auto filter and sort - tracks all dependencies
  filteredItems = computed(() => {
    let items = [...this.inventoryItems()];

    // 1. Filter by search (tracks _searchTerm signal)
    const search = this._searchTerm();
    if (search) {
      const term = search.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    }

    // 2. Filter by category (tracks _selectedCategory signal)
    const category = this._selectedCategory();
    if (category !== 'All') {
      const cat = category.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(cat));
    }

    // 3. Sort (tracks sortBy and sortOrder signals)
    return items.sort((a, b) => {
      let aVal = (a as any)[this.sortBy()];
      let bVal = (b as any)[this.sortBy()];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      const res = aVal > bVal ? 1 : -1;
      return this.sortOrder() === 'asc' ? res : -res;
    });
  });

  // Stats (Computed for efficiency)
  //totalValue = computed(() => this.inventoryItems().reduce((t, i) => t + ((i.price ?? 0) * (i.stock ?? 0)), 0));
  //lowStockCount = computed(() => this.inventoryItems().filter(i => (i.stock ?? 0) < 20).length);

  ngOnInit() {
    this.loadData();
    this.checkServerStatus();
  }

  // Check server status
  checkServerStatus() {
    // Simulate server status check - in real app, ping the API
    this.inventoryService.getStatus().subscribe({
      next: () => this.isServerOnline.set(true),
      error: () => this.isServerOnline.set(false)
    });
  }

  loadData() {
    this.inventoryService.getInventory().subscribe({
      next: (data) => this.inventoryItems.set(data),
      error: (err) => {
        console.error('Error fetching data:', err);
        this.isServerOnline.set(false);
      }
    });
  }

  // --- Actions ---

  toggleSortOrder() {
    this.sortOrder.update(val => val === 'asc' ? 'desc' : 'asc');
  }

  addItem() {
    // Create product with ID
    const itemWithId: InventoryDTO = {
      id: Date.now(),
      name: this.formModel.name || '',
      description: this.formModel.description || '',
      //price: this.formModel.price || 0,
      //stock: this.formModel.stock || 0,
      //imageUrl: this.formModel.imageUrl || '',
      store_id: this.formModel.store_id || 0,
      //barcode: this.formModel.barcode || '',
      inventory_received_date: this.formModel.inventory_received_date || ''
    };
    
    this.inventoryItems.update(prev => [...prev, itemWithId]);
    this.closeAddModal();
  }

  updateItem() {
    if (this.editingItem()) {
      const updatedItem: InventoryDTO = {
        ...this.editingItem()!,
        name: this.formModel.name || '',
        description: this.formModel.description || '',
        //price: this.formModel.price || 0,
        //stock: this.formModel.stock || 0,
        //imageUrl: this.formModel.imageUrl || '',
        store_id: this.formModel.store_id || 0,
        //barcode: this.formModel.barcode || '',
        //expiry_date: this.formModel.expiry_date || ''
      };
      
      this.inventoryItems.update(items => 
        items.map(i => i.id === this.editingItem()?.id ? updatedItem : i)
      );
      this.closeEditModal();
    }
  }

  deleteItem(item: InventoryDTO) {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      this.inventoryItems.update(items => items.filter(i => i.id !== item.id));
    }
  }

  // Get stock status for badge
  getStockStatus(stock: number): { label: string; class: string } {
    if (stock === 0) {
      return { label: 'Out of Stock', class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
    } else if (stock < 20) {
      return { label: 'Low Stock', class: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' };
    } else {
      return { label: 'In Stock', class: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
    }
  }

  // --- Modal Helpers ---
  openAddModal() {
    this.formModel = {
      name: '',
      description: '',
      //price: 0,
      //stock: 0,
      //imageUrl: '',
      //barcode: '',
      //expiry_date: ''
    };
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  openEditModal(item: InventoryDTO) {
    this.editingItem.set(item);
    this.formModel = { ...item };
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.editingItem.set(null);
  }
}
