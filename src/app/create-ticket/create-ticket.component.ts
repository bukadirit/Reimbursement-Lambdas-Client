import { Attributes, User } from './../models/user';
import { AuthService } from './../services/auth.service';
import { validateReimbForm, getErrors } from './../helpers/helper.functions';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from '../services/reimbursement.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent implements OnInit {
  private confirm: boolean = false;
  private user: User = new User();
  private reimb: Reimbursement;
  public newImage: any = null;
  public amount: number;
  public description: string;
  public selectedType: any;
  public types = [
    { value: 'Lodging', viewValue: 'Lodging' },
    { value: 'Travel', viewValue: 'Travel' },
    { value: 'Food', viewValue: 'Food' },
    { value: 'Other', viewValue: 'Other' },
  ];

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private service: ReimbursementService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService
      .getUserInfo()
      .then((result) => {
        this.user = result;
        return result;
      })
      .catch((err) => console.log(err));
  }

  onSubmit() {
    if (this.newImage == null) {
      if (this.confirm) {
        if (this.prepareReimb()) {
          this.service.postReimbursement(this.reimb).subscribe(
            (response) => {
              this.openSnackBar('The Request Has Been Submitted!');
              this.router.navigate(['/portal']);
            },
            (error: Response) => {
              const errMsg = getErrors(error);
              this.openSnackBar(errMsg);
            }
          );
        } else {
          this.confirm = false;
          this.router.navigate(['/create-ticket']);
          this.openSnackBar('Please Fill out All Required Fields');
        }
      } else {
        this.openDialog();
      }
    } else {
      if (this.prepareReimb()) {
        this.service.postReimbursement(this.reimb).subscribe(
          (response) => {
            this.openSnackBar('The Request Has Been Submitted!');
            this.router.navigate(['/portal']);
          },
          (error: Response) => {
            const errMsg = getErrors(error);
            this.openSnackBar(errMsg);
          }
        );
      } else {
        this.router.navigate(['/create-ticket']);
        this.openSnackBar('Please Fill out All Required Fields');
      }
    }
  }

  openDialog() {
    const ref = this.dialog.open(ImageDialogComponent, {
      width: '40vw',
      height: '25vh',
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.confirm = true;
        this.onSubmit();
      }
    });
  }

  prepareReimb() {
    this.reimb = new Reimbursement(
      null,
      this.amount,
      new Date(Date.now()),
      null,
      this.description,
      this.newImage == null ? null : this.newImage[0],
      'Pending',
      this.selectedType,
      this.user.attributes.sub,
      new Attributes(
        this.user.attributes.email,
        this.user.attributes.phone_number
      ),
      null,
      null
    );
    return validateReimbForm(this.reimb);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'start',
      panelClass: 'purple-snackbar',
    });
  }
}
