import $ from 'jquery'
import createBookReview from './createBookReview.ts'
import appendBook from './appendBook.ts'

import './app.tsx'

export type Book = {
 id: number
 title: string
 author: string
 overview: string
 image: string
 reviews: Review[]
}

export type Review = {
  id: number
  username: string
  comment: string
  like: number
}

$(function() {
  $.ajax('http://localhost:1323/books')
    .done(function(books) {
      books.forEach(appendBook)

      $('.js-toggle-review').on('click', function(event) {
        var bookId = $(this).data('bookId')
        $('.js-review[data-book-id="' + bookId + '"]').toggle('fast')

        return false
      })

      $(document).on('click', '.js-like', function(event) {
        var likeCountElement = $(this).find('.js-like-count')
        likeCountElement.text(likeCountElement.text() + 1)

        return false
      })

      $(document).on('submit', '.js-form', function(event) {
        var bookId = $(this).data('bookId')
        $.ajax({
          url: 'http://localhost:1323/reviews',
          type: 'post',
          dataType: 'json',
          data: {
            comment: $(event.currentTarget).find('textarea').val()
          }
        }).done(function(review) {
          $('.js-review[data-book-id="' + bookId + '"] > ul').append($(createBookReview(review)))
        })

        return false
      })
    })
})
