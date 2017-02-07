require 'jwt'

class Auth
  ALGORITHM = 'HS256'

  def self.issue(payload)
    JWT.encode(
      {
        data: payload,
        exp: expiry
      },
      auth_secret,
      ALGORITHM
    )
  end

  def self.decode(token)
    JWT.decode(
      token,
      auth_secret,
      true,
      {algorithm: ALGORITHM}
    ).first
  end

  def self.expiry
    Time.now.to_i + 60 * 5
  end

  def self.auth_secret
    ENV['AUTH_SECRET']
  end
end
