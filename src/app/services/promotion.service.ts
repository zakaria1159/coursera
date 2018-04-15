import { PROMOTIONS } from './../shared/promotions';
import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';


@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpmsgService) { }

    getPromotions(): Observable<Promotion[]> {
      return this.restangular.all('PROMOTIONS').getList();
    }
  
    getPromotion(id: number): Observable<Promotion> {
      return  this.restangular.one('PROMOTIONS',id).get();
    }
  
    getFeaturedPromotion(): Observable<Promotion> {
      return this.restangular.all('PROMOTIONS').getList({featured: true})
        .map(Promotions => Promotions[0]);
    }
    getPromotionIds(): Observable<number[]> {
      return this.getPromotions()
        .map(promotions => { return promotions.map(promotion => promotion.id) })
        .catch(error => { return Observable.of(error); } );
    }

  
}