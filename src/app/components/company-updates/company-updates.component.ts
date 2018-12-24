import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-updates',
  templateUrl: './company-updates.component.html',
  styleUrls: ['./company-updates.component.scss']
})
export class CompanyUpdatesComponent implements OnInit {

  constructor() { 
               
  }

  ngOnInit() {
    $('.carousel').slick({
      slidesToShow: 1,
      dots:true,
      arrows: true,
      centerMode: true,
      });       
  }

}
