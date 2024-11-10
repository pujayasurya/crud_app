import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    ///////////////////////////////////
    // GET ID FROM THE CURRENT URL
    ///////////////////////////////////
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.productForm.patchValue(product);
      });
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.productId) {
        ////////////////////////////
        // POST FOR EDIT EXISTING
        ////////////////////////////
        this.productService.updateProduct(this.productId, product).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        //////////////////////////
        // POST FOR ADD NEW DATA
        //////////////////////////
        this.productService.createProduct(product).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
