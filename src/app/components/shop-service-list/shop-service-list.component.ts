import { Component, OnInit } from '@angular/core';
import { ShopServiceService, ShopService } from '../../services/shop-service.service';

@Component({
  selector: 'app-shop-service-list',
  templateUrl: './shop-service-list.component.html',
  styleUrls: ['./shop-service-list.component.css']
})
export class ShopServiceListComponent implements OnInit {
  services: ShopService[] = [];

  constructor(private serviceService: ShopServiceService) {}

  ngOnInit(): void {
    this.serviceService.getAll().subscribe(data => {
      this.services = data;
    });
  }
}
