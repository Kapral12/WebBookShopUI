import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  itemsPerSlide = 3;
  singleSlideOffset = true;

  slides = [
    {image: 'https://localhost:7274//img/books/dvir_kril_i_ruin.jpg'},
    {image: 'https://localhost:7274//img/books/eye_of_time.jpg'},
    {image: 'https://localhost:7274//img/books/game_of_thrones.jpg'},
    {image: 'https://localhost:7274//img/books/fure_of_swords.jpg'},
    {image: 'https://localhost:7274//img/books/game_of_thrones.jpg'},
  ];

}
