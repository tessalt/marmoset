class ApplicationController < ActionController::Base
  before_action :authenticate

  def logged_in?
    !!current_user
  end

  def current_user
    if auth_present?
      if auth_payload["user"]
        user = User.find(auth_payload["user"])
        if user
          @current_user ||= user
        end
      end
    end
  end

  def authenticate
    begin
      render json: {error: "unauthorized"}, stauts: 401 unless logged_in?
    rescue JWT::ExpiredSignature
      render json: {error: "expired"}, stauts: 401
    end
  end

  private

  def auth_payload
    Auth.decode(token).fetch("data")
  end

  def token
    request.env["HTTP_AUTHORIZATION"].scan(/Bearer(.*)$/).flatten.last.lstrip
  end

  def auth_present?
    !!request.env.fetch("HTTP_AUTHORIZATION","").scan(/Bearer/).flatten.first
  end
end
