Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      post 'register', to: 'authentication#register'
      post 'login', to: 'authentication#login'

      resources :events, only: [:index, :show]

      post 'rsvp', to: 'users#rsvp'
      post 'un_rsvp', to: 'users#un_rsvp'

      post 'comments', to: 'comments#create'
      get 'comments', to: 'comments#index'

    end
  end  
  
end
