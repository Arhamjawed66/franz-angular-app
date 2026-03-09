import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { ProductCardComponent } from '../../../components/product-card/product-card';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './view-products.html',
  styleUrls: ['./view-products.css']
})
export class ViewProductsComponent {
  themeService = inject(ThemeService);

  products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      desc: 'High-quality sound with noise cancellation and 20h battery life.',
      price: '$120',
      discount: '20% OFF',
      image: 'assets/productImages/headphone.jpg',
    },
    {
      id: 2,
      name: 'Smart Watch',
      desc: 'Track fitness, heart rate, and notifications seamlessly.',
      price: '$180',
      discount: '10% OFF',
      image: 'assets/productImages/smart-watch.avif',
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      desc: 'Portable speaker with deep bass and waterproof design.',
      price: '$75',
      discount: '30% OFF',
      image: 'assets/productImages/bluetooth-speaker .jpg',
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      desc: 'RGB lighting and precision tracking for gamers.',
      price: '$50',
      discount: '25% OFF',
      image: 'assets/productImages/gaming-mouse.jpg',
    },
    {
      id: 6,
      name: 'Wireless Keyboard',
      desc: 'Compact and silent keyboard with Bluetooth connectivity.',
      price: '$60',
      discount: '10% OFF',
      image: 'assets/productImages/wireless-keyboard.jpg',
    },
    {
      id: 7,
      name: 'Action Camera',
      desc: 'Capture 4K videos with waterproof durability.',
      price: '$210',
      discount: '35% OFF',
      image: 'assets/productImages/action-camera.jpg',
    },
    {
      id: 8,
      name: 'Desk Lamp',
      desc: 'Touch control LED lamp with adjustable brightness.',
      price: '$35',
      discount: '5% OFF',
      image: 'assets/productImages/desk-lamp.jpg',
    },
    {
      id: 9,
      name: 'Drone Camera',
      desc: 'Aerial photography drone with 1080p HD camera.',
      price: '$350',
      discount: '40% OFF',
      image: 'assets/productImages/drone-camera.jpg',
    },
    {
      id: 10,
      name: 'VR Headset',
      desc: 'Immersive virtual reality headset for gaming and entertainment.',
      price: '$250',
      discount: '30% OFF',
      image: 'assets/productImages/vR-headset.jpg',
    },
  ];
}