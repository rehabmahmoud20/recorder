import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recorder-item',
  templateUrl: './recorder-item.component.html',
  styleUrls: ['./recorder-item.component.css'],
    animations: [
    trigger('audioAnimation', [
      state('void', style({ transform: 'translateX(-50%)' })),
      transition(':enter', [
        animate('1s ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
   
  ]
})
export class RecorderItemComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  @Input() audio: any;
  @Input() index: number = 0;
  @Input() audUrl: any;
  @Output() audioStateChange = new EventEmitter<any>();

  isPlaying: boolean = false;

  play(audio: HTMLAudioElement, i: number): void {
    // debugger;

    this.isPlaying = !this.isPlaying;
    console.log(this.isPlaying);
    this.audioStateChange.emit({ index: i, isPlaying: this.isPlaying });

    if (this.isPlaying) {
      audio.play();

      audio.onended = () => {
        this.audio.icon = faPlay;
        this.cdr.detectChanges();
      };
    } else {
      audio.pause();
    }
  }
}
