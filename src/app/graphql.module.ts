import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const uri = 'https://ame-team25.herokuapp.com/v1/graphql';

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  // Get the authentication token from local storage if it exists
  //const token = localStorage.getItem('token');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg4MTIwNjYzLjQ3LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsibWluZSIsImd1ZXN0Il0sIngtaGFzdXJhLXVzZXItaWQiOiIxIiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiZ3Vlc3QiLCJ4LWhhc3VyYS1yb2xlIjoiZ3Vlc3QifX0.FXH_gp3K2PkdV8nWIVPKMjFeqoePODd6Dlrn0pKp-PU';
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${token}`
    },
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: provideApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {}


// import {NgModule} from '@angular/core';
// import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
// import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
// import {InMemoryCache} from 'apollo-cache-inmemory';

// const uri = 'https://ame-team25.herokuapp.com/v1/graphql'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink) {
//   return {
//     link: httpLink.create({uri}),
//     cache: new InMemoryCache(),
//   };
// }

// //Bearer
// //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg4MTIwNjYzLjQ3LCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsibWluZSIsImd1ZXN0Il0sIngtaGFzdXJhLXVzZXItaWQiOiIxIiwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiZ3Vlc3QiLCJ4LWhhc3VyYS1yb2xlIjoiZ3Vlc3QifX0.FXH_gp3K2PkdV8nWIVPKMjFeqoePODd6Dlrn0pKp-PU

// @NgModule({
//   exports: [ApolloModule, HttpLinkModule],
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [HttpLink],
//     },
//   ],
// })
// export class GraphQLModule {}
