import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrowdfundingService } from '../shared/services/crowdfunding.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-crowdfunding-edit',
  templateUrl: './crowdfunding-edit.page.html',
  styleUrls: ['./crowdfunding-edit.page.scss'],
})
export class CrowdfundingEditPage implements OnInit {

  crowdId: string;

  constructor(private router:Router, 
    private activatedRoute: ActivatedRoute,
    private crowdfundingService: CrowdfundingService,
    private userService: UserService) {
      this.crowdId = this.activatedRoute.snapshot.params.id;
     }

  ngOnInit() {
  }

}
