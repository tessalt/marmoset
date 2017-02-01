require 'test_helper'

class UsersCreateTest < ActionDispatch::IntegrationTest

  test "valid signup" do
    assert_difference 'User.count', 1 do
      post users_path, params: {
        user: {
          email: "test@lol.com",
          password: "testlol",
          password_confirmation: "testlol",
        }
      }
    end
    assert_response :success
    assert_equal "test@lol.com", response.parsed_body["user"]["email"]
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
end
