import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LEADERS } from '../shared/Leaders';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpmsgService) { }

    getLeaders(): Observable<Leader[]> {
      return this.restangular.all('leaders').getList();
    }
  
    getLeader(id: number): Observable<Leader> {
      return  this.restangular.one('leaders',id).get();
    }
  
    getFeaturedLeader(): Observable<Leader> {
      return this.restangular.all('leaders').getList({featured: true})
        .map(Leaders => Leaders[0]);
    }
    getLeaderIds(): Observable<number[]> {
      return this.getLeaders()
        .map(leaders => { return leaders.map(leader => leader.id) })
        .catch(error => { return Observable.of(error); } );
    }

}
