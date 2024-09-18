class Joiner < User
  has_and_belongs_to_many :events, join_table: 'events_users'
end
