import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Items } from 'src/app/model/items';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  itemList: Observable<Items[]>

  constructor(private itemService: ItemService,
    private router: Router,
    private authService: AuthService) {

      this.authService.getCurrentUser().subscribe(
        () => this.itemList = itemService.getItems()
      );
  }

  ngOnInit() { }

  addItem() {

    this.router.navigateByUrl('/create-item')

  }

  goEditItem(id: string) {
    
    this.router.navigateByUrl('/edit-item/' + id);
  }
}
