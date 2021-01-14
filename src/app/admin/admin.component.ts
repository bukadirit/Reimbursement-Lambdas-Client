import { AuthService } from './../services/auth.service';
import { User } from './../models/user';
import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';
import { ReimbursementService } from '../services/reimbursement.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  //prettier-ignore
  displayedColumns: string[] = ['id', 'amount', 'description', 'receipt', 'status', 'type', 'timeSubmitted', 'author', 'timeResolved', 'resolver','buttons'];
  public dataSource = new MatTableDataSource<Reimbursement>();
  private user: User = new User();

  constructor(
    private service: ReimbursementService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.service.getAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource<Reimbursement>(response);
      this.dataSource.paginator = this.paginator;
    });

    this.authService
      .getUserInfo()
      .then((result) => {
        this.user = result;
      })
      .catch((err) => console.log(err));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(image: string) {
    this.dialog.open(ImageDialogComponent, {
      data: {
        name: image,
      },
      width: '50vw',
      height: '60vh',
    });
  }

  approveReimb(reimb: Reimbursement) {
    let data = {
      status: 'Approved',
      timeSubmitted: reimb.timeSubmitted,
      timeResolved: new Date(Date.now()),
      resolverId: this.user.attributes.sub,
      resolverDetails: {
        email: this.user.attributes.email,
        phone_number: this.user.attributes.phone_number,
      },
    };
    this.service
      .updateReimbursement(reimb.id, data)
      .subscribe((response) => this.refresh());
  }

  denyReimb(reimb: Reimbursement) {
    let data = {
      status: 'Denied',
      timeSubmitted: reimb.timeSubmitted,
      timeResolved: new Date(Date.now()),
      resolverId: this.user.attributes.sub,
      resolverDetails: {
        email: this.user.attributes.email,
        phone_number: this.user.attributes.phone_number,
      },
    };
    this.service
      .updateReimbursement(reimb.id, data)
      .subscribe((response) => this.refresh());
  }

  refresh() {
    this.service.getAll().subscribe((response) => {
      this.dataSource = new MatTableDataSource<Reimbursement>(response);
      this.dataSource.paginator = this.paginator;
    });
  }
}
