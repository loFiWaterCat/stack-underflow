Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  #
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :questions, only: [:index, :show, :create, :update, :destroy]
    resources :answers, only: [:index, :create, :update, :destroy]
    resources :votes, only: [:create, :destroy, :update]
    resources :comments, only: [:create, :destroy, :update]
  end

  get '*path', to: "static_pages#frontend_index"
end
