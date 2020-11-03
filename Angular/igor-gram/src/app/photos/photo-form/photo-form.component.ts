import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  photoFormGroup: FormGroup;
  file: File;
  preview: string;

  constructor(
    private photoFormBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {
    this.photoFormGroup = this.photoFormBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const description = this.photoFormGroup.get('description').value;
    const allowComments = this.photoFormGroup.get('allowComments').value;
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => {
        this.alertService.success('Photo uploaded');
        this.router.navigate(['']);
      },
      err => {
        console.log(err);
        this.alertService.warning("Could not upload the photo!")
      });
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
