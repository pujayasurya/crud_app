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
  sortDirection: { [key: string]: 'desc' | 'asc' } = {};
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

  toggleSort(sortField: string) {
    if (!this.sortDirection[sortField]) {
      this.sortDirection[sortField] = 'desc';
    } else {
      this.sortDirection[sortField] = this.sortDirection[sortField] === 'desc' ? 'asc' : 'desc';
    }
    this.sortProducts(sortField);
  }

  sortProducts(sortField: string) {
    const direction = this.sortDirection[sortField];
    this.products.sort((a: any, b: any) => {
      if (direction === 'desc') {
        return a[sortField] > b[sortField] ? 1 : a[sortField] < b[sortField] ? -1 : 0;
      } else {
        return a[sortField] < b[sortField] ? 1 : a[sortField] > b[sortField] ? -1 : 0;
      }
    });
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
