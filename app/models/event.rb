class Event < ApplicationRecord
  belongs_to :host, class_name: 'Host'

  has_many :comments, dependent: :destroy
  has_one_attached :banner

  # Establish many-to-many relationship with Joiners (which are Users)
  has_and_belongs_to_many :joiners, class_name: 'Joiner', join_table: 'events_users', association_foreign_key: 'user_id'

  # Method to check if more joiners can register
  def can_register_user?
    joiners.count < number_of_uses  # Assuming number_of_uses is the max capacity for the event
  end
end
