import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  loading: boolean;
  currentUser: any;

  private querySubscription: Subscription;

  inputValue: string;
  suggestions: string[] = [];
  arrProducts = [];
  arrItens = [];

  filters = { loja: "3", page: 1, pageLength: 100, searchString: "", order:"ASC"}

  query = gql`
  query MyQuery {
    products(order_by: {price: asc}, limit: ${this.filters.pageLength}) {
      id
      img
      name
      price
    }
  }
`;
constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.LoadRemoteData();
  }

  LoadRemoteData(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: this.query
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.arrProducts = data.products;
        this.arrItens = this.arrProducts.slice(this.arrItens.length,this.arrItens.length+10);
        console.log('produtos', this.arrProducts);
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  fetchSuggestions(value: string, callback: (suggestions: string[]) => void): void {
    const users = ['procurar produto', 'fechar compra', 'repetir uma compra'];
    setTimeout(() => {
      return callback(users.filter(item => item.indexOf(value) !== -1));
    }, 500);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


}
