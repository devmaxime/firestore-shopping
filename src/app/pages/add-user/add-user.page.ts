import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {AuthFormComponent} from '../../components/auth-form/auth-form.component';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.page.html',
    styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
    @ViewChild(AuthFormComponent) addUserForm: AuthFormComponent;

    public memberList: Observable<any>;

    constructor(
        private authService: AuthService,
        private alertCtrl: AlertController,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.authService.getTeamMemberList().then(memberList$ => {
            this.memberList = memberList$.valueChanges();
            console.log(memberList$);
        });
    }

    async addUser(credentials): Promise<void> {
        try {
            await this.authService.createRegularUser(credentials.email);
            await this.addUserForm.hideLoading();
            this.router.navigateByUrl('/tabs/inventory');
        } catch (error) {
            await this.addUserForm.hideLoading();
            this.addUserForm.handleError(error);
        }
    }

    async removeUser(memberId: string): Promise<void> {
        console.log('Removing user ..' + memberId);
        const prompt = await this.alertCtrl.create({
            message: 'Are you sure you want to remove this user ?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    },
                },
                {
                    text: 'Remove',
                    handler: data => {
                        this.authService.removeMemberFromTeam(memberId);
                    },
                },
            ],
        });
        prompt.present();
    }
}
