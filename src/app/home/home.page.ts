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
  private querySubscription: Subscription;
  loading: boolean;

  inputValue: string;
  suggestions: string[] = [];
  arrProducts = [];
  arrItens = [];

  filters = { lastSearchSting:"", loja: "3", page: 1, pageLength: 10, searchString: "", order:"ASC"}

  
constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.LoadRemoteData();
  }

  GetQuery(){
    return gql`
  query MyQuery {
    products(
      order_by: {price: asc}, 
      where: {name: {_ilike: "%${this.filters.searchString}%"}}, 
      limit: ${this.filters.pageLength},
      offset: ${(this.filters.page-1) * this.filters.pageLength}
      ) {
      id
      img
      name
      price
    }
  }
`;
  }

  LoadRemoteData(){

    let bIncremental = true;
    if(this.filters.searchString == this.filters.lastSearchSting){
      this.filters.page++;
    }
    else{
      bIncremental = false;
      this.filters.page = 1;
      this.filters.lastSearchSting = this.filters.searchString;
    }

    let query = this.GetQuery();

    console.log('LoadRemoteData',bIncremental, query);

    this.querySubscription = this.apollo.watchQuery<any>({
      query
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;

        if(bIncremental){
          data.products.forEach(p => {
            this.arrProducts.push(p);
          });
        }
        else{
          this.arrProducts = data.products;
        }
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
      this.LoadRemoteData();
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


}
