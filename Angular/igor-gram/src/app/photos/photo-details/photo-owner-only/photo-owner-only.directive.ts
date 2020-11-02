import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { UserService } from '../../../core/user/user.service';
import { iPhoto } from '../../photo/iPhoto';

@Directive({
  selector: '[photoOwnerOnly]',
})
export class PhotoOwnerOnlyDirective {
  @Input() ownedPhoto: iPhoto;

  constructor(
    private element: ElementRef<any>,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      if (!user || user.id != this.ownedPhoto.userId) {
        console.log('entrou no if');
        this.renderer.setStyle(
          this.element.nativeElement,
          'display',
          'none'
        );
      }
    });
  }
}
