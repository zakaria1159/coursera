import { Component, OnInit, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;

  constructor(private dishservice: DishService, 
              private route: ActivatedRoute, 
              private location: Location, 
              private commentformbuilder: FormBuilder,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => {  this.dish = dish;
                            this.setPrevNext(dish.id);
                          },errmess => this.errMess = <any>errmess);

  this.createCommentForm();
   
  }

  setPrevNext(dishId: number){
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }


  commentForm: FormGroup;
  comment: Comment;
  commentFormErrors = {
    'author':'',
    'rating':'',
    'comment':''
  };

  validationMessages = {
    'author':{
      'required':'Author Name is required.',
      'minlength':'Author Name must be at least 2 characters long'
    },
    'rating':{
      'required': 'Rating is required'
    },
    'comment':{
      'required':'Comment is required.',
      'minlength':'Comment must be at least 1 characters long'
    }
  };

  createCommentForm(){
    this.commentForm = this.commentformbuilder.group({
      author: ['',[Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['',[Validators.required, Validators.minLength(1)]]
      
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data?: any){
    if(!this.commentForm){
      return;
    }
    const form = this.commentForm;

    for(const field in this.commentFormErrors){
      this.commentFormErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          this.commentFormErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onCommentSubmit(){
    this.comment = this.commentForm.value;
   
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    console.log(this.commentForm.status);
  
    this.dish.comments.push(this.comment);

    this.commentForm.reset({
      author:'',
      rating:5,
      comment:''
    });
  }

}