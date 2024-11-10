import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';
import { faSortDesc, faSortAsc, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  filterText: string = "";
  products: Product[] = [];
  filteredProducts: Product[] = [];
  faSortDesc = faSortDesc;
  faSortAsc = faSortAsc;
  faEdit = faEdit;
  faTrash = faTrash;
  
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }

  editProduct(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  addProduct(): void {
    this.router.navigate(['/add']);
  }
}
