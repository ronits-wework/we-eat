class Review < ApplicationRecord
  belongs_to :restaurant

  after_create :add_rating_to_restaurant!
  after_update :update_rating_to_restaurant!
  after_destroy :delete_rating_from_restaurant!

  validates :rating, presence: true
  validates :rating, numericality: { greater_than_or_equal_to: WeEat::MIN_REVIEW_RATING,
                                     less_than_or_equal_to: WeEat::MAX_REVIEW_RATING }

  def add_rating_to_restaurant!
    new_count = restaurant.reviews.count
    if new_count == 1
      restaurant.rating = rating
    else
      new_count = new_count.to_f
      restaurant.rating = restaurant.rating * ((new_count - 1.0) / new_count) + (rating.to_f / new_count)
    end
    restaurant.set_rating_in_bounds!
    restaurant.save!
  end

  def update_rating_to_restaurant!
    old_rating = rating_before_last_save
    if rating != old_rating
      total_ratings = restaurant.reviews.count
      other_rating_sum = restaurant.rating * total_ratings - old_rating
      restaurant.rating = (other_rating_sum + rating) / total_ratings
      restaurant.set_rating_in_bounds!
      restaurant.save!
    end
  end

  def delete_rating_from_restaurant!
    new_count = restaurant.reviews.count
    if new_count == 0
      restaurant.rating = nil
    else
      new_count = new_count.to_f
      other_rating_sum = restaurant.rating * (new_count + 1) - rating
      restaurant.rating = other_rating_sum / new_count
    end
    restaurant.set_rating_in_bounds!
    restaurant.save!
  end

end
