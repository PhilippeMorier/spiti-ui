import { Component } from '@angular/core';

@Component({
  selector: 'spt-editor',
  styleUrls: ['./editor.component.scss'],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  public actions: string[] = [
    'Edit',
    'Save',
    // 'Cut',
  ];

  public isMultipleOf(factor: number): string {
    return (this.actions.length % factor === 0)
      ? 'e'
      : 'o';
  }
}
