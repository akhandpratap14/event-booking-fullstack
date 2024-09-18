class Api::V1::CommentsController < Api::V1::BaseController
    def create
        event = Event.find_by(id: params[:id])  
        user = User.find_by(email: params[:email])
      
        if event && user
          begin
            comment = Comment.create!(content: params[:content], user_id: user.id, event_id: event.id)
      
            render json: { message: 'Comment posted successfully!', comment: comment }, status: :created
          rescue ActiveRecord::RecordInvalid => e
            render json: { error: 'Failed to post comment.', details: e.message }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Invalid event or user.' }, status: :unprocessable_entity
        end
      end
      
      def index
        event = Event.find_by(id: params[:id])  
        
        if event
          comments = event.comments.includes(:user) 
          render json: comments.as_json(
            include: { 
              user: { only: [:id, :username] }
            }, 
            only: [:content, :created_at]  
          ), status: :ok
        else
          render json: { error: 'Event not found.' }, status: :not_found
        end
      end
      
      
      
   
      
end
