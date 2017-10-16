import { Component } from '@angular/core';
import { User } from './user';
import { Entry } from './entry';

const ENTRYNULL: Entry = { title: 'empty',  name: 'empty',  content:'empty',  cathegories:''};


@Component({
  selector: 'editor-bar',
  templateUrl: './editor-bar.component.html',
  styleUrls: ['./editor-bar.component.css']
})


export class EditorBarComponent {
  title = 'app';
  entry= ENTRYNULL;
}
