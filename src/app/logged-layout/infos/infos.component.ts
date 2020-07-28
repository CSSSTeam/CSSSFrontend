import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {

  infos = [
    {
      date: '12 VI 2020',
      content: 'Dziś w naszej szkole odbył się Dzień Sportu. Uczniowie biegali i skakali.',
      url: 'https://via.placeholder.com/150/222',
      photo: 'przykładowe',
      author: 'mw'
    },
    {
      date: '18 VI 2020',
      content: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis quam non erat volutpat iaculis. Phasellus bibendum tincidunt vulputate. Quisque faucibus nisl ac ex aliquet elementum. Aenean tempor at odio vel gravida. Phasellus laoreet massa metus, at consequat dolor tristique et. Donec lacinia in leo vel porta. Aenean nisi metus, rutrum non porttitor vitae, volutpat at libero. Pellentesque viverra vel nisl nec imperdiet. Ut fringilla, diam sed laoreet ultricies, ex enim aliquam mauris, eget imperdiet urna quam vulputate eros. Ut rhoncus dignissim orci a tristique. Curabitur orci ex, cursus ac urna et, aliquam imperdiet nisl.',
      url: '', //https://via.placeholder.com/150/222
      photo: 'przykładowe nr 2',
      author: 'mbg'
    },
    {
      date: '25 VI 2020',
      content: 'Zbliża się koniec roku szkolnego.',
      url: 'https://via.placeholder.com/150/222',
      photo: 'przykładowe nr 3',
      author: 'dm'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  mgmtStart() {

  }
}
