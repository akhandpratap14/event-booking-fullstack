class Host < User
    has_many :hosted_events, class_name: 'Event', foreign_key: 'host_id', dependent: :destroy
  end
  