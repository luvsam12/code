import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { CurrentRoute } from "./../shared/services/currentRoute.model";
import { AppState } from "src/app/app.state";
import { Observable } from "rxjs";
// ActivatedRoute
import * as CurrentRouteActions from './../shared/actions/currentRoute.action';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})

// By Rushali
export class BreadcrumbComponent implements OnInit {
  routeDetails: Observable<CurrentRoute[]>;
  routes: any;
  name: any;
  product: any;

  constructor(private router: Router, private store: Store<AppState>,private activatedroute:ActivatedRoute)
  {
    //reading data stored in ngrx store
    this.routeDetails = this.store.select("currentRoute");
    this.routeDetails.subscribe(
      (element) =>
      {
        let lastElementIndex = element.length - 1;
        this.routes = element[lastElementIndex];
      })
  }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.product=data;
  })
   }

  navigateHome()
  {
    this.store.dispatch(new CurrentRouteActions.SaveCurrentRoute({name: "", route: ""}));
    this.router.navigateByUrl('');
  }

}
