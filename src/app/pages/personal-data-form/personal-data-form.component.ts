import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/shared/consts/routes';
import { PersonData } from 'src/app/shared/models/person-data';
import { PersonDataService } from 'src/app/shared/services/person-data.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
})
export class PersonalDataFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public routers: typeof routes = routes;

  personalDataSubs: Subscription | undefined;

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private personDataService: PersonDataService
  ) {
    this.form = new FormGroup({
      user: new FormGroup({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        gender: new FormControl(null, [Validators.required]),
      }),
      salary: new FormControl(null, [Validators.required]),
      education: new FormControl(null, [Validators.required]),
      job: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required]),
      family_status: new FormControl(null, [Validators.required]),
      kids: new FormControl(null, [Validators.required]),
    });
  }


  public ngOnInit(): void {}

  public submit(): void {
    if (this.form.valid) {
      const user = this.tokenService.getUser();
      const userId: number | undefined = user!.id;
      this.personalDataSubs = this.personDataService
        .saveData(userId!, this.form.value)
        .subscribe((response) => {
          const personData: PersonData = Object.assign({}, response);
          this.tokenService.savePersonData(personData);
          this.router.navigate([routes.TOUR_LIST]);
        });
    }
  }

  public forgetPassword(): void {}

  goBack(): void {
    // this.router.navigate(['/login/sign-up']);
  }

  ngOnDestroy(): void {
    if(this.personalDataSubs){
      this.personalDataSubs.unsubscribe();
    }
  }
}
