require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest

  def setup
    @user = User.create(email: "test@lol.com",
      password: "foobar",
      password_confirmation: "foobar"
    )
    @jwt = Auth.issue({user: @user.id})
  end

  test "valid signup" do
    assert_difference 'User.count', 1 do
      post users_path, params: {
        user: {
          email: "foo@lol.com",
          password: "testlol",
          password_confirmation: "testlol",
        }
      }
    end
    assert_response :success
    assert_equal "foo@lol.com", response.parsed_body["user"]["email"]
    assert response.parsed_body["jwt"]
  end

  test "invalid signup" do
    assert_no_difference 'User.count' do
      post users_path, params: {
        user: {
          email: "test@lol.com",
          password: "",
        }
      }
    end
    assert_response 400
  end

  test "show user" do
    get user_path(id: @user.id)
    assert_response :success
  end

  test "unauthenticated update" do
    patch user_path(id: @user.id), params: {
      user: {
        email: "fool@lol.com",
        password: "testlol",
      }
    }
    assert_equal "unauthorized", response.parsed_body["error"]
  end

  test "authenticated update" do
    patch user_path(id: @user.id), params: {
      user: {
        email: "fool@lol.com",
        password: "testlol",
      }
    }, headers: {
      authorization: "Bearer #{@jwt}"
    }
    assert_response :success
  end

  test "unauthenticated destroy" do
    delete user_path(id: @user.id)
    assert_equal "unauthorized", response.parsed_body["error"]
  end

  test "authenticated destroy" do
    delete user_path(id: @user.id), params: {
    }, headers: {
      authorization: "Bearer #{@jwt}"
    }
    assert_response :success
  end
end
