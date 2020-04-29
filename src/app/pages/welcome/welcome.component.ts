import { Component, OnInit, OnDestroy } from '@angular/core';
import { MentionOnSearchTypes } from 'ng-zorro-antd/mention';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  loading: boolean;
  currentUser: any;

  private querySubscription: Subscription;

  inputValue: string;
  suggestions: string[] = [];
  arrProducts = [];

  query = gql`
  query MyQuery {
    products(order_by: {price: asc}, limit: 25) {
      id
      img
      name
      price
    }
  }
`;

constructor(public msg: NzMessageService,
  private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: this.query
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.arrProducts = data.products;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }


  onSearchChange({ value }: MentionOnSearchTypes): void {
    console.log(`search: ${value}`);
    this.loading = true;
    this.fetchSuggestions(value, suggestions => {
      console.log(suggestions);
      this.suggestions = suggestions;
      this.loading = false;
    });
  }

  fetchSuggestions(value: string, callback: (suggestions: string[]) => void): void {
    const users = ['procurar produto', 'fechar compra', 'repetir uma compra'];
    setTimeout(() => {
      return callback(users.filter(item => item.indexOf(value) !== -1));
    }, 500);
  }




}
