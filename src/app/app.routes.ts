
import { Routes } from '@angular/router';
import { UsersComponent } from './pages/setting/users/users';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { NotificationComponent } from './pages/store/notification/notification';
import { CreateStoreComponent } from './pages/store/create-store/create-store';
import { UpdateStoreComponent } from './pages/store/update-store/update-store';
import { ReminderComponent } from './pages/store/reminder/reminder';
import { CreateCategoryComponent } from './pages/category/create-category/create-category';
import { UpdateCategoryComponent } from './pages/category/update-category/update-category';
import { ViewCategoryComponent } from './pages/category/view-category/view-category';
import { InventoryComponent } from './pages/inventory/inventory/inventory';
import { ThemeComponent } from './pages/setting/theme/theme';
import { InfoComponent } from './pages/supplier/info/info';
import { AddComponent } from './pages/payment/add/add';
import { ModifyComponent } from './pages/payment/modify/modify';
import { CustomerCareComponent } from './pages/customer_care/customer-care/customer-care';
import { OrdersComponent } from './pages/orders/orders';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { LandingComponent } from './pages/landing/landing.component';
import { ProductComponent } from './components/product/product/product';
import { LayoutComponent } from './components/layout/layout.component'; // Naya Layout Component
import { authGuard } from './guards/auth.guard'; // Aapka Auth Guard

export const routes: Routes = [
  // --- PUBLIC ROUTES (No Sidebar/Layout) ---
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // --- PROTECTED DASHBOARD ROUTES (Wrapped in Layout) ---
  {
    path: '',
    component: LayoutComponent, // Ye layout sidebar aur navbar provide karega
    canActivate: [authGuard],    // Sirf login users hi andar ja saken
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'customercare', component: CustomerCareComponent },
      { path: 'orders', component: OrdersComponent },
      
      // Store Management
      { path: 'store', children: [
        { path: 'create', component: CreateStoreComponent },
        { path: 'update', component: UpdateStoreComponent },
        { path: 'notification', component: NotificationComponent },
        { path: 'reminder', component: ReminderComponent }
      ]},
      
      // Category Management
      { path: 'category', children: [
        { path: 'create', component: CreateCategoryComponent },
        { path: 'update', component: UpdateCategoryComponent },
        { path: 'view', component: ViewCategoryComponent },
      ]},
      
      // Settings & Users
      { path: 'setting', children: [
        { path: 'theme', component: ThemeComponent },
        { path: 'users', component: UsersComponent },
      ]},
      
      // Supplier Details
      { path: 'supplier', children: [
        { path: 'info', component: InfoComponent },
      ]},
      
      // Payments
      { path: 'payment', children: [
        { path: 'add', component: AddComponent },
        { path: 'modify', component : ModifyComponent },
      ]},
      
      // Products Route - Added for product management with CRUD operations (POST, GET by ID, DELETE)
      {
        path : 'products',
        component : ProductComponent,
        children : []
        
       
       
       
       
       
       }
    ]
  },

  // Wildcard (Kisi bhi galat URL par Landing Page par bhej dega)
  ];
