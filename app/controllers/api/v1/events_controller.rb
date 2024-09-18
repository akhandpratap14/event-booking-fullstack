class Api::V1::EventsController < Api::V1::BaseController
    include Rails.application.routes.url_helpers  
  
    def show
      event = Event.find(params[:id])
      render json: event_response(event)
    end
  
    def index
      events = Event.all
      render json: events.map { |event| event_response(event) }
    end
  
    private
  
    def event_response(event)
      {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        number_of_uses: event.number_of_uses,
        date: event.date,
        time: event.time,
        banner_url: event.banner.attached? ? rails_blob_url(event.banner, only_path: false) : nil,  
        host_id: event.host_id,
        comments: comments_response(event.comments) 
      }
    end
  
    def comments_response(comments)
      comments.map do |comment|
        {
          id: comment.id,
          content: comment.content,
          user: user_response(comment.user),  
          created_at: comment.created_at
        }
      end
    end
  
    def user_response(user)
      {
        id: user.id,
        name: user.name,
        email: user.email
      }
    end
  end
  