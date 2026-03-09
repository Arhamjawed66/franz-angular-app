import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.html',
  styleUrls: ['./image-slider.css']
})
export class ImageSliderComponent {
  images = [
    "https://picsum.photos/id/1011/600/300",
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1025/600/300",
    "https://picsum.photos/id/1035/600/300",
    "https://picsum.photos/id/1041/600/300",
  ];
}
