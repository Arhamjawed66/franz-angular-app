import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../services/theme.service';

interface User {
  id: number | null;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent {
  themeService = inject(ThemeService);

  users: User[] = [
    { id: 1, name: "Sophie Turner", email: "sophie@email.com", role: "Admin" },
    { id: 2, name: "John Carter", email: "john@email.com", role: "Editor" },
  ];

  modalOpen = false;
  form: User = { id: null, name: "", email: "", role: "" };

  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  openModal(user: User | null = null) {
    this.form = user ? { ...user } : { id: null, name: "", email: "", role: "" };
    this.modalOpen = true;
  }

  handleSubmit() {
    if (this.form.id) {
      this.users = this.users.map((u) => (u.id === this.form.id ? this.form : u));
    } else {
      this.users = [...this.users, { ...this.form, id: Date.now() }];
    }
    this.modalOpen = false;
  }

  deleteUser(id: number | null) {
    this.users = this.users.filter((u) => u.id !== id);
  }
}