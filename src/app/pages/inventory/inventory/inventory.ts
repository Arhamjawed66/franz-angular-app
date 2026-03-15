import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { InventoryService } from '../../../services/inventory.service';
import { CategoryDTO } from '../../../dto/categoryDTO';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCartPlus, faBox, faDollarSign, faExclamationTriangle, 
  faPlus, faSearch, faFilter, faEdit, faTrash 
} from '@fortawesome/free-solid-svg-icons';
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

  // Filter & Sort Signals
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('All');
  sortBy = signal<string>('name');
  sortOrder = signal<'asc' | 'desc'>('asc');

  // Modal & Form Signals
  showAddModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  editingItem = signal<InventoryDTO | null>(null);
  
  // Form model for ngModel binding
  formModel: Partial<InventoryDTO> = {
    name: '',
    description: '',
    store_id: 0,
    stock_quantity: 0,
    min_stock_level: 5,
    batch_no: ''
  };

  categoryOptions = ['All', 'Electronics', 'Clothing', 'Food', 'Books', 'Home & Garden'];

  // ⭐ COMPUTED: Filtered List
  filteredItems = computed(() => {
    const items = this.inventoryItems() || [];
    const search = this.searchTerm().toLowerCase();
    const category = this.selectedCategory().toLowerCase();

    return items
      .filter(item => {
        const name = (item.name || '').toLowerCase();
        const desc = (item.description || '').toLowerCase();
        const matchesSearch = name.includes(search) || desc.includes(search);
        const matchesCategory = category === 'all' || name.includes(category);
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        let aVal = (a as any)[this.sortBy()] ?? '';
        let bVal = (b as any)[this.sortBy()] ?? '';
        const res = aVal > bVal ? 1 : -1;
        return this.sortOrder() === 'asc' ? res : -res;
      });
  });

  // ⭐ COMPUTED: Stats
  lowStockCount = computed(() => 
    this.inventoryItems().filter(i => (i.stock_quantity ?? 0) <= (i.min_stock_level ?? 10)).length
  );

  ngOnInit() {
    this.loadData();
    this.checkServerStatus();
  }

  checkServerStatus() {
    this.inventoryService.getStatus().subscribe({
      next: () => this.isServerOnline.set(true),
      error: () => this.isServerOnline.set(false)
    });
  }

  loadData() {
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        console.log('Data loaded successfully:', data);
        this.inventoryItems.set(data);
      },
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
    const newItem: InventoryDTO = {
      ...this.formModel as InventoryDTO,
      inventory_received_date: new Date().toISOString().split('T')[0]
    };
    
    this.inventoryService.addInventory(newItem).subscribe({
      next: (res) => {
        this.inventoryItems.update(prev => [...prev, res]);
        this.closeAddModal();
      },
      error: (err) => console.error('Add failed:', err)
    });
  }

  updateItem() {
    const item = this.editingItem();
    if (item && item.id) {
      const updatedData = { ...item, ...this.formModel };
      this.inventoryService.updateInventory(item.id, updatedData as InventoryDTO).subscribe({
        next: (res) => {
          this.inventoryItems.update(items => 
            items.map(i => i.id === res.id ? res : i)
          );
          this.closeEditModal();
        }
      });
    }
  }

  deleteItem(item: InventoryDTO) {
    const id = item.id || item.product_id;
    if (id && confirm(`Delete ${item.name}?`)) {
      this.inventoryService.deleteInventory(id).subscribe({
        next: () => {
          this.inventoryItems.update(items => items.filter(i => (i.id || i.product_id) !== id));
        }
      });
    }
  }

  getStockStatus(stock: number): { label: string; class: string } {
    if (stock <= 0) return { label: 'Out of Stock', class: 'bg-red-100 text-red-700 dark:bg-red-900/30' };
    if (stock < 20) return { label: 'Low Stock', class: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30' };
    return { label: 'In Stock', class: 'bg-green-100 text-green-700 dark:bg-green-900/30' };
  }

  // --- Modal Helpers ---
  openAddModal() {
    this.resetForm();
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

  private resetForm() {
    this.formModel = { name: '', description: '', store_id: 0, stock_quantity: 0, batch_no: '' };
  }
}