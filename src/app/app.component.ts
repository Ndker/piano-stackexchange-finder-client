import {Component} from '@angular/core';
import {ISearchResultItem, SearchService} from 'src/app/service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stackexchange-finder-client';
  // data = [
  //   {
  //     date: '2019-06-19T08:07:07.000Z',
  //     title: 'How to fix OutOfMemory on Android',
  //     author: 'masi mojib',
  //     sourceLink: 'https://stackoverflow.com/questions/56662903/how-to-fix-outofmemory-on-android'
  //   },
  //   {
  //     date: '2019-06-05T04:45:13.000Z',
  //     title: 'Netty NioEventLoopGroup causes OutOfmemory in Vertx 3.x',
  //     author: 'Barcelona',
  //     sourceLink: 'https://stackoverflow.com/questions/56454371/netty-nioeventloopgroup-causes-outofmemory-in-vertx-3-x'
  //   },
  //   {
  //     date: '2019-06-17T12:40:49.000Z',
  //     title: '.NET OutOfMemory exception - Reason: Low on memory during GC',
  //     author: 'Tony Sepia',
  //     sourceLink: 'https://stackoverflow.com/questions/56631535/net-outofmemory-exception-reason-low-on-memory-during-gc'
  //   },
  //   {
  //     date: '2019-06-12T16:04:04.000Z',
  //     title: 'OutofMemory exception while building docker images asp.net core',
  //     author: 'Zain Malik',
  //     sourceLink: 'https://stackoverflow.com/questions/56566323/outofmemory-exception-while-building-docker-images-asp-net-core'
  //   }
  // ];

  private loading: boolean;
  private page: number;
  private size: number;
  private total: number;
  private hasNext: boolean;
  private requestId: string;
  private data: ISearchResultItem[];

  constructor(private searchService: SearchService) {
    this.loading = false;
    this.page = 1;
    this.hasNext = false;
    this.size = 10;
    this.total = -1;
  }

  prev() {
    if (!this.isHasPrev()) {
      return;
    }

    this.page--;
    this.getData();
  }

  next() {
    if (!this.isHasNext()) {
      return;
    }

    this.page++;
    this.getData();
  }

  isHasPrev() {
    return (this.page > 1);
  }

  isHasNext() {
    return this.hasNext;
  }

  currentData() {
    return this.data;
  }

  search(text: string) {
    this.loading = true;
    this.page = 1;
    this.searchService.startSearch(text).subscribe((result) => {
      this.requestId = result.requestId;
      setTimeout(() => this.getData(), 1000);
    });
  }

  private getData() {
    this.loading = true;

    this.searchService.getResult(this.requestId, this.page, this.size).subscribe((result) => {
      if (result.status === 202) {
        setTimeout(() => this.getData(), 1000);
      } else if (result.status === 200) {
        this.hasNext = result.body.meta.hashNext;
        this.page = result.body.meta.currentPage;
        this.total = result.body.meta.totalPages;
        this.data = result.body.data;

        this.loading = false;
      }
    });
  }

}
