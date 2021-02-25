import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/model/items';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  itemList: Items = { id: '', title: '', ogTitle: '', shortName: '', saga: '', ogSaga: '', sagaEntry: '', company: '', genre1: '', genre2: '', description: '', director: '', platform: '', duration: 0, state: '', rating: 0, fav: false, url: '' }

  pageTitle: string = 'New item';

  action: string = 'Create';

  id: string;

  constructor(private itemService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.id != null) {
      
      this.pageTitle = 'Edit item';

      this.action = 'edit';

      this.itemService.getItemById(this.id).subscribe(data => this.itemList = data);

    }
  }

  addItem() {

    if (this.action === 'create') {

      this.itemService.addItem(this.itemList);

    } else {

      this.itemService.updateItemById(this.id, this.itemList);

    }

    this.router.navigateByUrl('/lists');
  }

}
