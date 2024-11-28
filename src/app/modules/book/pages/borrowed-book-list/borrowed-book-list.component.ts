import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "../../components/rating/rating.component";
import {RouterLink} from "@angular/router";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RatingComponent,
  ],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit{
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = {bookId: 0, comment: "",note: 0};
  page =0;
  size =5;
  selectedBook: BorrowedBookResponse  | undefined= undefined;

  constructor(
    private bookService : BookService,
    private feedbackService: FeedbackService
  ) {
  }

  ngOnInit(): void {
    this.findAllBorrowedBook();
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  private findAllBorrowedBook() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp)=>{
        this.borrowedBooks = resp;
      }
    });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBook();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllBorrowedBook();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBook();
  }

  goToNextPage() {
    this.page ++;
    this.findAllBorrowedBook();
  }

  goToLastPage() {
    this.page = this.borrowedBooks.totalPages as number -1;
    this.findAllBorrowedBook();
  }

  get isLastPage() : boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowedBook({
      "book-id": this.selectedBook?.id as number
    }).subscribe({
      next: ()=>{
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBook();
      }
    })
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body : this.feedbackRequest
    }).subscribe({
      next: ()=>{
      }
    });
  }
}
