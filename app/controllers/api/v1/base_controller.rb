class Api::V1::BaseController < ActionController::API
    before_action :authorize_request
    attr_reader :current_user
  
    def authorize_request
      header = request.headers['Authorization']
      header = header.split(' ').last if header
      begin
        @decoded = JsonWebToken.decode(header)
        @current_user = User.find(@decoded[:user_id])
      rescue Exception => e
        render json: { message: 'Unauthorized' }, status: :unauthorized
      end
    end
  end
  