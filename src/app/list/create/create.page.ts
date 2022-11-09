import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { FormCreateList } from '../list.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit() {

  }

  createList(){
    if (!this.form.valid) {
      return;
    }

    const listData: FormCreateList = {
      listName: this.form.value.name,
      isMain: this.form.value.main
    };

    this.listService.createList(listData).subscribe(response => {
      this.router.navigateByUrl('/main');
    });
  }
}
