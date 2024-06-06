import { Component, Input } from '@angular/core';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { AudioUrlsService } from './services/audio-urls.service';


@Component({
  selector: 'app-recorder-item',
  templateUrl: './recorder-item.component.html',
  styleUrls: ['./recorder-item.component.css'],
})
export class RecorderItemComponent {
  constructor(private AudioUrlsService: AudioUrlsService) {}
  @Input() audio: any;
  @Input() index: number = 0;
  isPlaying: boolean = false;
  play(audio: HTMLAudioElement, i: number): void {
    this.isPlaying = !this.isPlaying;
    this.AudioUrlsService.data$.subscribe((newData: any) => {
      // this.data = newData;
      console.log(newData)
    });
    // this.audioUrls.map((item, index) =>
    //   i === index && this.isPlaying
    //     ? (item.icon = faPause)
    //     : (item.icon = faPlay)
    // );

    if (this.isPlaying) {
      audio.play();
      audio.onended = () => {
        // this.audioUrls[i].icon = faPlay;
      };
    } else {
      audio.pause();
    }
  }
}
