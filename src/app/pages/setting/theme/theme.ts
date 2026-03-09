import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun, faPalette } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './theme.html',
  styleUrls: ['./theme.css']
})
export class ThemeComponent {
  themeService = inject(ThemeService);

  faMoon = faMoon;
  faSun = faSun;
  faPalette = faPalette;
}