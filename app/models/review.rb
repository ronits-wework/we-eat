class Review < ApplicationRecord
  belongs_to :restaurant

  after_create :add_rating_to_restaurant!
  after_update :update_rating_to_restaurant!
  after_destroy :delete_rating_from_restaurant!

  validates :name, :rating, :comment, presence: true
  validates :name, length: { minimum: 2 }
  validates :rating, numericality: { greater_than_or_equal_to: WeEat::MIN_REVIEW_RATING,
                                     less_than_or_equal_to: WeEat::MAX_REVIEW_RATING }

  def add_rating_to_restaurant!
    review = self
    restaurant = review.restaurant
    new_count = restaurant.reviews.count
    if new_count == 1
      restaurant.rating = review.rating
    else
      new_count = new_count.to_f
      restaurant.rating = restaurant.rating * ((new_count - 1.0) / new_count) + (review.rating.to_f / new_count)
    end
    restaurant.set_rating_in_bounds!
    restaurant.save!
  end

  def update_rating_to_restaurant!
    review = self
    old_rating = review.rating_before_last_save
    if review.rating != old_rating
      restaurant = review.restaurant
      total_ratings = restaurant.reviews.count
      other_rating_sum = restaurant.rating * total_ratings - old_rating
      restaurant.rating = (other_rating_sum + review.rating) / total_ratings
      restaurant.set_rating_in_bounds!
      restaurant.save!
    end
  end

  def delete_rating_from_restaurant!
    review = self
    restaurant = review.restaurant
    new_count = restaurant.reviews.count
    if new_count == 0
      restaurant.rating = nil
    else
      new_count = new_count.to_f
      other_rating_sum = restaurant.rating * (new_count + 1) - review.rating
      restaurant.rating = other_rating_sum / new_count
    end
    restaurant.set_rating_in_bounds!
    restaurant.save!
  end

end
