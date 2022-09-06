class Api::SessionsController < ApplicationController
  def show
    @user = current_user
    if @user
      render 'api/users/show'
    else
      # Probably want to render login page here
      render json: { user: nil }
    end
  end

  def create
    username = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(username, password)
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    user = current_user
    if user
      logout!
      render json: { message: 'success' }
    end
  end
end
