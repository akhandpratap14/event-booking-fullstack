class Api::V1::AuthenticationController < Api::V1::BaseController
    skip_before_action :authorize_request, only: %i[login register]

    def login
      user = User.find_by(username: login_params[:username])
      if user&.authenticate(login_params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        render json: { user: user_response(user), token: token }, status: :ok
      else
        render json: { errors: 'Invalid username or password' }, status: :unauthorized
      end
    end

    def register
      user = User.new(register_params)
      if user.save
        token = JsonWebToken.encode(user_id: user.id)  
        render json: { 
          message: "User registered successfully", 
          user: user_response(user),
          token: token  
        }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
      
    private

    def user_response(user)
      user.as_json(except: [:password_digest, :created_at, :updated_at])
    end
      
    def register_params
      params.permit(:name, :email, :password, :username, :type)
    end

    def login_params
      params.permit(:username, :password)
    end

end
