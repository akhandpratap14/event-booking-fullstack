class Api::V1::UsersController < Api::V1::BaseController

    def rsvp
        event = Event.find_by(id: params[:event_id])
        user = Joiner.find_by(email: params[:email]) 
    
        if event.nil?
          render json: { error: 'Event not found' }, status: :not_found
          return
        end
    
        if user.nil?
          render json: { error: 'User not found' }, status: :not_found
          return
        end
    
        if event.can_register_user?
          unless event.joiners.include?(user)
            event.joiners << user
            render json: { message: 'Successfully registered for the event!' }, status: :ok
          else
            render json: { error: 'User is already registered for this event.' }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Event is full. No more registrations allowed.' }, status: :unprocessable_entity
        end
      end

      def un_rsvp
        event = Event.find_by(id: params[:event_id]) 
        user = Joiner.find_by(email: params[:email])
    
        if event.nil?
          render json: { error: 'Event not found' }, status: :not_found
          return
        end
    
        if user.nil?
          render json: { error: 'User not found' }, status: :not_found
          return
        end
    
        if event.joiners.include?(user)
          event.joiners.delete(user)
          render json: { message: 'Successfully unregistered from the event.' }, status: :ok
        else
          render json: { error: 'User is not registered for this event.' }, status: :unprocessable_entity
        end
      end

end
