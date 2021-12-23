import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category-list.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {
  categoryList: any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getTestCategoriesData().subscribe(
      data => {
        this.categoryList = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  selectedCategory(i) {
    for(var j=0;j<this.categoryList.length;j++){
      document.getElementById(j.toString()).style.borderLeft = "thick solid transparent";
    }

    //selecting category
    let color1: string[] = [ "#FFBD33" ,"#0084C5", "#FF5733", "#A368FD" ]
    var element = document.getElementById(i);
    element.style.borderLeft = "thick solid";
    element.style.borderColor = color1[i];
  }

}
