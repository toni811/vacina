import { Component, OnInit } from '@angular/core';
import {Ort} from '../shared/ort';

@Component({
  selector: 'bs-ort-lis',
  templateUrl: './ort-lis.component.html',
  styles: [
  ]
})
export class OrtLisComponent implements OnInit {
  orte: Ort[];
  ngOnInit(){
    this.orte = [
    new Ort (
        2,
        8020,
        'Linz',
        'Schanzelgasse',
        'Haupteingang',
        '20.04.2021'
    )
    ];
  }
}
